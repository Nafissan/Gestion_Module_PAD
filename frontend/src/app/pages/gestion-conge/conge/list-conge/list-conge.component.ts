import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CongeService } from "../../shared/services/conge.service";
import { Conge } from "../../shared/model/conge.model";
import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { AddOrUpdateCongeComponent } from "../add-or-update-conge/add-or-update-conge.component";
import { DetailsCongeComponent } from "../details-conge/details-conge.component";
import { MatDialog } from "@angular/material/dialog";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { Agent } from "../../../../shared/model/agent.model";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { DossierConge } from "../../shared/model/dossier-conge.model";
import { PlanningDirectionService } from "../../shared/services/planning-direction.service";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { UniteOrganisationnelleService } from "../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service";
import { DossierCongeService } from "../../shared/services/dossier-conge.service";
import { PlanningDirection } from "../../shared/model/planning-direction.model";
import { PlanningConge } from "../../shared/model/planning-conge.model";
import { PlanningCongeService } from "../../shared/services/planning-conge.service";
import { EtatPlanningConge, EtatConge, EtatPlanningDirection, EtatDossierConge } from "../../shared/util/util";
import { NotificationService } from "../../../../shared/services/notification.service";
import { ImportCongeComponent } from "../import-conge/import-conge.component";
import {genererPDF} from '../../../../shared/util/templates/edition_conge3'


