import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { MatDialog } from '@angular/material/dialog';
import { CompteService } from '../../shared/services/compte.service';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Compte } from '../../shared/model/compte.model';
import { filter } from 'rxjs/operators';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { CreateUpdateCompteComponent } from '../create-update-compte/create-update-compte.component';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { NotificationUtil } from '../../../../shared/util/util';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'fury-list-compte',
  templateUrl: './list-compte.component.html',
  styleUrls: ['./list-compte.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListCompteComponent implements OnInit, AfterViewInit, OnDestroy   {
  showProgressBar: boolean = false;
  comptes: Compte[];
  subject$: ReplaySubject<Compte[]> = new ReplaySubject<Compte[]>(
    1
  );
  data$: Observable<Compte[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Compte> | null;

  selection = new SelectionModel<Compte>(true, []);

  // -----Utliser pour la pagination et le tri des listes--------
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // -------------------------------------------------------------
  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: true },
    { name: "ID", property: "id", visible: false, isModelProperty: true },
    { name: "Email", 
      property: "email", // cette propriete se trouve dans l'objet agent
      visible: true,    // qui est un sous objet dans compte
      isModelProperty: true }, 
    { name: "Username", property: "username", visible: true, isModelProperty: true,},
    { name: "Prenom", 
      property: "prenom", // cette propriete se trouve dans l'objet agent
      visible: true,      // qui est un sous objet dans compte
      isModelProperty: true,
    },
    {
      name: "Nom",
      property: "nom", // cette propriete se trouve dans l'objet agent
      visible: true,   // qui est un sous objet dans compte
      isModelProperty: true,
    },
    {
      name: "Structure",
      property: "structure", // cette propriete se trouve dans l'objet agent
      visible: false,   // qui est un sous objet dans compte
      isModelProperty: true,
    },
    { name: "Etat", property: "enabled", visible: true, isModelProperty: true,},
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    private compteService: CompteService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getComptes();
    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter((data) => !!data)).subscribe((comptes) => {
      this.comptes = comptes;
      this.dataSource.data = comptes;
    });
  }
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getComptes() {
    this.compteService.getAll().subscribe(
      (response) => {
        this.comptes = response.body;
      },
      (err) => {
        this.showProgressBar = true;
      },
      () => {
        this.showProgressBar = true;
        this.subject$.next(this.comptes);
      }
    );
  }
  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr =JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  
  }

  ngOnDestroy() {}
  createCompte() {
    this.dialog
      .open(CreateUpdateCompteComponent)
      .afterClosed()
      .subscribe((compte: any) => {

        if (compte) {
          this.comptes.unshift(compte);
          this.subject$.next(this.comptes);
        }
      });
  }
  updateCompte(compte: Compte) {
    this.dialog
      .open(CreateUpdateCompteComponent, {
        data: compte,
      })
      .afterClosed()
      .subscribe((compte) => {
        if (compte) {
          const index = this.comptes.findIndex(
            (existingCompte) =>
              existingCompte.id === compte.id
          );
          this.comptes[index] = compte;
          this.subject$.next(this.comptes);
        }
      });
  }
  
  deleteCompte(compte: Compte) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === 'CONFIRMER') {
        this.compteService.delete(compte).subscribe((response) => {
          this.notificationService.success(NotificationUtil.suppression)
          this.comptes.splice(
            this.comptes.findIndex(
              (existingCompte) => existingCompte.id === compte.id
            ),
            1
          );
          this.subject$.next(this.comptes);
        });
      } 
    })
  }
  activeDesactiveCompte(compte?: Compte, active?: string){
    if(compte == null){ // activation desactivation multiple
        this.dialogConfirmationService.confirmationDialog().subscribe(action => {
          if (action === 'CONFIRMER') {
            if(active === 'activer'){
              this.selection.selected.forEach(compteChecked => {
                compteChecked.enabled = true
              })
            }
            else{
              this.selection.selected.forEach(compteChecked => {
                compteChecked.enabled = false
              })
            }
            this.compteService.updateMany(this.selection.selected).subscribe(
              response => {
                if(active === 'activer') {
                  this.notificationService.successlight('Comptes Actives avec succès')
                }else {
                  this.notificationService.successlight('Comptes Desactives avec succès')
                }
            })   
          } 
      })

    }else{ // activation desactivation suivant la ligne
      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === 'CONFIRMER') {
          compte.enabled = !compte.enabled 
          this.compteService.update(compte).subscribe(
            response => {
              if(compte.enabled) {
                this.notificationService.successlight('Compte Active avec succès')
              }else {
                this.notificationService.successlight('Compte Desactive avec succès')
              }
          })   
        } 
      }) 
    }  
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Compte): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
