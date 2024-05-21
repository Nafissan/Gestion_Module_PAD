import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormBuilder, FormGroup, Form, Validators, FormControl, } from "@angular/forms";
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { Agent } from 'src/app/shared/model/agent.model';
import { TypeDotation } from '../../shared/model/type-dotation.model';
import { TypeDotationService } from '../../shared/service/type-dotation.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';

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
  selector: 'fury-add-or-update-type-dotation-lait',
  templateUrl: './add-or-update-type-dotation-lait.component.html',
  styleUrls: ['./add-or-update-type-dotation-lait.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
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
export class AddOrUpdateTypeDotationLaitComponent implements OnInit {

  username: string;
  compte: Compte;
  agent: Agent;
  typeDotationLait: TypeDotation;
  form: FormGroup;
  mode: "create" | "update" = "create";

   constructor(
     @Inject(MAT_DIALOG_DATA) public defaults: TypeDotation,
     private dialogRef: MatDialogRef<AddOrUpdateTypeDotationLaitComponent>,
     private fb: FormBuilder,
     private typeDotationService: TypeDotationService,
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
       this.typeDotationLait = this.defaults;
     } else {
       this.defaults = {} as TypeDotation;
     }

     // FormGroup
     this.form = this.fb.group({
      nbreArticle: new FormControl(this.defaults.nbreArticle || "", [Validators.required,]),
      libelle: new FormControl(this.defaults.libelle || "", [Validators.required,]),
      nbreMois: new FormControl(this.defaults.nbreMois || "", [Validators.required,]),
     });
   }
   save() {
     if (this.mode === "create") {
       this.createTypeDotationLait();
     } else if (this.mode === "update") {
       this.updateTypeDotationLait();
     }
   }
   createTypeDotationLait() {
     let typeDotationLait: TypeDotation    = this.form.value;

     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.typeDotationService.create(typeDotationLait).subscribe((response) => {
             this.notificationService.success(NotificationUtil.ajout);
             this.dialogRef.close(response.body);
         }, err => {
           this.notificationService.warn(NotificationUtil.echec);},
         () => {});
       } else {
         this.dialogRef.close();
       }
     })

   };

   updateTypeDotationLait() {
     let typeDotationLait: TypeDotation    = this.form.value;
     typeDotationLait.id= this.typeDotationLait.id;

     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.typeDotationService.update(typeDotationLait).subscribe((response) => {
           this.notificationService.success(NotificationUtil.modification);
           this.dialogRef.close(typeDotationLait);
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
}
