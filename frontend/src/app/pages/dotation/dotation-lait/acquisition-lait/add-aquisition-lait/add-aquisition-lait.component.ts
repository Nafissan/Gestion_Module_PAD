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


import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { SuiviStock } from '../../shared/models/suiviStock.model';
import { SuiviStockService } from '../../shared/suiviStock.service';
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
  selector: 'fury-add-aquisition-lait',
  templateUrl: './add-aquisition-lait.component.html',
  styleUrls: ['./add-aquisition-lait.component.scss']
})
export class AddAquisitionLaitComponent implements OnInit {

  username: string;
  compte: Compte;
  agent: Agent;
  stock: Stock; 
  suiviStock : SuiviStock
  form: FormGroup; 

  
  mode: "create" = "create";
 
  @ViewChild(MatDatepicker) picker;
  date = new FormControl(moment());

  anneeSelected =new Date().getFullYear();

   constructor(
    //  @Inject(MAT_DIALOG_DATA) public defaults: SuiviStock,
    //  private dialogRef: MatDialogRef<AddOrUpdateSuiviStockLaitComponent>,
     private fb: FormBuilder,
     private suiviStockService: SuiviStockService,
     private stockService: StockService,
     private authService: AuthenticationService,
     private compteService: CompteService,
     private dialog: MatDialog,
     private dialogConfirmationService: DialogConfirmationService,
     private notificationService:NotificationService,
   ) { }
 
   ngOnInit() {

    this.getStockAnnee();
     this.username = this.authService.getUsername();
 
     this.compteService.getByUsername(this.username).subscribe((response) => {
       this.compte = response.body;
       this.agent = this.compte.agent;
     });
 
    //  if (this.defaults) {
    //    this.mode = "update";
    //    this.suiviStock = this.defaults;

    //   //  if(this.defaults.ville){
    //   //   this.villeFctr.setValue(this.defaults.ville.nom);
    //   //   this.ville = this.defaults.ville;
    //   //  }

    //  } else {
    //    this.defaults = {} as SuiviStock;
    //  }
 
     // FormGroup
     this.form = this.fb.group({
       libelle: new FormControl('' || "", [Validators.required,]),
       nbreArticle: new FormControl('' || "", [Validators.required]),
       dateOperation: new FormControl('' || "", [Validators.required,]),
      //  type: new FormControl(this.defaults.type || "", [Validators.required,]),
      //  annee: new FormControl(this.defaults.annee || "", [Validators.required,]),
     });
   }
   yearSelected(params) {
    this.date.setValue(params);
    this.anneeSelected = params.year();
    this.picker.close();
  // this.setDossierInterimAnnee(this.anneeSelected);
  }
 

   save() {
     
       this.createSuiviStock();
   }
   createSuiviStock() {
     let suiviStock: SuiviStock    = this.form.value;
     suiviStock.operation = "acquisition"
     suiviStock.stock = this.stock
     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.suiviStockService.create(suiviStock).subscribe((response) => {
             this.notificationService.success(NotificationUtil.ajout);
            //  this.dialogRef.close(response.body);
         }, err => {
           this.notificationService.warn(NotificationUtil.echec);}, 
         () => {});
       } else {
        //  this.dialogRef.close();
       }
     })
 
   };
 
   updateSuiviStock() {
    let suiviStock: SuiviStock    = this.form.value;
    suiviStock.id = this.suiviStock.id;
    suiviStock.operation = "acquisition"
    suiviStock.stock = this.stock
 
     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.suiviStockService.update(suiviStock).subscribe((response) => {
           this.notificationService.success(NotificationUtil.modification);
          //  this.dialogRef.close(Stock);
         }, err => {
           this.notificationService.warn(NotificationUtil.echec);},
         () => { })
        } else {
        //  this.dialogRef.close();
       }
     })
   }

   getStockAnnee(){
    this.stockService.getByAnnee(this.anneeSelected).subscribe(
      (response) => {
        this.stock = response.body;
        console.log("Stock Recupéré:  "+this.stock)
      },
      (err) => {
      },
      () => {
        
      //  this.subject$.next(this.SuiviStocks.filter(continent => continent.active === true));
      //  this.subject$.next(this.suiviStocks);
      //   this.showProgressBar = true;
      }
    );
   }
   isCreateMode() {
     return this.mode === "create";
   }
   
   isUpdateMode() {
    //  return this.mode === "update";
   }
}
