import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { Agent } from "../../../../shared/model/agent.model";
import { DossierColonie } from "../../shared/model/dossier-colonie.model";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from "@angular/material-moment-adapter";
import { Compte } from "src/app/pages/gestion-utilisateurs/shared/model/compte.model";
import { EtatDossierColonie } from "../../shared/util/util";
import { DialogUtil, NotificationUtil } from "src/app/shared/util/util";
import * as moment from "moment";
import { DossierColonieService } from "../../shared/service/dossier-colonie.service";
import { MailService } from "src/app/shared/services/mail.service";
import { Mail } from "src/app/shared/model/mail.model";

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
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
  selector: "fury-add-dossier-colonie",
  templateUrl: "./add-dossier-colonie.component.html",
  styleUrls: ["./add-dossier-colonie.component.scss"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})export class AddDossierColonieComponent implements OnInit {
  dateCreation: FormControl; 
  dateModif: FormControl; 
  username: string;
  agent: Agent;
  compte: Compte;
  form: FormGroup;
  mode: "create" | "update" = "create";
  colonieDossier: DossierColonie;
  etatDossierColonie: EtatDossierColonie = new EtatDossierColonie();
  selectedFileName: string = '';
  emailSentForNoteInformation: boolean = false;
  emailSentForNoteInstruction: boolean = false;

  // Autres propriétés nécessaires
  noteMinistere: string | null = null;
  demandeProspection: string | null = null;
  notePersonnels: string | null = null;
  notePelerins: string | null = null;
  rapport: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: DossierColonie,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDossierColonieComponent>,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dossierColonieService: DossierColonieService,
    private dialog: MatDialog,   
     private mailService: MailService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });

    if (this.defaults) {
      this.mode = "update";
      this.emailSentForNoteInformation = !!this.defaults.noteInformation;
      this.emailSentForNoteInstruction = !!this.defaults.noteInstruction;
    } else {
      this.defaults = {} as DossierColonie;
    }

    // FormControl for DatePicker
    this.dateCreation = new FormControl(this.defaults.annee ? new Date(this.defaults.annee) : moment());
    // FormGroup
    this.form = this.fb.group({
      description: new FormControl(this.defaults.description || "", [
        Validators.required,
      ]),
      code: new FormControl({ value: this.defaults.code, disabled: true }),
    });
  }

 
 
  async handleNoteMinistereFileInput(files: FileList) {
    if (files.length > 0) {
      this.noteMinistere = await this.convertFileToBase64(files[0]);
      this.selectedFileName = files[0].name;
    }
  }

  async handleDemandeProspectionFileInput(files: FileList) {
    if (files.length > 0) {
      this.demandeProspection = await this.convertFileToBase64(files[0]);
    }
  }

  async handleNotePersonels(files: FileList) {
    if (files.length > 0) {
      this.notePersonnels = await this.convertFileToBase64(files[0]);

      if (!this.emailSentForNoteInformation) {
        this.sendEmail(
          'New Note Information Uploaded',
          'A new Note Information file has been uploaded.',
          ['nnafissa27@gmail.com'],
          this.notePersonnels
        );
        this.emailSentForNoteInformation = true;
      }
    }
  }

  async handleNotePelerins(files: FileList) {
    if (files.length > 0) {
      this.notePelerins = await this.convertFileToBase64(files[0]);

      if (!this.emailSentForNoteInstruction) {
        this.sendEmail(
          'New Note Instruction Uploaded',
          'A new Note Instruction file has been uploaded.',
          ['nnafissa27@gmail.com'],
          this.notePelerins
        );
        this.emailSentForNoteInstruction = true;
      }
    }
  }

  async handleRapport(files: FileList) {
    if (files.length > 0) {
      this.rapport = await this.convertFileToBase64(files[0]);
    }
  }

  save(): void {
    if (this.mode === "create") {
      this.createDossierColonie();
    } else if (this.mode === "update") {
      this.updateDossierColonie();
    }
  }

  createDossierColonie(): void {
    let formData: DossierColonie   = this.form.value;
    formData.annee                = new Date(this.dateCreation.value).getFullYear().toString();
    formData.code                 = 'DCLN' + '-' + 'PAD' + '-' + formData.annee;
    formData.etat                 = EtatDossierColonie.ouvert; 
    formData.noteMinistere        = this.noteMinistere;
    formData.demandeProspection   = null; 
    formData.noteInformation   = null;
    formData.noteInstruction   = null;
    formData.rapportProspection = null;
    formData.rapportMission = null;
    formData.matricule            = this.agent.matricule;
    formData.prenom               = this.agent.prenom;
    formData.nom                  = this.agent.nom;
    formData.fonction             = this.agent.fonction.nom;

    formData.createdAt = new Date();
    formData.updatedAt = null;
    formData.formulaireSatisfaction = null;
    formData.colons= null;
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierColonieService.create(formData).subscribe(response => {
          let existingDossier = response.body;
          if (existingDossier.id != null) {
            this.notificationService.success(NotificationUtil.ajout);
            this.dialogRef.close(response.body);
          } else {
            this.notificationService.warn(`Le dossier colonie de l'année ${formData.annee} existe déjà`);
            this.dialogRef.close();
          }
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);}, 
          () => {});
      } else {
        this.dialogRef.close();
      }
    })
  }

  updateDossierColonie(): void {
    const formData: DossierColonie = this.form.value ;
    formData.id                   = this.defaults.id;
    formData.annee                = this.defaults.annee;
    formData.code                 = this.defaults.code;
    formData.etat                 = EtatDossierColonie.saisi;  

    formData.matricule            = this.defaults.matricule;
    formData.prenom               = this.defaults.prenom;
    formData.nom                  = this.defaults.nom;
    formData.fonction             = this.defaults.fonction;

    formData.noteMinistere = this.defaults.noteMinistere;
    formData.demandeProspection = this.demandeProspection;
    formData.noteInformation = this.notePersonnels;
    formData.noteInstruction = this.notePelerins;
    formData.rapportProspection = this.defaults.rapportProspection;
    formData.rapportMission = this.rapport;
    formData.formulaireSatisfaction = this.defaults.formulaireSatisfaction;
    formData.colons= this.defaults.colons;
    formData.createdAt = this.defaults.createdAt;
    formData.updatedAt = new Date();
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        console.log("update dossier "+formData);
        this.dossierColonieService.update(formData).subscribe(reponse => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(reponse);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);},
        () => { })
      } else {
        this.dialogRef.close();
      }
    })
  }
  async convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
      }
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix to get only the Base64 string
        const base64Content = base64String.split(',')[1];
        resolve(base64Content);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
  sendEmail(subject: string, body: string, recipients: string[], file: string): void {
    let mail = new Mail();
    mail.objet = subject;
    mail.contenu = body;
    mail.destinataires = recipients;
    mail.lien = "";
    mail.emetteur = "";
    mail.file = file;
    this.mailService.sendMailByDirections(mail).subscribe(
      response => {
        this.notificationService.success('Email sent successfully');
      },
      error => {
        this.notificationService.warn('Failed to send email');
      }
    );
  }
  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
  chosenYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = this.dateCreation.value;
    ctrlValue.year(normalizedYear.year());
    this.dateCreation.setValue(ctrlValue);
  }
}
