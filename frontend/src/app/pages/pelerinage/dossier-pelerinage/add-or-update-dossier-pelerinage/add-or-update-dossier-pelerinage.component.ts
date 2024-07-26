import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { Agent } from "../../../../shared/model/agent.model";
import { DossierPelerinage } from "../../shared/model/dossier-pelerinage.model";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from "@angular/material-moment-adapter";
import { Compte } from "src/app/pages/gestion-utilisateurs/shared/model/compte.model";
import { EtatDossierPelerinage } from "../../shared/util/util";
import { DialogUtil, MailDossierColonie, NotificationUtil } from "src/app/shared/util/util";
import * as moment from "moment";
import { DossierPelerinageService } from "../../shared/services/dossier-pelerinage.service";
import { MailService } from "src/app/shared/services/mail.service";
import { Mail } from "src/app/shared/model/mail.model";
import { AgentService } from "src/app/shared/services/agent.service";


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
  selector: 'fury-add-or-update-dossier-pelerinage',
  templateUrl: './add-or-update-dossier-pelerinage.component.html',
  styleUrls: ['./add-or-update-dossier-pelerinage.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AddOrUpdateDossierPelerinageComponent implements OnInit {
  dateCreation: FormControl; 
  dateModif: FormControl; 
  username: string;
  agent: Agent;
  compte: Compte;
  form: FormGroup;
  mode: "create" | "update" | "fermer" = "create";
  dossierPelerinage: DossierPelerinage;
  etatDossierPelerinage: EtatDossierPelerinage = new EtatDossierPelerinage();
  defaults: DossierPelerinage;
  noteInformation: string | null = null;
  rapport: string | null = null;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data : { dossier: DossierPelerinage, property: string },
  private fb: FormBuilder,   
  private dialogRef: MatDialogRef<AddOrUpdateDossierPelerinageComponent>,
  private authService: AuthenticationService,
  private compteService: CompteService,
  private dossierPelerinageService: DossierPelerinageService,
  private dialog: MatDialog,   
   private mailService: MailService,
  private dialogConfirmationService: DialogConfirmationService,
  private notificationService: NotificationService,
  private agentService: AgentService ,
) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });

    if (this.data && this.data.dossier && this.data.property==="update") {
      this.defaults = this.data.dossier;
      this.mode = "update";
    } else if(this.data && this.data.property==="fermer") { 
      this.mode = "fermer";
      this.defaults = this.data.dossier;
    }
    else{
      this.defaults = {} as DossierPelerinage;
    }

    this.dateCreation = new FormControl(this.defaults.annee ? new Date(this.defaults.annee) : moment());
    this.form = this.fb.group({
      description: new FormControl(this.defaults.description || "", [
        Validators.required,
      ]),
      commentaire: new FormControl(this.defaults.commentaire || "", ),
      code: new FormControl({ value: this.defaults.code, disabled: true }),
      lieuPelerinage: new FormControl(this.defaults.lieuPelerinage || "", ),

    });
  }
  async handlenoteInformationFileInput(files: FileList) {
    if (files.length > 0) {
        const file = files[0];
        if (this.isValidPdfType(file)) {
            this.noteInformation = await this.convertFileToBase64(file);
        } else {
            this.notificationService.warn('Le format de fichier doit être PDF.');
        }
    }
  }
  
async handleRapport(files: FileList) {
  if (files.length > 0) {
      const file = files[0];
      if (this.isValidPdfType(file)) {
          this.rapport = await this.convertFileToBase64(file);
      } else {
          this.notificationService.warn('Le format de fichier doit être PDF.');
      }
  }
}
private isValidPdfType(file: File): boolean {
  return file.type === 'application/pdf';
}
  save(): void {
    if (this.mode === "create") {
      this.createDossierPelerinage();
    } else if (this.mode === "update") {
      this.updateDossierPelerinage();
    }else if (this.mode === "fermer"){      
      this.fermerDossierPelerinage();
    } 
  }
  createDossierPelerinage(): void {
    let formData: DossierPelerinage = this.form.value;
    formData.annee = '2023';
    formData.code = 'DPLG' + '-' + 'PAD' + '-' + formData.lieuPelerinage+ '-'+formData.annee;
    formData.etat = EtatDossierPelerinage.ouvert; 
    formData.matricule = this.agent.matricule;
    formData.prenom = this.agent.prenom;
    formData.nom = this.agent.nom;
    formData.fonction = this.agent.fonction.nom;
    formData.createdAt = new Date();
    formData.updatedAt = null;
  
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierPelerinageService.create(formData).subscribe(response => {
          let existingDossier = response.body;
          if (existingDossier.id != null) {
            this.notificationService.success('Dossier pèlerinage ajouté avec succès');
            this.dialogRef.close(response.body as DossierPelerinage);
          } else {
            this.notificationService.warn(`Le dossier pèlerinage de l'année ${formData.annee} existe déjà`);
            this.dialogRef.close();
          }
        }, err => {
          this.notificationService.warn('Échec de l\'ajout du dossier pèlerinage');
        });
      } else {
        this.dialogRef.close();
      }
    });
  }
  
  updateDossierPelerinage(): void {
    const formData: DossierPelerinage = this.form.value;
    formData.id = this.defaults.id;
    formData.annee = this.defaults.annee;
    formData.code = this.defaults.code;
    formData.etat = EtatDossierPelerinage.saisi; // Remplacez par l'énumération appropriée si nécessaire
    formData.matricule = this.defaults.matricule;
    formData.prenom = this.defaults.prenom;
    formData.nom = this.defaults.nom;
    formData.fonction = this.defaults.fonction;
    formData.noteInformation = this.noteInformation? this.noteInformation : this.defaults.noteInformation;
    formData.rapportPelerinage = this.rapport? this.rapport : this.defaults.rapportPelerinage;
    formData.createdAt = this.defaults.createdAt;
    formData.updatedAt = new Date();
  
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierPelerinageService.update(formData).subscribe(response => {
          this.notificationService.success('Dossier pèlerinage mis à jour avec succès');
          this.dialogRef.close(formData);
        }, err => {
          this.notificationService.warn('Échec de la mise à jour du dossier pèlerinage');
        });
      } else {
        this.dialogRef.close();
      }
    });
  }
  fermerDossierPelerinage(): void {
    const formData: DossierPelerinage = this.form.value;
    formData.id = this.defaults.id;
    formData.annee = this.defaults.annee;
    formData.code = this.defaults.code;
    formData.etat = EtatDossierPelerinage.fermer; // Remplacez par l'énumération appropriée si nécessaire
    formData.matricule = this.defaults.matricule;
    formData.prenom = this.defaults.prenom;
    formData.nom = this.defaults.nom;
    formData.fonction = this.defaults.fonction;
    formData.noteInformation = this.defaults.noteInformation;
    formData.rapportPelerinage = this.defaults.rapportPelerinage;
    formData.createdAt = this.defaults.createdAt;
    formData.updatedAt = new Date();
  
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierPelerinageService.update(formData).subscribe(response => {
          this.notificationService.success('Dossier pèlerinage fermé avec succès');
          this.dialogRef.close(response.body);
        }, err => {
          this.notificationService.warn('Échec de la fermeture du dossier pèlerinage');
        });
      } else {
        this.dialogRef.close();
      }
    });
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

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
  isCloseMode() {
    return this.mode === "fermer";
  }
  chosenYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = this.dateCreation.value;
    ctrlValue.year(normalizedYear.year());
    this.dateCreation.setValue(ctrlValue);
  }
}
