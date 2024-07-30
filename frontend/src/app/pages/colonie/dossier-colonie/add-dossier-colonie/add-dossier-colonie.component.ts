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
import { DialogUtil, MailDossierColonie, NotificationUtil } from "src/app/shared/util/util";
import * as moment from "moment";
import { DossierColonieService } from "../../shared/service/dossier-colonie.service";
import { MailService } from "src/app/shared/services/mail.service";
import { Mail } from "src/app/shared/model/mail.model";
import { AgentService } from "src/app/shared/services/agent.service";
import { RapportProspectionService } from "../../shared/service/rapport-prospection.service";
import { RapportProspection } from "../../shared/model/rapport-prospection.model";
import { SatisfactionService } from "../../shared/service/satisfaction.service";
import { Satisfaction } from "../../shared/model/satisfaction.model";
import { Participant } from "../../shared/model/participant-colonie.model";
import { ParticipantService } from "../../shared/service/participant.service";

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
  mode: "create" | "update" | "fermer" = "create";
  colonieDossier: DossierColonie;
  etatDossierColonie: EtatDossierColonie = new EtatDossierColonie();
  selectedFileName: string = '';
  emails: string[] = [];
  emailSentForNoteInstruction: boolean = false;
defaults: DossierColonie;
  // Autres propriétés nécessaires
  noteMinistere: string | null = null;
  demandeProspection: string | null = null;
  notePersonnels: string | null = null;
  notePelerins: string | null = null;
  rapport: string | null = null;
  rapportProspection: RapportProspection;
  satisfactions: Satisfaction;
  colon: Participant[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : { dossier: DossierColonie, property: string },
    private fb: FormBuilder,    private rapportService: RapportProspectionService,

    private dialogRef: MatDialogRef<AddDossierColonieComponent>,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dossierColonieService: DossierColonieService,
    private dialog: MatDialog,   
     private mailService: MailService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private satisfactionService: SatisfactionService,
    private agentService: AgentService ,
    private   participantService: ParticipantService


  ) {  
  }

  ngOnInit(): void {
    this.getRapportProspections();
    this.getSatisfactions();
    this.getColons();
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
      this.defaults = {} as DossierColonie;
    }

    this.dateCreation = new FormControl(this.defaults.annee ? new Date(this.defaults.annee) : moment());
    this.form = this.fb.group({
      description: new FormControl(this.defaults.description || "", [
        Validators.required,
      ]),
      commentaire: new FormControl(this.defaults.commentaire || "", ),
      code: new FormControl({ value: this.defaults.code, disabled: true }),
      type: new FormControl(this.defaults.type || "", ),

    });
  }

  getAllAgentEmails(){
     this.agentService.getAgentEmail().subscribe((response) => {
      this.emails= response.body;
    }, err => {
      this.notificationService.warn(err);},);
  }
  getColons() {
    this.participantService.getParticipantsValide().subscribe(response => {
      this.colon = response.body as Participant[];
    console.log(this.colon.length);
    }, err => {
      console.error('Error loading participant colonies:', err);
    });
}
  getSatisfactions() {
   
    this.satisfactionService.getFormulaireByDossierEtat().subscribe(response => {
      this.satisfactions = response.body as Satisfaction;
    }, err => {
      console.error('Error loading participant colonies:', err);
    });
}
async handleNoteMinistereFileInput(files: FileList) {
  if (files.length > 0) {
      const file = files[0];
      if (this.isValidPdfType(file)) {
          this.noteMinistere = await this.convertFileToBase64(file);
          this.selectedFileName = file.name;
      } else {
          this.notificationService.warn('Le format de fichier doit être PDF.');
      }
  }
}

async handleDemandeProspectionFileInput(files: FileList) {
  if (files.length > 0) {
      const file = files[0];
      if (this.isValidPdfType(file)) {
          this.demandeProspection = await this.convertFileToBase64(file);
      } else {
          this.notificationService.warn('Le format de fichier doit être PDF.');
      }
  }
}

