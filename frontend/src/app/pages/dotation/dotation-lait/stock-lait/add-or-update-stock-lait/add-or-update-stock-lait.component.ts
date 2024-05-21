import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { Agent } from 'src/app/shared/model/agent.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { Stock } from '../../shared/models/stock.model';
import { StockService } from '../../shared/stock.service';
import {MatDatepicker} from '@angular/material/datepicker';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
     monthYearLabel: 'MMM YYYY',
     dateA11yLabel: 'LL',
     monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'fury-add-or-update-stock-lait',
  templateUrl: './add-or-update-stock-lait.component.html',
  styleUrls: ['./add-or-update-stock-lait.component.scss'],
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
export class AddOrUpdateStockLaitComponent implements OnInit {

  username: string;
  compte: Compte;
  agent: Agent;
  stock: Stock; 
  form: FormGroup; 

  mode: "create" | "update" = "create";
 
  @ViewChild(MatDatepicker) picker;
  annee = new FormControl(moment());

  anneeSelected =new Date().getFullYear();

   constructor(
     @Inject(MAT_DIALOG_DATA) public defaults: Stock,
     private dialogRef: MatDialogRef<AddOrUpdateStockLaitComponent>,
     private fb: FormBuilder,
     private StockService: StockService,
     private authService: AuthenticationService,
     private compteService: CompteService,
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
       this.stock = this.defaults;

     } else {
       this.defaults = {} as Stock;
     }
 
     // FormGroup
     this.form = this.fb.group({
       libelle: new FormControl(this.defaults.libelle || "", [Validators.required,]),
       quantiteReference: new FormControl(this.defaults.quantiteReference || "", [Validators.required]),
       seuilMinimum: new FormControl(this.defaults.seuilMinimum || 25 || "", [Validators.required,]),
     });
   }
   yearSelected(params) {
    this.annee.setValue(params);
    this.anneeSelected = params.year();
    this.picker.close();
  // this.setDossierInterimAnnee(this.anneeSelected);
  }

   save() {
     if (this.mode === "create") {
       this.createStock();
     } else if (this.mode === "update") {
       this.updateStock();
     }
   }
   createStock() {
     let stock: Stock = this.form.value;
     stock.annee =  this.anneeSelected
     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.StockService.create(stock).subscribe((response) => {
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
 
   updateStock() {
    let stock: Stock  = this.form.value;
    stock.id = this.stock.id;
    stock.code = this.stock.code;
 
     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.StockService.update(stock).subscribe((response) => {
           this.notificationService.success(NotificationUtil.modification);
           this.dialogRef.close(Stock);
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
