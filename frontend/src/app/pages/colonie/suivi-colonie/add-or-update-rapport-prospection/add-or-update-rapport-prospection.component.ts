import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { Agent } from "../../../../shared/model/agent.model";
import { RapportProspection } from "../../shared/model/rapport-prospection.model";
import { RapportProspectionService } from "../../shared/service/rapport-prospection.service";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { DialogUtil, MailDossierColonie, NotificationUtil } from "src/app/shared/util/util";
import { Compte } from "src/app/pages/gestion-utilisateurs/shared/model/compte.model";
import { CompteService } from "src/app/pages/gestion-utilisateurs/shared/services/compte.service";
import { DossierColonieService } from "../../shared/service/dossier-colonie.service";
import { EtatDossierColonie } from "../../shared/util/util";
import { Mail } from "src/app/shared/model/mail.model";
import { MailService } from "src/app/shared/services/mail.service";
import { DossierColonie } from "../../shared/model/dossier-colonie.model";
import { AgentService } from "src/app/shared/services/agent.service";

@Component({
  selector: "app-add-update-rapport-prospection",
  templateUrl: "./add-or-update-rapport-prospection.component.html",
  styleUrls: ["./add-or-update-rapport-prospection.component.scss"]
})
export class AddOrUpdateRapportProspectionComponent implements OnInit {
  form: FormGroup;
  agent: Agent;
  mode: "create" | "update" | "rejeter" = "create";
  rapportProspection: RapportProspection;
  currentDate: Date = new Date();
  username: string;
  compte: Compte;
  fileRapportProspection: string | null = null;
defaults:RapportProspection;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {rapport: RapportProspection , property: string },
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddOrUpdateRapportProspectionComponent>,
    private authService: AuthenticationService,    
    private compteService: CompteService,
    private rapportProspectionService: RapportProspectionService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,     private mailService: MailService,
    private agentService: AgentService, // Injecter le service AgentService
    private dossierColonieService: DossierColonieService 
  ) {this.form = this.fb.group({
    codeDossierColonie: [null],
    commentaire:[""],
  });}

  async ngOnInit(): Promise<void> {
    this.username = this.authService.getUsername();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });

      if (this.data && this.data.rapport && this.data.property ==="update") {
        this.mode = "update";
        this.defaults=this.data.rapport;
      }else if(this.data && this.data.property==="rejeter"){
        this.mode= "rejeter";
        this.defaults=this.data.rapport;
      } else {
        this.defaults = {} as RapportProspection;
      }

      this.initForm();
    
  }

  initForm(): void {
    this.form.patchValue({
      codeDossierColonie: this.defaults.codeDossierColonie?.code, 
      commentaire: this.defaults.commentaire,
    });

    if (this.mode === "update") {
      this.form.get("codeDossierColonie").disable();
    }
  }

  async handleRapportProspection(files: FileList): Promise<void> {
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
          this.fileRapportProspection = await this.convertFileToBase64(file);
      } else {
        this.notificationService.warn('Le format de fichier doit être PDF.');
      }
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
    }else if(this.mode === "rejeter"){
      this.closeRapportProspection();
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
          this.dialogConfirmationService.confirmationDialog().subscribe(action => {
            if (action === DialogUtil.confirmer) {
              this.rapportProspectionService.saveRapportProspection(formData).subscribe(response => {
                if (response.body as RapportProspection && response.body.id != null ) {
                  this.notificationService.success(NotificationUtil.ajout);
                  this.dialogRef.close(response.body);
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
      } catch (error) {
        console.error('Failed to fetch r&apport', error);
      }
    }
  }
  closeRapportProspection() {
    const formData: RapportProspection = {
      ...this.form.value,
      id: this.defaults.id,
      matriculeAgent: this.defaults.matriculeAgent,
      matricule: this.defaults.matricule,
      nom: this.defaults.nom,
      prenom: this.defaults.prenom,
      codeDossierColonie: this.defaults.codeDossierColonie,
      rapportProspection:  this.defaults.rapportProspection,
      dateValidation: this.defaults.dateValidation,
      nomAgent: this.defaults.nomAgent,
      prenomAgent: this.defaults.prenomAgent,
      dateCreation: this.defaults.dateCreation,
      etat: this.defaults.etat
    }; 
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.rapportProspectionService.updateRapportProspection(formData).subscribe((response) => {
          this.notificationService.success(NotificationUtil.fermetureDossier);
          this.dialogRef.close(formData);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        });
      }
      });
   }

   updateRapportProspection() {
const formData: RapportProspection = {
  ...this.form.value,
        id: this.defaults.id,
        matriculeAgent: this.agent.matricule,
        matricule: this.defaults.matricule,
        nom: this.defaults.nom,
        prenom: this.defaults.prenom,
        codeDossierColonie: this.defaults.codeDossierColonie,
        rapportProspection: this.fileRapportProspection ? this.fileRapportProspection : this.defaults.rapportProspection,
        dateValidation: this.defaults.dateValidation,
        nomAgent: this.agent.nom,
        prenomAgent: this.agent.prenom,
        dateCreation: this.defaults.dateCreation,
        etat: "A VALIDER"
      };

      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === DialogUtil.confirmer) {
          this.rapportProspectionService.updateRapportProspection(formData).subscribe((response) => {
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

  isCreateMode(): boolean {
    return this.mode === "create";
  }

  isUpdateMode(): boolean {
    return this.mode === "update";
  }
  isCloseMode(): boolean {
    return this.mode === "rejeter";
  }
  resetFormAndCloseDialog(): void {
    this.form.reset();
    this.dialogRef.close();
  }
}
