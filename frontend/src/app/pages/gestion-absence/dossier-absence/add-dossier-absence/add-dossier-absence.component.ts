import { Component, OnInit, Inject } from '@angular/core';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { Agent } from '../../../../shared/model/agent.model';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { DialogUtil } from '../../../../shared/util/util';
import { Router } from '@angular/router';

import { DossierAbsence } from '../../shared/model/dossier-absence.modele';
import { AddAbsenceComponent } from '../../absence/add-absence/add-absence.component';
import { DossierAbsenceService } from '../../shared/service/dossier-absence.service';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-add-dossier-absence',
  templateUrl: './add-dossier-absence.component.html',
  styleUrls: ['./add-dossier-absence.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class AddDossierAbsenceComponent implements OnInit {

  dialogUtil: DialogUtil = new DialogUtil();
 /// etatPlanningDirection: EtatPlanningDirection = new EtatPlanningDirection();
  username: string;
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  compte: Compte;
  uniteSuperieureAgent: UniteOrganisationnelle;
  uniteDCH: UniteOrganisationnelle;
  niveauValidation: number;
  form: FormGroup;
  dossierAbsences: DossierAbsence[];
  dossierAbsence: DossierAbsence;
  idDossierConge: string;
  mode: "create" | "update" = "create";
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: DossierAbsence,
    private dialogRef: MatDialogRef<AddAbsenceComponent>,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dossierAbsenceService: DossierAbsenceService,
    private fb: FormBuilder,
    private router: Router,
    private dialogConfirmationService: DialogConfirmationService,
  ) { }

  ngOnInit(): void {
    // Get ID Dossier Conge
    // this.idDossierConge = this.router.url.slice(this.router.url.lastIndexOf('/') + 1);
    // DossierConge en fonction de l'ID passe en parametre dans l'URL
   // this.getDossierConge();
    //
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
    }, err => { },
      () => { this.getUniteOrganisationnelleSuperieure(); });

    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as DossierAbsence;
    }
    // FormGroup
    this.form = this.fb.group({
      description: new FormControl(this.defaults.description || "", [
        Validators.required,
      ]),
      code: new FormControl({ value: this.defaults.code, disabled: true }),
    });
  }

  getDossierConge() {
    this.dossierAbsenceService.getById(parseInt(this.idDossierConge))
      .subscribe(response => {
        this.dossierAbsence = response.body;
      }, err => { },
        () => {
         // this.getUniteOrganisationelleFromDossierConge(this.dossierAbsence);
        });
  }

  getUniteOrganisationnelleSuperieure() {
    let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.uniteSuperieureAgent = this.uniteOrganisationnelle
    } else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        });
    }
  }
  getUniteOrganisationelleFromDossierAbsence(dossierAbsence: DossierAbsence) {
    this.uniteOrganisationnelleService.getByCode(dossierAbsence.structure)
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
      this.createDossierAbsence();
    } else if (this.mode === "update") {
    //  this.updatePlanningDirection();
    }
  }
  createDossierAbsence() {
    let dossierAbsence: DossierAbsence = this.form.value;

    dossierAbsence.matricule = this.agent.matricule;
    dossierAbsence.prenom = this.agent.prenom;
    dossierAbsence.nom = this.agent.nom;
    dossierAbsence.fonction = this.agent.fonction.nom;
    dossierAbsence.annee = new Date().getFullYear();
    dossierAbsence.codeDirection = this.uniteSuperieureAgent.code;
    dossierAbsence.code = "DA-" + dossierAbsence.annee + "-" +this.uniteSuperieureAgent.nom;
    dossierAbsence.nomDirection = this.uniteSuperieureAgent.nom;
    dossierAbsence.descriptionDirection = this.uniteSuperieureAgent.description;

  //  planningDirection.dossierConge = this.dossierConge;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierAbsenceService.create(dossierAbsence).subscribe((response) => {
          this.dialogRef.close(response.body);
        });
      }
      else {
        this.dialogRef.close();
      }
    });
  }

  // updatePlanningDirection() {
  //   let planningDirection: PlanningDirection = this.defaults;
  //   planningDirection.description = this.form.value.description;

  //   this.dialogConfirmationService.confirmationDialog().subscribe(action => {
  //     if (action === this.dialogUtil.confirmer) {
  //       this.planningDirectionService.update(planningDirection).subscribe((response) => {
  //         this.dialogRef.close(planningDirection);
  //       })
  //     }
  //     else {
  //       this.dialogRef.close();
  //     }
  //   })
  // }
  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }

}
