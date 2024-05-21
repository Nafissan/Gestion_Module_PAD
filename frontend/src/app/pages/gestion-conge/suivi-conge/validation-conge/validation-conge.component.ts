import { Component, OnInit, Inject, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material/dialog";
import { CongeService } from "../../shared/services/conge.service";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { ReplaySubject, Observable } from "rxjs";
import { Conge } from "../../shared/model/conge.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { filter } from "rxjs/operators";
import { PlanningConge } from "../../shared/model/planning-conge.model";
import { EtapeValidationComponent } from "../etape-validation/etape-validation.component";
import { EtatConge, EtatPlanningConge } from "../../shared/util/util";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { Agent } from "../../../../shared/model/agent.model";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { PlanningCongeService } from "../../shared/services/planning-conge.service";
import { SelectionModel } from "@angular/cdk/collections";
import { NotificationService } from "../../../../shared/services/notification.service";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";

@Component({
  selector: "fury-validation-conge",
  templateUrl: "./validation-conge.component.html",
  styleUrls: ["./validation-conge.component.scss", "../../../../shared/util/bootstrap4.css"],
})
export class ValidationCongeComponent implements OnInit, AfterViewInit, OnDestroy  {
  showProgressBar: boolean = false;
  
  saisi: string = EtatConge.saisi;
  encours: string = EtatConge.encours;
  valide: string = EtatConge.valider;
  rejete: string = EtatConge.rejeter;
  reporte: string = EtatConge.reporter;
  enconge: string = EtatConge.enconger;
  cloture: string = EtatConge.cloturer;

  username: string;
  agent: Agent;

  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteOrganisationnelles: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleSuperieures: UniteOrganisationnelle[] = [];
  compte: Compte;
  niveau: number;

  idPlanningConge: number;
  conges: Conge[];

  subject$: ReplaySubject<Conge[]> = new ReplaySubject<Conge[]>(1);
  data$: Observable<Conge[]> = this.subject$.asObservable();

  selection = new SelectionModel<Conge>(true, []);

  pageSize = 4;
  dataSource: MatTableDataSource<Conge> | null;

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
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    { name: "Code", property: "code", visible: false, isModelProperty: true },
    { name: "Matricule", property: "matricule", visible: true, isModelProperty: true },
    { name: "Prenom", property: "prenom", visible: true, isModelProperty: true },
    { name: "Nom", property: "nom", visible: true, isModelProperty: true },
    {
      name: "Date Depart",
      property: "dateDepart",
      visible: true,
      isModelProperty: true,
    },
    { name: "Mois", property: "mois", visible: true, isModelProperty: true },
    {
      name: "Date Retour Previsionnelle",
      property: "dateRetourPrevisionnelle",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Date Retour Effectif",
      property: "dateRetourEffectif",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Date Saisie",
      property: "dateSaisie",
      visible: false,
      isModelProperty: true,
    },
    { name: "Niveau", property: "niveau", visible: false, isModelProperty: true },
    { name: "Etape", property: "etape", visible: true, isModelProperty: true },
    { name: "Etat", property: "etat", visible: true, isModelProperty: true },
    {
      name: "Commentaire",
      property: "description",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Code Decision",
      property: "codeDecision",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Duree Restante",
      property: "dureeRestante",
      visible: false,
      isModelProperty: true,
    },
    { name: "Solde", property: "solde", visible: false, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];

  constructor(
    private route: ActivatedRoute,
    private congeService: CongeService,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ValidationCongeComponent>,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private planningCongeService: PlanningCongeService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
  ) { }

  ngOnInit(): void {
    this.idPlanningConge = this.defaults.planningConge.id;
    this.uniteOrganisationnelles = this.defaults.unites;
    this.uniteOrganisationnelleSuperieures = this.defaults.superieurs;

    this.username = this.authService.getUsername();

    this.getUserAccount(this.username);

    this.dataSource = new MatTableDataSource();

    this.getAllCongesByIdPlanningConge(this.idPlanningConge);
    
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;    
  }
  ngOnDestroy() { }
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
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr = JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  }
  getUserAccount(username: string){
    this.compteService.getByUsername(username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
      this.niveau = this.uniteOrganisationnelle.niveauHierarchique.position;
    }, err => {
    },
      () => {
      });
  }
  getAllCongesByIdPlanningConge(idPlanningConge: number) {
    this.congeService.getAllByIdPlanningConge(idPlanningConge).subscribe(
      (response) => {
        this.conges = response.body;
      },
      (err) => {
        this.showProgressBar = true;
      },
      () => {
        this.subject$.next(this.conges);
        this.showProgressBar = true;

        this.data$.pipe(filter((data) => !!data)).subscribe((conges) => {
          this.conges = conges;
          this.dataSource.data = conges; 
        });
      }
    );
  }
  valider(conge?: Conge) {
   if( conge !== undefined){
    this.dialog
    .open(EtapeValidationComponent, {
      data: { vue: 'valider-conge', conge: conge }
    }).afterClosed().subscribe(result => {
      if (this.isPlanningCongeValide()) {
        this.defaults.planningConge.etat = EtatPlanningConge.valider;
        this.updatedPlanningConge(this.defaults.planningConge);
      } else {
        this.defaults.planningConge.etat = EtatPlanningConge.saisi;
        this.updatedPlanningConge(this.defaults.planningConge);
      }
    });
     }else{ 
       this.notificationService.warn("Update Many");
     }
  }
  rejeter(conge?: Conge) {
    if( conge !== undefined){ 
      this.dialog
      .open(EtapeValidationComponent, {
        data: { vue: 'rejeter-conge', conge: conge }
      }).afterClosed().subscribe(result => {
        if (this.isPlanningCongeValide()) {
          this.defaults.planningConge.etat = EtatPlanningConge.valider;
          this.updatedPlanningConge(this.defaults.planningConge);
        } else {
          this.defaults.planningConge.etat = EtatPlanningConge.saisi;
          this.updatedPlanningConge(this.defaults.planningConge);
        }
      });
    }else{
      this.notificationService.warn("Update Many");
    }
  }

  historique(conge: Conge) {
    this.dialog
      .open(EtapeValidationComponent, {
        data: { vue: 'historique-conge', conge: conge }
      });
  }
  isPlanningCongeValide(): boolean {
    let isValide: boolean = false;
    for (const conge of this.conges) {
      if (conge.etat === EtatConge.valider) {
        isValide = true;
      } else {
        isValide = false;
        break;
      }
    }
    return isValide;
  }
  updatedPlanningConge(planningConge: PlanningConge) {
    this.planningCongeService.update(planningConge)
      .subscribe(response => {
      })
  }
  getNomStructure(etape: number): string {
    if (etape === 0) {
      etape = etape + 1;
    }
    if (this.uniteOrganisationnelles) {
      let uniteOrganisationnelle = this.uniteOrganisationnelles.find(e => e.niveauHierarchique.position === etape);
      if (uniteOrganisationnelle) {
        return uniteOrganisationnelle.description; // Renvoie l'unité inferieur direct
      } else {
        let uniteOrganisationnelle = this.uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === etape);
        if (uniteOrganisationnelle)
          return uniteOrganisationnelle.description; // Renvoie l'unité superieur direct
      }
    } else {
      return etape.toString();
    }
  }
  // Verification des PRIVILEGES
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
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
  checkboxLabel(row?: Conge): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  validerCongeMany(conge?: Conge, type?: string) {
    if (conge === null){
      if (type === 'rejeter-conge-many') {
        this.dialog
        .open(EtapeValidationComponent, {
          data: { vue: type, conges: this.selection.selected.filter(conge => conge.etat === EtatConge.saisi) }
        }).afterClosed().subscribe(result => {
          if (this.isPlanningCongeValide()) {
            this.defaults.planningConge.etat = EtatPlanningConge.valider;
            this.updatedPlanningConge(this.defaults.planningConge);
          } else {
            this.defaults.planningConge.etat = EtatPlanningConge.saisi;
            this.updatedPlanningConge(this.defaults.planningConge);
          }
        });
      }
  }
}

}
