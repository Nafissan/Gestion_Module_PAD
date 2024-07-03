import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { Agent } from "../../../../shared/model/agent.model";
import { RapportProspection } from "../../shared/model/rapport-prospection.model";
import { RapportProspectionService } from "../../shared/service/rapport-prospection.service";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { DialogUtil, NotificationUtil } from "src/app/shared/util/util";
import { Compte } from "src/app/pages/gestion-utilisateurs/shared/model/compte.model";
import { CompteService } from "src/app/pages/gestion-utilisateurs/shared/services/compte.service";
import { DossierColonieService } from "../../shared/service/dossier-colonie.service";
import { EtatDossierColonie } from "../../shared/util/util";

@Component({
  selector: "app-add-update-rapport-prospection",
  templateUrl: "./add-or-update-rapport-prospection.component.html",
  styleUrls: ["./add-or-update-rapport-prospection.component.scss"]
})
export class AddOrUpdateRapportProspectionComponent implements OnInit {
  form: FormGroup;
  agent: Agent;
  mode: "create" | "update" = "create";
  rapportProspection: RapportProspection;
  currentDate: Date = new Date();
  username: string;
  compte: Compte;
  fileRapportProspection: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: RapportProspection,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddOrUpdateRapportProspectionComponent>,
    private authService: AuthenticationService,    
    private compteService: CompteService,
    private rapportProspectionService: RapportProspectionService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private dossierColonieService: DossierColonieService 
  ) {this.form = this.fb.group({
    codeDossierColonie: [null],
    rapport: [null]
  });}

  async ngOnInit(): Promise<void> {
    this.username = this.authService.getUsername();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });

      if (this.defaults) {
        this.mode = "update";
      } else {
        this.defaults = {} as RapportProspection;
      }

      this.initForm();
    
  }

  initForm(): void {
    this.form.patchValue({
      codeDossierColonie: this.defaults.codeDossierColonie.code || null, 
      rapport: this.defaults.rapportProspection || this.rapportProspection
    });

    if (this.mode === "update") {
      this.form.get("codeDossierColonie").disable();
    }
  }

  async handleRapportProspection(files: FileList): Promise<void> {
    if (files.length > 0) {
      this.fileRapportProspection = await this.convertFileToBase64(files[0]);
    }
  }
  async convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
      }
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Content = base64String.split(',')[1];
        resolve(base64Content);      
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
  async save(): Promise<void> {
    if (this.mode === "create") {
      this.createRapport();
    } else if (this.mode === "update") {
      this.updateRapportProspection();
    }
  }

  async createRapport(): Promise<void> {
    if (this.form.valid) {
      const formData: RapportProspection = {
        ...this.form.value,
        dateCreation: this.currentDate,
        matricule: this.agent.matricule,
        nom: this.agent.nom,
        prenom: this.agent.prenom,
        rapportProspection: this.fileRapportProspection,
        prenomAgent: '',
        nomAgent: '',
        matriculeAgent: '',
        dateValidation: null,
        etat: "A VALIDER"
      };

      try {
        const dossiersResponse = await this.dossierColonieService.getAll().toPromise();
        const dossiers = dossiersResponse.body;
        const openOrSaisiDossier = dossiers.find(dossier => dossier.etat === EtatDossierColonie.ouvert || dossier.etat === EtatDossierColonie.saisi);

        if (openOrSaisiDossier) {
          formData.codeDossierColonie = openOrSaisiDossier;
          console.log(formData);

          this.dialogConfirmationService.confirmationDialog().subscribe(action => {
            if (action === DialogUtil.confirmer) {
              this.rapportProspectionService.saveRapportProspection(formData).subscribe(response => {
                if (response.body.id != null) {
                  this.notificationService.success(NotificationUtil.ajout);
                  this.dialogRef.close(formData);
                } else {
                  this.notificationService.warn("Erreur dans l'ajout du formulaire");
                  this.dialogRef.close();
                }
              }, err => {
                this.notificationService.warn(NotificationUtil.echec);
              });
            } else {
              this.dialogRef.close();
            }
          });
        } else {
          this.notificationService.warn("No open or saisie dossier found");
          this.dialogRef.close();
        }
      } catch (error) {
        console.error('Failed to fetch dossiers', error);
      }
    }
  }

   updateRapportProspection() {
    if (this.form.valid) {
      const formData: RapportProspection = {
        ...this.form.value,
        id: this.defaults.id,
        matriculeAgent: this.agent.matricule,
        matricule: this.defaults.matricule,
        nom: this.defaults.nom,
        prenom: this.defaults.prenom,
        rapportProspection: this.rapportProspection ? this.rapportProspection : this.defaults.rapportProspection,
        dateValidation: this.defaults.dateValidation,
        nomAgent: this.agent.nom,
        prenomAgent: this.agent.prenom,
        dateCreation: this.defaults.dateCreation,
        etat: this.defaults.etat
      };

      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === DialogUtil.confirmer) {
          this.rapportProspectionService.updateRapportProspection(formData).subscribe(() => {
            this.notificationService.success(NotificationUtil.modification);
            this.dialogRef.close(formData);
          }, err => {
            this.notificationService.warn(NotificationUtil.echec);
          });
        } else {
          this.dialogRef.close();
        }
      });
    }
  }

  isCreateMode(): boolean {
    return this.mode === "create";
  }

  isUpdateMode(): boolean {
    return this.mode === "update";
  }

  resetFormAndCloseDialog(): void {
    this.form.reset();
    this.dialogRef.close();
  }
}