@Component({
  selector: "fury-list-conge",
  templateUrl: "./list-conge.component.html",
  styleUrls: ["./list-conge.component.scss" , "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListCongeComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  indexAction: number = 0;
  saisi:   string    = EtatConge.saisi;
  encours: string    = EtatConge.encours;
  valide:  string    = EtatConge.valider;
  rejete:  string    = EtatConge.rejeter;
  reporte: string    = EtatConge.reporter;
  enconge: string    = EtatConge.enconger;
  cloture: string    = EtatConge.cloturer;
  
  date: Date = new Date();
  currentYear: number = new Date().getFullYear();
  username: string;
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteSuperieureAgent: UniteOrganisationnelle;
  compte: Compte;


  currentPlanningDirection: PlanningDirection = undefined;
  currentPlanningConge: PlanningConge = undefined;
  planningConges: PlanningConge[] = [];
  currentDossierConge: DossierConge = undefined;
  dossierconges: DossierConge[] = [];
  // currentDate: Date = new Date();
  conges: Conge[] = [];

  subject$: ReplaySubject<Conge[]> = new ReplaySubject<Conge[]>(1);
  data$: Observable<Conge[]> = this.subject$.asObservable();

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
    { name: "Profil", property: "profil", visible: true, isModelProperty: true },
    {
      name: "Date Depart",
      property: "dateDepart",
      visible: true,
      isModelProperty: true,
    },
    { name: "Mois", property: "mois", visible: true, isModelProperty: true },
    { name: "DureePrevisionnelle", property: "dureePrevisionnelle", visible: true, isModelProperty: true },
    {
      name: "Date Retour Previsionnelle",
      property: "dateRetourPrevisionnelle",
      visible: false,
      isModelProperty: true,
    }, 
    { name: "DureeEffective", property: "dureeEffective", visible: false, isModelProperty: true },
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
    private dialog: MatDialog,
    private planningDirectionService: PlanningDirectionService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private dialogConfirmationService: DialogConfirmationService,
    private dossierCongeService: DossierCongeService,
    private planningService: PlanningCongeService,
    private authentificationService: AuthenticationService,
    private notificationService:NotificationService,
  ) {}

  ngOnInit() {
    // Recuperer tous les conges en focntion du planning conge
    this.getDossierConges();

      this.dataSource = new MatTableDataSource();
      this.data$.pipe(filter((data) => !!data)).subscribe((conges) => {
      this.conges = conges;
      this.dataSource.data = conges;
    });
  }
   // Get All DossierConge
   getDossierConges() {
    this.dossierCongeService.getAll().subscribe(
      (response) => {
        this.dossierconges = response.body;
        this.currentDossierConge = this.dossierconges.find(e => e.etat === EtatDossierConge.saisi || e.etat === EtatDossierConge.ouvert);
      },
      (err) => {  this.showProgressBar = true; },
      () => {
        if(this.currentDossierConge){
          this.getAgentConnecte(this.currentDossierConge);
        }else{
          this.showProgressBar = true;
         }
      });
  }
  
  getAgentConnecte(dossierConge: DossierConge) {
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
    }, err => {  this.showProgressBar = true; },
      () => {
        this.getUniteOrganisationnelleSuperieure(dossierConge);
      });
  } 
  getUniteOrganisationnelleSuperieure(dossierConge: DossierConge) {
    let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.uniteSuperieureAgent = this.uniteOrganisationnelle;
      this.getPlanningDirection(this.uniteSuperieureAgent.code, dossierConge.id)
    } else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        }, err => {  this.showProgressBar = true; },
          () => {
            this.getPlanningDirection(this.uniteSuperieureAgent.code, dossierConge.id)
          })
    }
  }
  getPlanningDirection(codeDirection: string, idDossierConge: number) {
    this.planningDirectionService.getByCodeDirectionAndDossierConge(codeDirection, idDossierConge)
      .subscribe(response => {
        this.currentPlanningDirection = response.body;
      }, err => {  this.showProgressBar = true; },
      () => {
        if(this.currentPlanningDirection){
          this.getPlanningCongeByPlanningDirectionAndUniteOrganisationnelle(this.currentPlanningDirection);
         }else{
          this.showProgressBar = true;
         }
      });
  }
  getPlanningCongeByPlanningDirectionAndUniteOrganisationnelle(planningDirection: PlanningDirection) {
    this.planningService
      .getAllByPlanningDirectionAndUniteOrganisationnelle(planningDirection.id, this.uniteOrganisationnelle.id)
      .subscribe(
        (response) => {
          this.planningConges = response.body;      
         this.currentPlanningConge = this.planningConges.find(e => e.planningDirection.id === planningDirection.id);
        }, err => {  this.showProgressBar = true;},
         () => {
          if(this.currentPlanningConge){
            this.getAllCongeByIdPlanningConge(this.currentPlanningConge);
           }else{
            this.showProgressBar = true;
           }
         });
  }
  getAllCongeByIdPlanningConge(planningConge: PlanningConge) {
    this.congeService.getAllByIdPlanningConge(planningConge.id).subscribe(
      (response) => {
        this.conges = response.body;
        this.subject$.next(this.conges);
      }, err => { this.showProgressBar = true;     },
       () => {
        this.indexAction = this.columns
          .filter((column) => column.visible)
          .findIndex(c => c.property === 'actions');
        this.showProgressBar = true;
      });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
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

  createConge() {
    this.dialog
      .open(AddOrUpdateCongeComponent)
      .afterClosed()
      .subscribe((conge: any) => {
        /**
         * Congé is the updated conge (if the user pressed Save - otherwise it's null)
         */ if (conge) {
          /**
           * Here we are updating our local array.
           */
          this.conges.unshift(new Conge(conge));
          this.subject$.next(this.conges);
        }
      });
  }
  updateConge(conge: Conge) {
    this.dialog
      .open(AddOrUpdateCongeComponent, {
        data: conge,
      })
      .afterClosed()
      .subscribe((conge: any) => {
        /**
         * Congé is the updated conge (if the user pressed Save - otherwise it's null)
         */
        if (conge) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.conges.findIndex(
            (existingConge) => existingConge.id === conge.id
          );
          this.conges[index] = new Conge(conge);
          this.subject$.next(this.conges);
        }
      });
  }
  detailsConge(conge?: Conge, conges?: Conge[]) {
    this.dialog
      .open(DetailsCongeComponent, {
        data: {conge: conge, conges: conges},
        width :'80%',
        height:'80%'
      })
      .afterClosed()
      .subscribe((conge) => {
        /**
         * Conge is the updated conge (if the user pressed Save - otherwise it's null)
         */
        if (conge) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.conges.findIndex(
            (existingConge) => existingConge.id === conge.id
          );
          this.conges[index] = new Conge(conge);
          this.subject$.next(this.conges);
        }
      });
  }
  
  deleteConge(conge: Conge) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    this.congeService.delete(conge).subscribe((response) => {
      this.conges.splice(
        this.conges.findIndex(
          (existingDossierConge) => existingDossierConge.id === conge.id
        ),1);  
        this.notificationService.success(NotificationUtil.suppression);
       this.subject$.next(this.conges);
    }, err => {
      this.notificationService.warn(NotificationUtil.echec);
    }, () => {
      this.currentPlanningConge.etat = EtatPlanningConge.saisi;
      this.updatedPlanningConge(this.currentPlanningConge)
    });
  }
});
  }

  ngOnDestroy() {
  }
  updatedPlanningConge(planningConge: PlanningConge){
    this.planningService.update(planningConge)
          .subscribe( response => {
    }, err => {

    }, () => {
      this.setEatPlanningDirection(this.currentPlanningDirection);
    })
  } 
  setEatPlanningDirection(planningDirection: PlanningDirection){
    planningDirection.etat = EtatPlanningDirection.saisi;
    this.planningDirectionService.update(planningDirection)
          .subscribe( response => {
          })
  } 
   hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  importConge() {
    this.dialog
    .open(ImportCongeComponent, { 
      data: {planningconge: this.currentPlanningConge, unite: this.uniteOrganisationnelle},   
    })
    .afterClosed()
    .subscribe((conges: Conge[]) => {
      /**
       * Congé is the updated conge (if the user pressed Save - otherwise it's null)
       */ if (conges) {
        /**
         * Here we are updating our local array.
         */
        conges.forEach(conge => {
          this.conges.unshift(new Conge(conge));
        });
        this.subject$.next(this.conges);
      }
  });
}



voirConge(conge: Conge){
  this.getSuiviConge(conge)
   
  
}
getSuiviConge(conge:Conge){
  /*this.suiviAttestationService.getAll().subscribe(response=>{

    this.suiviAttestations = response.body
    this.suiviAttestations = this.suiviAttestations.filter(a=> (a.attestation .id=== attestaion.id))

    this.suiviAttestations.forEach(element => {
        this.suiviAttestation =element;
    });
    
  }, err => console.log(err)
  , ()=> genererPDF(attestaion,this.suiviAttestation ));*/
  this.conges = this.conges.filter(c=> (c.id=== conge.id))
  genererPDF(conge ) 
  /* this.conges.forEach(element => {
    this.suiviAttestation =element;
  });*/
}


}
