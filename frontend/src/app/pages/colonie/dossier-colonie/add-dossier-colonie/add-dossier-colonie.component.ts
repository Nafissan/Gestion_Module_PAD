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
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})export class AddDossierColonieComponent implements OnInit {
  dateCreation: FormControl; 
  username: string;
  agent: Agent;
  compte: Compte;
  form: FormGroup;
  mode: "create" | "update" = "create";
  colonieDossier: DossierColonie;
  etatDossierColonie: EtatDossierColonie = new EtatDossierColonie();
  selectedFileName: string = '';


  // Autres propriétés nécessaires
  fileNoteMinistere: File | null = null;
  fileDemandeProspetion: File | null = null;
  fileNotePersonnels: File | null =null;
  fileNotePelerins: File | null =null;
  fileRapport: File | null =null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: DossierColonie,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDossierColonieComponent>,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dossierColonieService: DossierColonieService,
    private dialog: MatDialog,
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

 
 
  handleNoteMinistereFileInput(files: FileList) {
    if (files.length > 0) {
      this.fileNoteMinistere  = files[0];
      this.selectedFileName = this.fileNoteMinistere.name;
      console.log(this.fileNoteMinistere.name);
      // Faites quelque chose avec le fichier
    }
  }

  handleDemandeProspectionFileInput(files: FileList): void {
    this.fileDemandeProspetion = files.item(0);
  }

  handleNotePersonels(files: FileList): void {
    this.fileNotePersonnels = files.item(0);
  }
  handleNotePelerins(files: FileList): void {
    this.fileNotePelerins = files.item(0);
  }
  handleRapport(files: FileList): void {
    this.fileRapport = files.item(0);
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
    formData.etat                 = EtatDossierColonie.saisi; 
    formData.noteMinistere        = this.fileNoteMinistere,
    formData.demandeProspection   = null, 
    formData.notePelerins   = null, 
    formData.notePersonnels   = null, 

    formData.matricule            = this.agent.matricule;
    formData.prenom               = this.agent.prenom;
    formData.nom                  = this.agent.nom;
    formData.fonction             = this.agent.fonction.nom;

    formData.codeDirection        = this.agent.uniteOrganisationnelle.code;
    formData.nomDirection         = this.agent.uniteOrganisationnelle.nom;
    formData.descriptionDirection = this.agent.uniteOrganisationnelle.description;
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierColonieService.getDossiersList().subscribe(dossiers => {
          const existingDossier = dossiers.find(dossier => dossier.annee === formData.annee);
          if (existingDossier) {
            this.notificationService.warn(`Le dossier colonie de l'année ${formData.annee} existe déjà`);
            this.dialogRef.close();
          } else {
            const newDossier = new DossierColonie(formData);
            dossiers.push(newDossier);
            this.dossierColonieService.setDossiersList(dossiers);
            this.notificationService.success(NotificationUtil.ajout);
            this.dialogRef.close(newDossier);
          }
        });
      } else {
        this.dialogRef.close();
      }
    });
  }

  updateDossierColonie(): void {
    const formData: DossierColonie = this.form.value ;
    formData.annee                = this.defaults.annee;
    formData.code                 = this.defaults.code;
    formData.etat                 = EtatDossierColonie.saisi;  

    formData.matricule            = this.defaults.matricule;
    formData.prenom               = this.defaults.prenom;
    formData.nom                  = this.defaults.nom;
    formData.fonction             = this.defaults.fonction;

    formData.codeDirection        = this.defaults.codeDirection;
    formData.nomDirection         = this.defaults.nomDirection;
    formData.descriptionDirection = this.defaults.descriptionDirection;
    formData.noteMinistere = this.fileNoteMinistere;
    formData.demandeProspection = this.fileDemandeProspetion;
    formData.notePelerins = this.fileNotePelerins;
    formData.notePersonnels = this.fileNotePersonnels;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        console.log(formData);
        this.dossierColonieService.updateDossier(formData).subscribe(updatedDossier => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(updatedDossier);
        });
      } else {
        this.dialogRef.close();
      }
    });
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

  resetFormAndCloseDialog(): void {
    this.form.reset();
    this.fileNoteMinistere = null;
    this.fileDemandeProspetion = null;
    this.dialogRef.close();
  }
}
