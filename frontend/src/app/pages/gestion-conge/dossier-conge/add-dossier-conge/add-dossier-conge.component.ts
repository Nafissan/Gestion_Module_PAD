import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Form, Validators, FormControl, } from "@angular/forms";
import { DossierConge } from "../../shared/model/dossier-conge.model";
import { EtatDossierConge } from "../../shared/util/util";
import { DossierCongeService } from "../../shared/services/dossier-conge.service";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { Agent } from "../../../../shared/model/agent.model";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

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
  selector: "fury-add-dossier-conge",
  templateUrl: "./add-dossier-conge.component.html",
  styleUrls: ["./add-dossier-conge.component.scss"],
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
})
export class AddDossierCongeComponent implements OnInit {
  
  dateCreation: FormControl; 
  username: string;
  agent: Agent;
  compte: Compte;

  etatDossierConge: EtatDossierConge = new EtatDossierConge();
  dossierConge: DossierConge;

  form: FormGroup;
  mode: "create" | "update" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: DossierConge,
    private dialogRef: MatDialogRef<AddDossierCongeComponent>,
    private fb: FormBuilder,
    private dossierService: DossierCongeService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService:NotificationService,
  ) { }

  ngOnInit() {
    this.username = this.authService.getUsername();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });

    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as DossierConge;
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
  save() {
    if (this.mode === "create") {
      this.createDossierConge();
    } else if (this.mode === "update") {
      this.updateDossierConge();
    }
  }
  createDossierConge() {
    let dossierConge: DossierConge    = this.form.value;
    dossierConge.annee                = new Date(this.dateCreation.value).getFullYear().toString();
    dossierConge.code                 = 'DC' + '-' + 'PAD' + '-' + dossierConge.annee + '-' + new Date().getTime();
    dossierConge.etat                 = EtatDossierConge.saisi; 
    
    dossierConge.matricule            = this.agent.matricule;
    dossierConge.prenom               = this.agent.prenom;
    dossierConge.nom                  = this.agent.nom;
    dossierConge.fonction             = this.agent.fonction.nom;

    dossierConge.codeDirection        = this.agent.uniteOrganisationnelle.code;
    dossierConge.nomDirection         = this.agent.uniteOrganisationnelle.nom;
    dossierConge.descriptionDirection = this.agent.uniteOrganisationnelle.description;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierService.create(dossierConge).subscribe((response) => {
          let dossierCongeSaved = response.body;
           if(dossierCongeSaved.id != null){ 
            this.notificationService.success(NotificationUtil.ajout);
            this.dialogRef.close(response.body);
          }else{
          this.notificationService.warn('Le dossier conge de l\'année ' + dossierConge.annee + ' existe déja');
          this.dialogRef.close();
          }
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);}, 
        () => {});
      } else {
        this.dialogRef.close();
      }
    })

  };

  updateDossierConge() {
    let dossierConge: DossierConge   = this.form.value;

    dossierConge.id                   = this.defaults.id;
    dossierConge.code                 = this.defaults.code;
    dossierConge.annee                = new Date(this.dateCreation.value).getFullYear().toString();
    dossierConge.etat                 = EtatDossierConge.saisi; 
    
    dossierConge.matricule            = this.defaults.matricule;
    dossierConge.prenom               = this.defaults.prenom;
    dossierConge.nom                  = this.defaults.nom;
    dossierConge.fonction             = this.agent.fonction.nom;

    dossierConge.codeDirection        = this.agent.uniteOrganisationnelle.code;
    dossierConge.nomDirection         = this.agent.uniteOrganisationnelle.nom;
    dossierConge.descriptionDirection = this.agent.uniteOrganisationnelle.description;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierService.update(dossierConge).subscribe((response) => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(dossierConge);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);},
        () => { })
       } else {
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
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dateCreation.value;
    ctrlValue.year(normalizedYear.year());
    this.dateCreation.setValue(ctrlValue);
  }

  // chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
  //   const ctrlValue = this.dateCreation.value;
  //   ctrlValue.month(normalizedMonth.month());
  //   this.dateCreation.setValue(ctrlValue);
  //   datepicker.close();
  // }
}
