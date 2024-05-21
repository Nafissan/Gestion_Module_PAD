import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Form, Validators, FormControl, } from "@angular/forms";
import { Continent } from "../../shared/model/continent.model";
import { ContinentService } from "../../shared/service/continent.service";
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
  selector: "fury-add-continent",
  templateUrl: "./add-continent.component.html",
  styleUrls: ["./add-continent.component.scss"],
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
export class AddContinentComponent implements OnInit {
  
  dateCreation: FormControl; 
  username: string;
  agent: Agent;
  compte: Compte;
  continent: Continent;

  form: FormGroup;
  mode: "create" | "update" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Continent,
    private dialogRef: MatDialogRef<AddContinentComponent>,
    private fb: FormBuilder,
    private dossierService: ContinentService,
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
      this.defaults = {} as Continent;
    }

    // FormGroup
    this.form = this.fb.group({
      code: new FormControl(this.defaults.code || "", [Validators.required,]),
      nom: new FormControl(this.defaults.nom || "", [Validators.required,]),
      active: new FormControl(this.defaults.active || "", [Validators.required])
    });
  }
  save() {
    if (this.mode === "create") {
      this.createContinent();
    } else if (this.mode === "update") {
      this.updateContinent();
    }
  }
  createContinent() {
    let continent: Continent    = this.form.value;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierService.create(continent).subscribe((response) => {
          let continentSaved = response.body;
           if(continentSaved.id != null){ 
            this.notificationService.success(NotificationUtil.ajout);
            this.dialogRef.close(response.body);
          }else{
          this.notificationService.warn('Le continent' +' existe déja');
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

  updateContinent() {
    let continent: Continent   = this.form.value;
    continent.id                   = this.defaults.id;
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.dossierService.update(continent).subscribe((response) => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(continent);
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

}
