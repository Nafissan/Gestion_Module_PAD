import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, AfterViewInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Observable } from 'rxjs';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NotificationUtil } from 'src/app/shared/util/util';
import { Dotation } from './../../shared/models/dotation.model';
import { DotationService } from './../../shared/services/dotation.service';
import { filter } from 'rxjs/operators';
import { AddOrUpdateDemandeLaitComponent } from './../add-or-update-demande-lait/add-or-update-demande-lait.component';
import { AddOrUpdateSuiviDemandeLaitComponent } from '../../suivi-demande-lait/add-or-update-suivi-demande-lait/add-or-update-suivi-demande-lait.component';
import { SuiviDotationService } from '../../shared/services/suivi-dotation.service';
import { SuiviDotation } from '../../shared/models/suiviDotation.model';

@Component({
  selector: 'fury-list-demande-lait',
  templateUrl: './list-demande-lait.component.html',
  styleUrls: ['./list-demande-lait.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListDemandeLaitComponent implements OnInit, AfterViewInit, OnDestroy  {

  showProgressBar: boolean = false;
  dotations: Dotation[];
  dotationSelected: Dotation;
  subject$: ReplaySubject<Dotation[]> = new ReplaySubject<Dotation[]>(
    1
  );
  data$: Observable<Dotation[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Dotation> | null;

  selection = new SelectionModel<Dotation>(true, []);

  suiviDotations: SuiviDotation[] = [];
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
    { name: "Code", property: "code", visible: false, isModelProperty: true },
    { name: "Date Debut", property: "dateDebut", visible: true, isModelProperty: true,},
    { name: "Date Fin", property: "dateFin", visible: true, isModelProperty: true, },
    {
      name: "Bénéficiare",
      property: "beneficiaire", // cette propriete se trouve dans l'objet agent
      visible: true,   // qui est un sous objet dans dotation
      isModelProperty: true,
    },
    {
      name: "Conjoint(e)",
      property: "conjoint", // cette propriete se trouve dans l'objet conjoint
      visible: true,   // qui est un sous objet dans dotation
      isModelProperty: true,
    },
    { name: "Type Dotation", property: "typeDotation", visible: true, isModelProperty: true,},
    { name: "Observation", property: "observation", visible: false, isModelProperty: true, },
    { name: "Statut", property: "statut", visible: false, isModelProperty: true,},
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    private dotationService: DotationService,
    private suiviDotationService: SuiviDotationService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getDotations();
    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter((data) => !!data)).subscribe((dotations) => {
      this.dotations = dotations;
      this.dataSource.data = dotations;
    });
  }
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getDotations() {
    this.dotationService.getAll().subscribe(
      (response) => {
        this.dotations = response.body;
        this.dotations =  this.dotations.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
      },
      (err) => {
        this.showProgressBar = true;
      },
      () => {
        this.showProgressBar = true;
        this.subject$.next(this.dotations);
      }
    );
  }

  // getSuiviDotations() {
  //   this.suiviDotationService.getAll().subscribe(
  //     (response) => {
  //       this.suiviDotations = response.body;
  //       this.suiviDotations = this.suiviDotations.filter(s => s.dotation.id === this.idDotation);
  //     },
  //     (err) => {
  //     },
  //     () => {
  //       console.log(this.suiviDotations);
  //      this.subject$.next(this.suiviDotations);
  //       this.showProgressBar = true;
  //     }
  //   );
  // }
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
  createDotation() {
    this.dialog
      .open(AddOrUpdateDemandeLaitComponent)
      .afterClosed()
      .subscribe((dotation: any) => {
        this.getDotations();
        if (dotation) {
          this.dotations.unshift(dotation);
          this.subject$.next(this.dotations);
        }
      });
  }
  updateDotation(dotation: Dotation) {
    this.dialog
      .open(AddOrUpdateDemandeLaitComponent, {
        data: dotation,
      })
      .afterClosed()
      .subscribe((dotation) => {
        this.getDotations();
        if (dotation) {
          const index = this.dotations.findIndex(
            (existingDotation) =>
              existingDotation.id === dotation.id
          );
          this.dotations[index] = dotation;
          this.subject$.next(this.dotations);
        }
      });
  }

  deleteDotation(dotation: Dotation) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === 'CONFIRMER') {
        this.dotationService.delete(dotation).subscribe((response) => {
          this.notificationService.success(NotificationUtil.suppression)
          this.dotations.splice(
            this.dotations.findIndex(
              (existingDotation) => existingDotation.id === dotation.id
            ),
            1
          );
          this.subject$.next(this.dotations);
        }
        ,err => {
          this.notificationService.warn(NotificationUtil.echec);
        });
      }
    })
  }


  nouvelleAttribution(){
    if(this.selection.selected.length > 1){
      this.notificationService.warn("Veuillez choisir qu'une seule demande !!!");
      return;
    }
    this.dialog
    .open(AddOrUpdateSuiviDemandeLaitComponent, {
      data: this.selection.selected[0],
    })
    .afterClosed()
    .subscribe((suiviDotation: any) => {
      /**
       * suiviDotation is the updated continent (if the user pressed Save - otherwise it's null)
       */ if (suiviDotation) {
      }
    });
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
  checkboxLabel(row?: Dotation): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }



}
