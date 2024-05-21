import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { Agent } from 'src/app/shared/model/agent.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { TypePartenariat } from '../../shared/model/type-partenariat.model';
import { ZoneService } from '../../shared/service/zone.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormBuilder, FormGroup, Form, Validators, FormControl, } from "@angular/forms";

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { Zone } from '../../shared/model/zone.model';

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
  selector: 'fury-add-zone',
  templateUrl: './add-or-update-zone.component.html',
  styleUrls: ['./add-or-update-zone.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
  providers: [
    
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AddOrUpdateZoneComponent implements OnInit {
  username: string;
  compte: Compte;
  agent: Agent;
  zone: Zone;
  form: FormGroup;
  mode: "create" | "update" = "create";

   constructor(
     @Inject(MAT_DIALOG_DATA) public defaults: Zone,
     private dialogRef: MatDialogRef<AddOrUpdateZoneComponent>,
     private fb: FormBuilder,
     private zoneService: ZoneService,
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
       this.zone = this.defaults;
     } else {
       this.defaults = {} as Zone;
     }

     // FormGroup
     this.form = this.fb.group({
      code: new FormControl(this.defaults.code),
      nom: new FormControl(this.defaults.nom || "", [Validators.required,]),
      active: new FormControl(this.defaults.active || false, [Validators.required,]),
     });
   }
   save() {
     if (this.mode === "create") {
       this.createZone();
     } else if (this.mode === "update") {
       this.updateZone();
     }
   }
   createZone() {
    let zone: Zone    = this.form.value;
    

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.zoneService.create(zone).subscribe((response) => {
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

   updateZone() {
     let zone: Zone    = this.form.value;
    zone.id= this.zone.id;
    

     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.zoneService.update(zone).subscribe((response) => {
           this.notificationService.success(NotificationUtil.modification);
           this.dialogRef.close(zone);
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
