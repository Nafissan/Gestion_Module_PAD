import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Substitut } from '../../shared/model/substitut-pelerinage.model';
import { DossierPelerinage } from '../../shared/model/dossier-pelerinage.model';
import { SubstitutService } from '../../shared/services/substitut-pelerinage.service';
import { DossierPelerinageService } from '../../shared/services/dossier-pelerinage.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Observable } from 'rxjs';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { filter } from 'rxjs/operators';
import { DetailSubstitutPelerinageComponent } from '../detail-substitut-pelerinage/detail-substitut-pelerinage.component';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { PelerinsService } from '../../shared/services/pelerin-pelerinage.service';
import { Pelerin } from '../../shared/model/pelerin-pelerinage.model';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { Agent } from 'src/app/shared/model/agent.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';

@Component({
  selector: 'fury-list-substitut-pelerinage',
  templateUrl: './list-substitut-pelerinage.component.html',
  styleUrls: ['./list-substitut-pelerinage.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]

})
export class ListSubstitutPelerinageComponent implements OnInit {
  showProgressBar: boolean = false;
  substitutSelected: Substitut;
  substituts: Substitut[] = [];
  subject$: ReplaySubject<Substitut[]> = new ReplaySubject<Substitut[]>(1);
  data$: Observable<Substitut[]> = this.subject$.asObservable();
  pageSize = 4;
  openOrSaisiDossier:DossierPelerinage;
  dataSource: MatTableDataSource<Substitut> | null;
  selection = new SelectionModel<Substitut>(true, []);
  dossierDossierPelerinage:DossierPelerinage;
  private paginator: MatPaginator;
  private sort: MatSort;
  pelerins: Pelerin[]=[];
  username: string;
  agent: Agent;
  compte: Compte;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  
  setDataSourceAttributes() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  
  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Code Dossier", property: "dossierPelerinage", visible: true, isModelProperty: true },
    { name: "Remplacant", property: "substitut", visible: true, },
    { name: "Lancer par", property: "ajoutePar", visible: true },
    { name: "Substitut de", property: "agent", visible: true },

  ] as ListColumn[];

  constructor(
    private substitutService: SubstitutService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private dossierDossierPelerinageService:DossierPelerinageService,
    private pelerinsService: PelerinsService, private authService: AuthenticationService,
    private compteService: CompteService,
  ) { }

  ngOnInit() {
    this.fetchSubstituts();
    this.getDossierDossierPelerinage();
    this.getPelerins(); this.username = this.authService.getUsername();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((substitut) => {
      this.substituts = substitut;
      this.dataSource.data = substitut;
    });
  }
  
  ngAfterViewInit() { }
  
  get visibleColumns() {
    return this.columns.filter((column) => column.visible).map((column) => column.property);
  }
  
  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim().toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(value) != -1;
    }
  }
  
  fetchSubstituts() {
    this.substitutService.getSubstitutsByDossierEtat().subscribe(response => {
      this.substituts = response.body as Substitut[];
      console.log(this.substituts);
    }, err => {
      console.error('Error loading substitut:', err);
    }, () => {
      this.subject$.next(this.substituts);
      this.showProgressBar = true;
    });
  }
  
  refreshListe() { this.fetchSubstituts(); }
  
  getDossierDossierPelerinage() {
    this.dossierDossierPelerinageService.getDossier().subscribe(
      (response) => {
        if (response.body !== null) {
          this.dossierDossierPelerinage = response.body as DossierPelerinage;
          console.log('Dossier substitut:', this.dossierDossierPelerinage);
        }
      },
      (err) => {
        console.error('Error loading dossier substitut:', err);
      }
    );
  }
  getPelerins(){
    this.pelerinsService.getPelerinsByDossierEtat().subscribe(
      (response) => {
          this.pelerins = response.body as Pelerin[];
        },
          (err) => {
            console.error('Error loading pelerins:', err);
            });
          }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  checkboxLabel(row?: Substitut): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  
  generateSubstitut() {
    this.substitutService.assignedSubToPelerins(this.agent).subscribe((response)=>{
      this.notificationService.success("Assignation substitut a pelerin reussi");
      this.refreshListe();
    },err=>{
      this.notificationService.warn("Assignation substitut a pelerin echoue");
    })
  }
  
  
  
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  
  detailsSubstitut(substitut: Substitut) {
    this.dialog.open(DetailSubstitutPelerinageComponent, { data: substitut })
      .afterClosed()
      .subscribe((substitut: Substitut) => {
        if (substitut) {
          const index = this.substituts.findIndex(
            (existingSubstitut) => existingSubstitut.id === substitut.id
          );
          this.substituts[index] = new Substitut(substitut);
          this.subject$.next(this.substituts);
          this.refreshListe();
        }
      });
  }
  
}
