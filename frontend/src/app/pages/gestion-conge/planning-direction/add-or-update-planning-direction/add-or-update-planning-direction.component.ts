import { Component, OnInit, Inject } from '@angular/core';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { PlanningDirectionService } from '../../shared/services/planning-direction.service';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { DossierCongeService } from '../../shared/services/dossier-conge.service';
import { PlanningDirection } from '../../shared/model/planning-direction.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { Agent } from '../../../../shared/model/agent.model';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { DialogUtil, NotificationUtil } from '../../../../shared/util/util';
import { DossierConge } from '../../shared/model/dossier-conge.model';
import { EtatPlanningDirection, EtatDossierConge } from '../../shared/util/util';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'fury-add-or-update-planning-direction',
  templateUrl: './add-or-update-planning-direction.component.html',
  styleUrls: ['./add-or-update-planning-direction.component.scss']
})
export class AddOrUpdatePlanningDirectionComponent implements OnInit {
  username: string;
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  compte: Compte;

  currentDossierConge: DossierConge;
  dossierconges: DossierConge[];
  // currentDate: Date = new Date();

  uniteSuperieureAgent: UniteOrganisationnelle;
  uniteDCH: UniteOrganisationnelle;
  niveauValidation: number;
  form: FormGroup;

  mode: "create" | "update" = "create";
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: PlanningDirection,
    private dialogRef: MatDialogRef<AddOrUpdatePlanningDirectionComponent>,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private planningDirectionService: PlanningDirectionService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dossierCongeService: DossierCongeService,
    private fb: FormBuilder,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService:NotificationService,
  ) { }

  ngOnInit(): void {
   
    this.getDossierConges();
  
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as PlanningDirection;
    }
    // FormGroup
    this.form = this.fb.group({
      description: new FormControl(this.defaults.description || "", [
        Validators.required,
      ]),
      code: new FormControl({ value: this.defaults.code, disabled: true }),
    });
  }
  // Get All DossierConge
  getDossierConges() {
    this.dossierCongeService.getAll().subscribe(
      (response) => {
        this.dossierconges = response.body;
        // let currentYear: string = this.currentDate.getFullYear().toString();
        this.currentDossierConge = this.dossierconges.find(e => e.etat === EtatDossierConge.saisi || e.etat === EtatDossierConge.ouvert);
      },
      (err) => { },
      () => {
        this.getAgentConnecte(this.currentDossierConge);
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
   getUniteOrganisationnelleSuperieure(dossierConge: DossierConge) {
    let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.uniteSuperieureAgent = this.uniteOrganisationnelle;
      this.getUniteOrganisationelleFromDossierConge(dossierConge);
    } else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        }, err => {},
        () => {
          this.getUniteOrganisationelleFromDossierConge(dossierConge);
        });
    }
  }
  getUniteOrganisationelleFromDossierConge(dossierConge: DossierConge) {
    this.uniteOrganisationnelleService.getByCode(dossierConge.codeDirection)
      .subscribe(response => {
        this.uniteDCH = response.body;
      }, err => { },
        () => {
          this.getUniteOrganisationnellesDCH(this.uniteDCH);
        });
  }

  getUniteOrganisationnellesDCH(uniteOrganisationnelle: UniteOrganisationnelle) {
    this.uniteOrganisationnelleService.getAllInferieures(uniteOrganisationnelle.id)
      .subscribe(response => {
        this.uniteOrganisationnelleInferieures = response.body;
        if (this.uniteOrganisationnelleInferieures && this.uniteOrganisationnelleInferieures.length === 0) {
          this.niveauValidation = this.uniteDCH.niveauHierarchique.position;
        } else if (this.uniteOrganisationnelleInferieures && this.uniteOrganisationnelleInferieures.length !== 0) {
          let unite = this.uniteOrganisationnelleInferieures.find(e => e.niveauHierarchique.position === 3);
          this.niveauValidation = unite.niveauHierarchique.position;
        }
      });
  }

  save() {
    if (this.mode === "create") {
      this.createPlanningDirection();
    } else if (this.mode === "update") {
      this.updatePlanningDirection();
    }
  }
  createPlanningDirection() {
    let planningDirection: PlanningDirection = this.form.value;

    planningDirection.niveau               = this.niveauValidation;
    planningDirection.etape                = 0;
    planningDirection.etat                 = EtatPlanningDirection.saisi;

    planningDirection.matricule            = this.agent.matricule;
    planningDirection.prenom               = this.agent.prenom;
    planningDirection.nom                  = this.agent.nom;
    planningDirection.fonction             = this.agent.fonction.nom;

    planningDirection.nomDirection         = this.uniteSuperieureAgent.nom;
    planningDirection.codeDirection        = this.uniteSuperieureAgent.code;
    planningDirection.code                 = 'PD' + '-' + planningDirection.nomDirection + '-' + new Date().getTime();
    planningDirection.descriptionDirection = this.uniteSuperieureAgent.description;

    planningDirection.dossierConge = this.currentDossierConge;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.planningDirectionService.create(planningDirection).subscribe((response) => {
          this.notificationService.success(NotificationUtil.ajout);
          this.dialogRef.close(response.body);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
      },
      () => {});
      }
      else {
        this.dialogRef.close();
      }
    });
  }

  updatePlanningDirection() {
    let planningDirection: PlanningDirection = this.defaults;
    planningDirection.description            = this.form.value.description;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.planningDirectionService.update(planningDirection).subscribe((response) => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(planningDirection);
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

}
