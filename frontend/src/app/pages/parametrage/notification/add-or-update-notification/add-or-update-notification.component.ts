import { NotificationEntity } from './../../shared/model/notification.model';
import { Component, Inject, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter } from 'angular-calendar';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { Agent } from 'src/app/shared/model/agent.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';


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
  selector: 'fury-add-or-update-notification',
  templateUrl: './add-or-update-notification.component.html',
  styleUrls: ['./add-or-update-notification.component.scss', '../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
  providers: [

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],

})
export class AddOrUpdateNotificationComponent implements OnInit {
  libelle: string;
  username: string
  module: string;
  compte: Compte;
  agent: Agent;
  notification: NotificationEntity;
  form: FormGroup;
  mode: "create" | "update" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: NotificationEntity,
    private dialogRef: MatDialogRef<AddOrUpdateNotificationComponent>,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();

    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
    });

    if (this.defaults) {
      this.mode = "update";
      this.notification = this.defaults;
    } else {
      this.defaults = {} as NotificationEntity;
    }

    // FormGroup
    this.form = this.fb.group({
      id: new FormControl(this.defaults.id),
      libelle: new FormControl(this.defaults.libelle || "", [Validators.required,]),
      module: new FormControl(this.defaults.module || "", [Validators.required,]),
      active: new FormControl(this.defaults.active || false, [Validators.required,]),
    });
  }
  save() {
    if (this.mode === "create") {
      this.createNotification();
    } else if (this.mode === "update") {
      this.updateNotification();
    }
  }
  createNotification() {
    let notificationToSave: NotificationEntity = this.form.value;
    console.log('not to save = ', notificationToSave);

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.notificationService.create(notificationToSave).subscribe((response) => {
          this.notificationService.success(NotificationUtil.ajout);
          this.dialogRef.close(response.body);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        },
          () => { });
      } else {
        //this.dialogRef.close();
      }
    })

  }

  updateNotification() {
    let notification: NotificationEntity = this.form.value;
    notification.id = this.notification.id;


    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.notificationService.update(notification).subscribe((response) => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(notification);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        },
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