async handleNotePersonels(files: FileList) {
  if (files.length > 0) {
      const file = files[0];
      if (this.isValidPdfType(file)) {
          this.notePersonnels = await this.convertFileToBase64(file);
      } else {
          this.notificationService.warn('Le format de fichier doit être PDF.');
      }
  }
}
  getRapportProspections() {
    this.rapportService.getRapportProspectionByEtat().subscribe(
      (response) => {
        this.rapportProspection = response.body as RapportProspection;

      },
      (err) => {        
         console.error('Error loading rapport prospection colonies:', err); 
      }
    );
}
async handleNotePelerins(files: FileList) {
  if (files.length > 0) {
      const file = files[0];
      if (this.isValidPdfType(file)) {
          this.notePelerins = await this.convertFileToBase64(file);
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
      this.createDossierColonie();
    } else if (this.mode === "update") {
      this.updateDossierColonie();
    }else if (this.mode === "fermer"){      this.fermerDossier();
    } 
  }

  createDossierColonie(): void {
    let formData: DossierColonie   = this.form.value;
    formData.annee                = new Date(this.dateCreation.value).getFullYear().toString();
    formData.code                 = 'DCLN' + '-' + 'PAD' + '-' +formData.annee;
    formData.etat                 = EtatDossierColonie.ouvert; 
    formData.noteMinistere        = this.noteMinistere;
    formData.demandeProspection   = null; 
    formData.noteInformation   = null;
    formData.noteInstruction   = null;
    formData.rapportMission = null;
    formData.matricule            = this.agent.matricule;
    formData.prenom               = this.agent.prenom;
    formData.nom                  = this.agent.nom;
    formData.fonction             = this.agent.fonction.nom;

    formData.createdAt = new Date();
    formData.updatedAt = null;
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierColonieService.create(formData).subscribe(response => {
          let existingDossier = response.body;
          if (existingDossier.id != null) {
            this.notificationService.success(NotificationUtil.ajout);
            this.dialogRef.close(response.body as DossierColonie);
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
    formData.demandeProspection = this.demandeProspection ? this.demandeProspection : this.defaults.demandeProspection;
    formData.noteInformation = this.notePersonnels ? this.notePersonnels : this.defaults.noteInformation;
    formData.noteInstruction = this.notePelerins ? this.notePelerins : this.defaults.noteInstruction;
    formData.rapportMission = this.rapport ? this.rapport : this.defaults.rapportMission;
    formData.createdAt = this.defaults.createdAt;
    formData.updatedAt = new Date();
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierColonieService.update(formData).subscribe(reponse => {
          this.notificationService.success(NotificationUtil.modification);
          /*if(this.notePersonnels){
            this.sendEmail(
              "Note d'information",
              "Ci-joint la note d'information sur les colonies de vacances",
              this.notePersonnels
            );
          }
          if(this.notePelerins){
            this.sendEmail(
              'Note Instruction ',
              "Ci-joint la note d'instruction sur les colonies de vacances",
              this.notePelerins
            );
          }*/
          this.dialogRef.close(formData);

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
        const base64Content = base64String.split(',')[1];
        resolve(base64Content);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
  async sendEmail(subject: string, body: string, file: string): Promise<void> {
    this.getAllAgentEmails();
    if (this.emails && this.emails.length > 0) {
      let mail = new Mail();
      mail.objet = subject;
      mail.contenu = body;
      mail.destinataires = this.emails;
      mail.lien = "";
      mail.emetteur = ''; 
      mail.file = file;
  
      this.mailService.sendMailByDirections(mail).subscribe(
        response => {
          this.notificationService.success('Email sent successfully');
        },
        error => {
          this.notificationService.warn('Failed to send email');
        }
      );
    } else {
      this.notificationService.warn('No emails found to send the notification');
    }
  }
  
  fermerDossier(){
    const formData: DossierColonie = this.form.value ;
    formData.id                   = this.defaults.id;
    formData.annee                = this.defaults.annee;
    formData.code                 = this.defaults.code;
    formData.etat                 = EtatDossierColonie.fermer;  

    formData.matricule            = this.defaults.matricule;
    formData.prenom               = this.defaults.prenom;
    formData.nom                  = this.defaults.nom;
    formData.fonction             = this.defaults.fonction;
    formData.noteMinistere = this.defaults.noteMinistere;
    formData.demandeProspection = this.defaults.demandeProspection;
    formData.noteInformation = this.defaults.noteInformation;
    formData.noteInstruction =  this.defaults.noteInstruction;
    formData.rapportMission = this.defaults.rapportMission;
    formData.createdAt = this.defaults.createdAt;
    formData.updatedAt = new Date();
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierColonieService.update(formData).subscribe(reponse => {
          this.notificationService.success(NotificationUtil.fermetureDossier);
          this.dialogRef.close(reponse.body);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);},
       )
      }else {
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
  isCloseMode() {
    return this.mode === "fermer";
  }
  chosenYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = this.dateCreation.value;
    ctrlValue.year(normalizedYear.year());
    this.dateCreation.setValue(ctrlValue);
  }
}
