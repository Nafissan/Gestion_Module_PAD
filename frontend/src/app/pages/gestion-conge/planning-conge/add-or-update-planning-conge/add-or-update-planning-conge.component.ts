import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { PlanningCongeService } from "../../shared/services/planning-conge.service";
import { PlanningConge } from "../../shared/model/planning-conge.model";
import { Router, NavigationEnd } from '@angular/router';
import { EtatPlanningConge, EtatPlanningDirection } from "../../shared/util/util";
import { Agent } from "../../../../shared/model/agent.model";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { DossierConge } from "../../shared/model/dossier-conge.model";
import { PlanningDirectionService } from "../../shared/services/planning-direction.service";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import { PlanningDirection } from "../../shared/model/planning-direction.model";
import { NotificationService } from "../../../../shared/services/notification.service";

@Component({
  selector: "fury-add-or-update-planning-conge",
  templateUrl: "./add-or-update-planning-conge.component.html",
  styleUrls: ["./add-or-update-planning-conge.component.scss"],
})
export class AddOrUpdatePlanningCongeComponent implements OnInit {
  encours: string  = EtatPlanningDirection.encours;
  minDate: Date;
  maxDate: Date;
  username: string;
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  compte: Compte;

  planningDirection: PlanningDirection;
  etatPlanningConge: EtatPlanningConge = new EtatPlanningConge();
  idPlanningDirection: string

  annee: string;
  planningConge: PlanningConge;
  form: FormGroup;
  mode: "create" | "update" = "create";
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: PlanningConge,
    private dialogRef: MatDialogRef<AddOrUpdatePlanningCongeComponent>,
    private fb: FormBuilder,
    private planningCongeService: PlanningCongeService,
    private router: Router,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private planningDirectionService: PlanningDirectionService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService:NotificationService,
  ) { }

  ngOnInit() {
    // Get ID Dossier Conge
    this.idPlanningDirection = this.router.url.slice(this.router.url.lastIndexOf('/') + 1)
    // PlanningDirectionen fonction de l'ID passe en parametre dans l'URL
    this.getByPlanningDirection();
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
      console.log("AGENT: ", this.agent);
    });

    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as PlanningConge;
    }
    this.form = this.fb.group({
      description: new FormControl(this.defaults.description || "", [Validators.required]),
      // dateCreation: new FormControl(new Date(this.defaults.dateCreation) || "", [Validators.required]),
      // codePD: new FormControl({ value: this.idPlanningDirection, disabled: true }),
      codePL: new FormControl({ value: this.defaults.code || "", disabled: true }),
    });
  }
  getByPlanningDirection() {
    this.planningDirectionService.getById(parseInt(this.idPlanningDirection))
      .subscribe(
        response => {
          this.planningDirection = response.body
          this.minDate = new Date(parseInt(this.planningDirection.dossierConge.annee), 0);
          this.maxDate = new Date(parseInt(this.planningDirection.dossierConge.annee), 11, 31);
        });
  }


  save() {
    if (this.mode === "create") {
      this.createPlanningConge();
    } else if (this.mode === "update") {
      this.updatePlanningConge();
    }
  }

  createPlanningConge() {
    let planningConge: PlanningConge     = this.form.value;
    planningConge.dateCreation           = new Date();
    this.annee                           = new Date(planningConge.dateCreation).getFullYear().toString();
    planningConge.code                   = 'PC' + '-' + this.uniteOrganisationnelle.nom + '-' + new Date().getTime();
    planningConge.etat                   = EtatPlanningConge.saisi;
    planningConge.planningDirection      = this.planningDirection;
    planningConge.uniteOrganisationnelle = this.uniteOrganisationnelle;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
         this.planningCongeService.create(planningConge).subscribe((response) => {
          console.log("response ", response);  
          this.notificationService.success(NotificationUtil.ajout);
          this.dialogRef.close(response.body);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
      },
      () => {
        this.updatePlanningDirection();
      })
      }else {
        this.dialogRef.close();
      }
    })
  }

  updatePlanningConge() {
    let planningConge: PlanningConge = this.form.value;
    planningConge.id                     = this.defaults.id;
    planningConge.code                   = this.defaults.code;
    planningConge.etat                   = this.defaults.etat;
    planningConge.dateCreation           = new Date(this.defaults.dateCreation);
    planningConge.planningDirection      = this.defaults.planningDirection;
    planningConge.uniteOrganisationnelle = this.defaults.uniteOrganisationnelle;
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.planningCongeService.update(planningConge).subscribe((response) => {
          console.log("planning conge updated: ", response); 
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(planningConge);
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
  
  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }

  updatePlanningDirection() {
    if(this.planningDirection.etat === EtatPlanningDirection.saisi){
      this.planningDirection.etat = this.encours;
      this.planningDirectionService.update(this.planningDirection).subscribe((response) => {
        this.notificationService.success(EtatPlanningDirection.encours);
          }, err => {
              this.notificationService.warn(NotificationUtil.echec);
          },
          () => {});
        }
  }
}
