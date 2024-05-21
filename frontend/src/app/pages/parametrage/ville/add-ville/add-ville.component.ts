
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { Agent } from 'src/app/shared/model/agent.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormBuilder, FormGroup, Form, Validators, FormControl, } from "@angular/forms";
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { Ville } from '../../../../shared/model/ville.model';
import { Pays } from '../../shared/model/pays.model';
import { VilleService } from '../../../../shared/services/ville.service';
import { PaysService } from '../../shared/service/pays.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  selector: 'fury-add-ville',
  templateUrl: './add-ville.component.html',
  styleUrls: ['./add-ville.component.scss'],
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
export class AddVilleComponent implements OnInit {

  username: string;
  compte: Compte;
  agent: Agent;
  ville: Ville;
  pays_s: Pays[];
  pays: Pays;
  filterePays: Observable<any[]>;
  paysCtrl: FormControl = new FormControl();
  form: FormGroup;
  mode: "create" | "update" = "create";

   constructor(
     @Inject(MAT_DIALOG_DATA) public defaults: Ville,
     private dialogRef: MatDialogRef<AddVilleComponent>,
     private fb: FormBuilder,
     private villeService: VilleService,
     private paysService: PaysService,
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
       this.paysCtrl.setValue(this.defaults.pays.nom);
       this.mode = "update";
       this.ville = this.defaults;
     } else {
       this.defaults = {} as Ville;
     }

     // FormGroup
     this.form = this.fb.group({
      nom: new FormControl(this.defaults.nom || "", [Validators.required,]),
      code: new FormControl(this.defaults.code || "", [Validators.required,]),
      active: new FormControl(this.defaults.active || false, [Validators.required,]),
     });

     this.getPays();
   }
   save() {
     if (this.mode === "create") {
       this.createVille();
     } else if (this.mode === "update") {
       this.updateVille();
     }
   }
   filterPays(name: string) {
    return this.pays_s.filter(pays =>
      pays.code.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      pays.nom.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      pays.nomOfficiel.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

   createVille() {
     let ville: Ville    = this.form.value;
     ville.pays = this.pays;

     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.villeService.create(ville).subscribe((response) => {
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

   updateVille() {
     let ville: Ville    = this.form.value;
     ville.id= this.ville.id;

     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
        if (this.pays == null) {
          ville.pays = this.defaults.pays;
        } else {
          ville.pays = this.pays;
        }
         this.villeService.update(ville).subscribe((response) => {
           this.notificationService.success(NotificationUtil.modification);
           this.dialogRef.close(ville);
         }, err => {
           this.notificationService.warn(NotificationUtil.echec);},
         () => { })
        } else {
         this.dialogRef.close();
       }
     })
   }
   getPays() {
    this.paysService.getAll().subscribe(
      (response) => {
        this.pays_s = response.body;
      },err =>{

      },() => {
        this.filterePays = this.paysCtrl.valueChanges.pipe(
          startWith(''),
          map(pays => pays ? this.filterPays(pays) : this.pays_s.slice())
        );
      }
    );
  }

  setPays(pays) {
    this.pays = pays
  }

   isCreateMode() {
     return this.mode === "create";
   }

   isUpdateMode() {
     return this.mode === "update";
   }


}
