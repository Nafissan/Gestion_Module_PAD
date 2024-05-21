import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Conge } from '../../gestion-conge/shared/model/conge.model';
import { Compte } from '../../gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from '../../gestion-utilisateurs/shared/services/compte.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddOrUpdateCongeComponent } from '../../gestion-conge/conge/add-or-update-conge/add-or-update-conge.component';
import { DetailsCongeComponent } from '../../gestion-conge/conge/details-conge/details-conge.component';
import { CongeService } from '../../gestion-conge/shared/services/conge.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { AjoutDemandeCongeComponent } from '../ajout-demande-conge/ajout-demande-conge.component';
import { PlanningDirection } from '../../gestion-conge/shared/model/planning-direction.model';
import { EtatConge, EtatDossierConge, EtatPlanningConge, EtatPlanningDirection } from '../../gestion-conge/shared/util/util';
import { PlanningConge } from '../../gestion-conge/shared/model/planning-conge.model';
import { DossierConge } from '../../gestion-conge/shared/model/dossier-conge.model';
import { PlanningCongeService } from '../../gestion-conge/shared/services/planning-conge.service';
import { DossierCongeService } from '../../gestion-conge/shared/services/dossier-conge.service';
import { UniteOrganisationnelleService } from '../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { PlanningDirectionService } from '../../gestion-conge/shared/services/planning-direction.service';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { UniteOrganisationnelle } from '../../../shared/model/unite-organisationelle';
import { AuthenticationService } from '../../../shared/services/authentification.service';
import { DialogConfirmationService } from '../../../shared/services/dialog-confirmation.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Agent } from '../../../shared/model/agent.model';
import { ListColumn } from '../../../../@fury/shared/list/list-column.model';
import { DialogUtil, NotificationUtil } from '../../../shared/util/util';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'fury-mes-conges',
  templateUrl: './mes-conges.component.html',
  styleUrls: ['./mes-conges.component.scss', "../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MesCongesComponent implements OnInit, AfterViewInit, OnDestroy  {
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
    private planningService: PlanningCongeService,
    private dossierCongeService: DossierCongeService,
    private authentificationService: AuthenticationService,
    private notificationService:NotificationService,
  ) {}

    ngOnInit() {
/*       this.dataSource = new MatTableDataSource();
      this.data$.pipe(filter((data) => !!data)).subscribe((conges) => {
      this.conges = conges;
      this.dataSource.data = conges;      
    });

    this.username = this.authentificationService.getUsername();
    this.compteService.getByUsername(this.username).subscribe( (response) => {
        this.compte = response.body;
        this.agent = this.compte.agent;
        this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
        this.getCongeByAgent();
    } );

    this.getDossierConges(); */

/*   this.data$.pipe(filter((data) => !!data)).subscribe((conges) => {
    this.conges = conges;
    this.dataSource.data = conges;
  }); */
  this.getDossierConges();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((conges) => {
    this.conges = conges;
    this.dataSource.data = conges;
  });

  }
  
  getAgentConnecte(dossierConge: DossierConge) {
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
    }, err => { },
      () => {
        this.getUniteOrganisationnelleSuperieure(dossierConge);
      });
  } 

    // Get All DossierConge
  getDossierConges() {
    this.dossierCongeService.getAll().subscribe(
      (response) => {
        this.dossierconges = response.body;
        this.currentDossierConge = this.dossierconges.find(e => e.etat === EtatDossierConge.saisi || e.etat === EtatDossierConge.ouvert);
        console.log("currentDossierConge "+this.currentDossierConge.description)
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
    

  getCongeByAgent() {
    this.congeService.getCongeByIdAgent(this.agent.id).subscribe(
      (response) => {
        this.conges = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.conges);
        this.showProgressBar = true;
      }
    );
  }

  getUniteOrganisationnelleSuperieure(dossierConge: DossierConge) {
    let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.uniteSuperieureAgent = this.uniteOrganisationnelle;//unite n'a pas de superieur
     
   
        this.getPlanningDirection(this.uniteSuperieureAgent.code, dossierConge.id)
      
      console.log("n'a pas de superieur")
    } else {
      console.log("a un superieur")
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        }, err => { },
          () => {
           
              this.getPlanningDirection(this.uniteSuperieureAgent.code, dossierConge.id)
            
          })
    }
  }

  getPlanningDirection(codeDirection: string, idDossierConge: number) {
    this.planningDirectionService.getByCodeDirectionAndDossierConge(codeDirection, idDossierConge)
      .subscribe(response => {
        this.currentPlanningDirection = response.body;
        console.log("this.currentPlanningDirection.description "+this.currentPlanningDirection.description)
      }, err => {},
      () => {         
            this.getPlanningCongeByPlanningDirectionAndUniteOrganisationnelle(this.currentPlanningDirection);           
      });
  }

  getPlanningCongeByPlanningDirectionAndUniteOrganisationnelle(planningDirection: PlanningDirection) {  
    
    this.planningService
      .getAllByPlanningDirectionAndUniteOrganisationnelle(planningDirection.id, this.uniteOrganisationnelle.id)
      .subscribe(
        (response) => {
          this.planningConges = response.body;      
          this.currentPlanningConge = this.planningConges.find(e => e.planningDirection.id === planningDirection.id);
          console.log("planningConges length "+this.planningConges.length)
          console.log("conges.length "+this.conges.length)
        }, err => {},
         () => {
          if(this.currentPlanningConge){
            this.getCongeByAgent();
           }else{
            this.showProgressBar = true;
           }
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
      .open(AjoutDemandeCongeComponent)
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
    });
  }
});
  }

 ngOnDestroy(){}
}
