import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { Agent } from "../../../../shared/model/agent.model";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { HistoriqueCongeService } from "../../shared/services/historique-conge.service";
import { HistoriqueConge } from "../../shared/model/historique-conge.model";
import { EtatConge, EtatPlanningDirection } from "../../shared/util/util";
import { CongeService } from "../../shared/services/conge.service";
import { Conge } from "../../shared/model/conge.model";
import { EtapePlanningDirection } from "../../shared/model/etape-planning-direction.model";
import { PlanningDirection } from "../../shared/model/planning-direction.model";
import { EtapePlanningDirectionService } from "../../shared/services/etape-planning-dierction.service";
import { PlanningDirectionService } from "../../shared/services/planning-direction.service";
import { DialogConfirmationService, } from "../../../../shared/services/dialog-confirmation.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
// import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: "fury-etape-validation",
  templateUrl: "./etape-validation.component.html",
  styleUrls: ["./etape-validation.component.scss", '../../../../shared/util/bootstrap4.css'],
  // providers: [{
  //   provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  // }]
})
export class EtapeValidationComponent implements OnInit {
  dialogUtil: DialogUtil = new DialogUtil();
  form: FormGroup;
  motif: string;

  username: string;
  agent: Agent;
  compte: Compte;
  historiqueConge: HistoriqueConge;
  etatConge: EtatConge = new EtatConge();
  etatPlanningDirection: EtatPlanningDirection = new EtatPlanningDirection();
  etapePlanningDirections: EtapePlanningDirection[];
  historiqueConges: HistoriqueConge[];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<EtapeValidationComponent>,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private historiqueCongeService: HistoriqueCongeService,
    private congeService: CongeService,
    private etapePlanningDirectionService: EtapePlanningDirectionService,
    private planningDirectionService: PlanningDirectionService,
    private dialogConfirmationService: DialogConfirmationService,  
    private notificationService:NotificationService, 
  ) { }

  ngOnInit(): void {
    this.motif = this.defaults.vue;
    this.form = this.fb.group({
      description: new FormControl("", [Validators.required,]),
    });

    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });

    if (this.motif === 'historique-planning') {
      this.getEtapePlanningDirectionByPlanningDirection();
    } else if (this.motif === 'historique-conge') {
      this.getHistoriqueCongeByConge();
    }
  }
  createObjetHistoriqueConge(): HistoriqueConge{
    let historiqueConge: HistoriqueConge = this.form.value;      
    historiqueConge.conge                = this.defaults.conge;
    historiqueConge.prenom               = this.agent.prenom;
    historiqueConge.nom                  = this.agent.nom;
    historiqueConge.matricule            = this.agent.matricule;
    historiqueConge.fonction             = this.agent.fonction.nom;
    historiqueConge.structure            = this.agent.uniteOrganisationnelle.description;
    historiqueConge.date                 = new Date();
    return historiqueConge;
  }
  createObjetEtapePlanningDirection(): EtapePlanningDirection{  
    let etapePlanningDirection: EtapePlanningDirection = this.form.value;
    etapePlanningDirection.date = new Date();
    etapePlanningDirection.etat = this.defaults.planningDirection.etat;
    etapePlanningDirection.fonction = this.agent.fonction.nom;
    etapePlanningDirection.structure = this.agent.uniteOrganisationnelle.description;
    etapePlanningDirection.matricule = this.agent.matricule;
    etapePlanningDirection.prenom = this.agent.prenom;
    etapePlanningDirection.nom = this.agent.nom;
    etapePlanningDirection.planningDirection = this.defaults.planningDirection;
    return etapePlanningDirection;
  }
  save() {
    if (this.motif === "rejeter-conge") {
      let historiqueConge: HistoriqueConge = this.createObjetHistoriqueConge();
           historiqueConge.etat            = EtatConge.rejeter;
      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === DialogUtil.confirmer) {
            this.createHistoriqueConge(historiqueConge);
            this.notificationService.success(NotificationUtil.rejet);
        }else{
          this.notificationService.warn(NotificationUtil.echec);
        }
      });
    }
    else if (this.motif === "valider-conge") {
      let historiqueConge: HistoriqueConge = this.createObjetHistoriqueConge();
      historiqueConge.etat = EtatConge.valider; 
      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === DialogUtil.confirmer) {
            this.createHistoriqueConge(historiqueConge);
            this.notificationService.success(NotificationUtil.validation);
        }else{
          this.notificationService.warn(NotificationUtil.echec);
        }
      });
    } 
    else if (this.motif === "valider-planning") {
      let etapePlanningDirection: EtapePlanningDirection = this.createObjetEtapePlanningDirection();
      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === DialogUtil.confirmer) {
          this.createEtapePlanningDirection(etapePlanningDirection).subscribe( response => {
          },err => { },
            () => {
              let planningDirection = this.defaults.planningDirection;
              planningDirection.etat = EtatPlanningDirection.valider;
              this.updatePlanningDirection(planningDirection);
              this.notificationService.success(NotificationUtil.validation);
            });
        } else {
          this.notificationService.warn(NotificationUtil.echec);
        }
      });
    }
    else if (this.motif === "transmettre-planning") {
      let etapePlanningDirection: EtapePlanningDirection = this.createObjetEtapePlanningDirection();
      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === DialogUtil.confirmer) {
          this.createEtapePlanningDirection(etapePlanningDirection).subscribe( response => {
          },err => { },
            () => {
              let planningDirection = this.defaults.planningDirection;
              planningDirection.etat = EtatPlanningDirection.transmis;
              this.updatePlanningDirection(planningDirection);
              this.notificationService.success(NotificationUtil.transmis);
            });
        } else {
          this.notificationService.warn(NotificationUtil.echec);
        }
      });
    } 
    else if (this.motif === "imputer-planning") {
      let etapePlanningDirection: EtapePlanningDirection = this.createObjetEtapePlanningDirection();
      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === DialogUtil.confirmer) {
          this.createEtapePlanningDirection(etapePlanningDirection).subscribe( response => {
          },err => { },
            () => {
              let planningDirection = this.defaults.planningDirection;
              this.updatePlanningDirectionImputer(planningDirection);
              this.notificationService.success(NotificationUtil.impute);
            });
        } else {
          this.notificationService.warn(NotificationUtil.echec);
        }
      });
    }
    else if (this.motif === "cloturer-planning") {
      let etapePlanningDirection: EtapePlanningDirection = this.createObjetEtapePlanningDirection();
      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === DialogUtil.confirmer) {
          this.createEtapePlanningDirection(etapePlanningDirection).subscribe( response => {
          },err => { },
            () => {
              let planningDirection = this.defaults.planningDirection;
              this.updatePlanningDirectionCloturer(planningDirection);
              this.notificationService.success(NotificationUtil.cloture);
            });
        } else {
          this.notificationService.warn(NotificationUtil.echec);
        }
      });
    }
  }
  createHistoriqueConge(historiqueConge: HistoriqueConge) {
    this.historiqueCongeService.create(historiqueConge)
      .subscribe(response => {
      }, err => { },
        () => {
          if (this.motif === "valider-conge") {
            this.updateCongeValider(this.defaults.conge);
          } else if (this.motif === "rejeter-conge") {
            this.updateCongeRejeter(this.defaults.conge);
          }
        });
  }

  createEtapePlanningDirection(etapePlanningDirection: EtapePlanningDirection) {
     return this.etapePlanningDirectionService.create(etapePlanningDirection);
  }

  updatePlanningDirection(planningDirection: PlanningDirection) {
    this.planningDirectionService.create(planningDirection)
      .subscribe(response => {
      }, err => { },
        () => {
          this.dialogRef.close(planningDirection);
        })
  }
  updatePlanningDirectionImputer(planningDirection: PlanningDirection) {
    if (planningDirection.etape < (planningDirection.niveau - 1) ) {
       planningDirection.etape += 1;
       planningDirection.etat  = EtatPlanningDirection.imputer;
    }
    this.planningDirectionService.create(planningDirection)
      .subscribe(response => {
      }, err => { },
        () => {
          this.dialogRef.close(planningDirection);
        })

  }
  updatePlanningDirectionCloturer(planningDirection: PlanningDirection) {
    if (planningDirection.etape === (planningDirection.niveau - 1) ) {
      planningDirection.etape += 1;
      planningDirection.etat = EtatPlanningDirection.cloturer;
     }
    this.planningDirectionService.create(planningDirection)
      .subscribe(response => {
      }, err => { },
        () => {
          this.dialogRef.close(planningDirection);
        })

  }
  updateCongeValider(conge: Conge) {
    conge.etape = conge.etape - 1;
    if (conge.etape !== 0) {
        conge.etat = EtatConge.encours;
    }
    if (conge.etape === 0) {
       conge.etat = EtatConge.valider;
    }
    this.congeService.update(conge)
      .subscribe(response => {
        conge = response.body;
      }, err => { },
        () => {
          this.dialogRef.close(conge);
        })
  }
  updateCongeRejeter(conge: Conge) {
    conge.etat = EtatConge.rejeter;
    conge.etape = conge.niveau;
    this.congeService.update(conge)
      .subscribe(response => {
        conge = response.body;
      }, err => { },
        () => {
          this.dialogRef.close(conge);
        })
  }
  getEtapePlanningDirectionByPlanningDirection() {
    this.etapePlanningDirectionService.getByPlanningDirection(this.defaults.planningDirection.id)
      .subscribe(response => {
        this.etapePlanningDirections = response.body;
      });
  }
  getHistoriqueCongeByConge() {
    this.historiqueCongeService.getByConge(this.defaults.conge.id)
      .subscribe(response => {
        this.historiqueConges = response.body;
      })
    }
}
