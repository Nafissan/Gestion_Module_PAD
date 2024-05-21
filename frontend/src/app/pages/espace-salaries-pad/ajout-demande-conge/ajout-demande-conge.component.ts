import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Conge } from '../../gestion-conge/shared/model/conge.model';
import { DossierConge } from '../../gestion-conge/shared/model/dossier-conge.model';
import { PlanningConge } from '../../gestion-conge/shared/model/planning-conge.model';
import { PlanningDirection } from '../../gestion-conge/shared/model/planning-direction.model';
import { CongeService } from '../../gestion-conge/shared/services/conge.service';
import { DossierCongeService } from '../../gestion-conge/shared/services/dossier-conge.service';
import { PlanningCongeService } from '../../gestion-conge/shared/services/planning-conge.service';
import { PlanningDirectionService } from '../../gestion-conge/shared/services/planning-direction.service';
import { EtatConge, EtatDossierConge, EtatPlanningConge } from '../../gestion-conge/shared/util/util';
import { UniteOrganisationnelleService } from '../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { Compte } from '../../gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from '../../gestion-utilisateurs/shared/services/compte.service';
import { AuthenticationService } from '../../../shared/services/authentification.service';
import { AgentService } from '../../../shared/services/agent.service';
import { DialogConfirmationService } from '../../../shared/services/dialog-confirmation.service';
import { Agent } from '../../../shared/model/agent.model';
import { UniteOrganisationnelle } from '../../../shared/model/unite-organisationelle';
import { DialogUtil, NotificationUtil } from '../../../shared/util/util';
import { NotificationService } from '../../../shared/services/notification.service';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-ajout-demande-conge',
  templateUrl: './ajout-demande-conge.component.html',
  styleUrls: ['./ajout-demande-conge.component.scss' , "../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
  providers: [
   
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
  
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class AjoutDemandeCongeComponent implements OnInit {
  username: string;
  agentConnecte: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteSuperieureAgent: UniteOrganisationnelle;
  compte: Compte;
  currentPlanningDirection: PlanningDirection;
  currentPlanningConge: PlanningConge;
  planningConges: PlanningConge[];
  currentDossierConge: DossierConge;
  dossierconges: DossierConge[];
  currentDate: Date = new Date();
  

  minDateDepart: Date;
  maxDateDepart: Date;
  minDatePrevisionnelle: Date;
  maxDatePrevisionnelle: Date;
  conge: Conge;
  agent: Agent;
  form: FormGroup;
  mode: "create" | "update" = "create";

  // For autocomplete
  agentCtrl: FormControl;
  filteredAgents: Observable<any[]>;
  agents: Agent[];

  constructor
  (
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AjoutDemandeCongeComponent>,
    private fb: FormBuilder,
    private congeService: CongeService,
    private router: Router,
    private agentService: AgentService,
    private planningService: PlanningCongeService,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private planningDirectionService: PlanningDirectionService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dossierCongeService: DossierCongeService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private notificationService:NotificationService,
  ) {}

  ngOnInit(): void {
    this._adapter.setLocale('fr');
    
    // Autocomplete contrôle
    this.agentCtrl = new FormControl();

    if (this.defaults) {
      this.mode = "update";
      this.agentCtrl.setValue(this.defaults.agent.matricule)
    } 
    else {
      this.defaults = {} as Conge;
    }

    this.getDossierConges();

    this.form = this.fb.group({
      dateDepart: new FormControl({value: new Date(this.defaults.dateDepart), disabled: false}, [
        Validators.required,
      ]),
      dureePrevisionnelle: new FormControl(this.defaults.dureePrevisionnelle || 0,
         [Validators.required]
      ),
      description: new FormControl(this.defaults.description || "", [
        Validators.required,
      ]),
      code: new FormControl({ value: this.defaults.id, disabled: true }),
      // codePL: new FormControl({ value: this.idPlanningConge, disabled: true }),
    });

    this.username = this.authentificationService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agentConnecte = this.compte.agent;
      this.uniteOrganisationnelle = this.agentConnecte.uniteOrganisationnelle;
      this.getUniteOrganisationnelleSuperieure(this.currentDossierConge);
    }, err => { }
      , () => {
        // this.getAgents();
      });
  }
   // Get All DossierConge
   getDossierConges() {
    this.dossierCongeService.getAll().subscribe(
      (response) => {
        this.dossierconges = response.body;
        this.currentDossierConge = this.dossierconges.find(e => e.etat === EtatDossierConge.saisi || e.etat === EtatDossierConge.ouvert);
      },
      (err) => { },
      () => {
        this.minDateDepart = new Date(this.currentDate.getFullYear(),0);
        this.maxDateDepart = new Date(this.currentDate.getFullYear(),11,31);
        this.getAgentConnecte(this.currentDossierConge);
      });
  }

  getAgentConnecte(dossierConge: DossierConge) {
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agentConnecte = this.compte.agent;
      this.uniteOrganisationnelle = this.agentConnecte.uniteOrganisationnelle;
    }, err => { },
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
      }, err => {},
      () => {
        this.getPlanningCongeByPlanningDirectionAndUniteOrganisationnelle(this.currentPlanningDirection);
      })
    }
    getPlanningCongeByPlanningDirectionAndUniteOrganisationnelle(planningDirection: PlanningDirection) {
      this.planningService
        .getAllByPlanningDirectionAndUniteOrganisationnelle(planningDirection.id, this.uniteOrganisationnelle.id)
        .subscribe(
          (response) => {
            this.planningConges = response.body;      
            this.currentPlanningConge = this.planningConges.find(e => e.planningDirection.id === planningDirection.id);
          }, err => {},
           () => {
             this.getAgentsByUniteOrganisationelleSansConge(this.currentPlanningConge);
           });
    }

  // Get All Agents by Unite Organisationelle
  getAgentsByUniteOrganisationelleSansConge(planningConge: PlanningConge) {
    this.agentService.getAllSansConge(planningConge.uniteOrganisationnelle.id, this.currentDossierConge.annee).subscribe(
      (response) => {
        this.agents = response.body;
      },
      (err) => {},
      () => {
        // Autocomplete
        this.filteredAgents = this.agentCtrl.valueChanges.pipe(
          startWith(""),
          map((agent) =>
            agent ? this.filterStates(agent) : this.agents.slice()
          )
        );
      }
    );
  }
  filterStates(matricule: string) {
    return this.agents.filter(
      (agent) =>
        this.agentConnecte.matricule.toLowerCase().indexOf(matricule.toLowerCase()) === 0 ||
        this.agentConnecte.prenom.toLowerCase().indexOf(matricule.toLowerCase()) === 0    ||
        this.agentConnecte.nom.toLowerCase().indexOf(matricule.toLowerCase()) === 0       
    );
  }
  
  save() {
    if (this.mode === "create") {
      this.createConge();
    } else if (this.mode === "update") {
      this.updateConge();
    }
  }
  setAgent(agent){
    this.agent = this.agentConnecte;
  }
  createConge() {
    let conge: Conge               = this.form.value;
    conge.dateSaisie               = new Date();
    conge.etat                     = EtatConge.saisi;
    conge.planningConge            = this.currentPlanningConge;
    conge.agent                    = this.agentConnecte;
    conge.code                     = 'C' + '-' + this.agentConnecte.matricule + '-' + new Date().getTime();
    conge.niveau                   = this.agentConnecte.uniteOrganisationnelle.niveauHierarchique.position;
    conge.etape                    = conge.niveau;
    conge.dateRetourPrevisionnelle = this.addDays(new Date(conge.dateDepart), conge.dureePrevisionnelle);
    conge.mois                     = new Date(conge.dateDepart).toLocaleString("fr-FR", { month: "long" });
    conge.annee                    = new Date(conge.dateDepart).getFullYear().toString();
    
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
            this.congeService.create(conge).subscribe((response) => {
              this.notificationService.success(NotificationUtil.ajout);
              this.dialogRef.close(response.body);
            }, err => {
              this.notificationService.warn(NotificationUtil.echec);
          },
          () => {
            this.updatePlanningConge();
          })
      } else {
      this.dialogRef.close();
    }
  })
  }
  
  updateConge() {
    let conge: Conge = this.form.value;
    conge.id                       =  this.defaults.id;
    conge.dateSaisie               = this.defaults.dateSaisie;
    conge.etat                     = this.defaults.etat;
    conge.planningConge            = this.currentPlanningConge;
    conge.agent                    = this.defaults.agent;  
    conge.code                     = this.defaults.code;
    conge.niveau                   = this.defaults.niveau;
    conge.etape                    = this.defaults.etape;
    conge.dateRetourPrevisionnelle = this.addDays(new Date(conge.dateDepart), conge.dureePrevisionnelle);
    conge.mois                     = new Date(conge.dateDepart).toLocaleString("fr-FR", { month: "long" });
    conge.annee                    = new Date(conge.dateDepart).getFullYear().toString();
    
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
          this.congeService.update(conge).subscribe((response) => {
            this.notificationService.success(NotificationUtil.modification);
            this.dialogRef.close(conge);
          }, err => {
            this.notificationService.warn(NotificationUtil.echec);
        },
        () => {})
         } 
     else {
      this.dialogRef.close();
    }
  })
  }
  updatePlanningConge() {
     if(this.currentPlanningConge.etat === EtatPlanningConge.saisi){
        this.currentPlanningConge.etat = EtatPlanningConge.encours;
        this.planningService.update(this.currentPlanningConge).subscribe((response) => {
              this.notificationService.success(EtatPlanningConge.ouvert);
            }, err => {
              this.notificationService.warn(NotificationUtil.echec);
          },
          () => {});
      }
  }
  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
 
  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}
}
