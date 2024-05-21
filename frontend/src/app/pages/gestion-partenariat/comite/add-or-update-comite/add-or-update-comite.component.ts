
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { Agent } from 'src/app/shared/model/agent.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { FormBuilder, FormGroup, Form, Validators, FormControl, } from "@angular/forms";
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { Observable } from 'rxjs';
import { Comite } from '../../shared/model/comite.model';
import { Pointfocal } from '../../shared/model/pointfocal.model';
import { ComiteService } from '../../shared/service/comite.service';
import { PointfocalService } from '../../shared/service/pointfocal.service';


@Component({
  selector: 'fury-add-or-update-comite',
  templateUrl: './add-or-update-comite.component.html',
  styleUrls: ['./add-or-update-comite.component.scss','../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],


})
export class AddOrUpdateComiteComponent implements OnInit {

  username: string;
  compte: Compte;
  agent: Agent;
  comite: Comite;
  comites: Comite[];
  pointfocals: Pointfocal[];
  
  filterePointfocal: Observable<any[]>;
  pointCtrl: FormControl = new FormControl();
  form: FormGroup;
  mode: "create" | "update" = "create";

   constructor(
     @Inject(MAT_DIALOG_DATA) public defaults: Comite,
     private dialogRef: MatDialogRef<AddOrUpdateComiteComponent>,
     private fb: FormBuilder,
     private comiteService: ComiteService,
     private pointfocalService: PointfocalService,
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
       this.getPointfocal();
     });
     if (this.defaults) {
      this.mode = "update";
      this.comite = this.defaults;
    } else {
      this.defaults = {} as Comite;
    }
     

     // FormGroup
     this.form = this.fb.group({
     
      code: new FormControl(this.defaults.code  ),
      libelle: new FormControl(this.defaults.libelle || "", [Validators.required,]),
      pointfocals: new FormControl(this.defaults.pointfocals || "", [Validators.required,]),
      active: new FormControl(this.defaults.active || false, [Validators.required,]),
     });

     
   }
   save() {
     if (this.mode === "create") {
       this.createComite();
     } else if (this.mode === "update") {
       this.updateComite();
     }
   }
   getPointfocal() {
    this.pointfocalService.getAll()
      .subscribe(response => {
        this.pointfocals = response.body;
      },
        (err) => { },
        () => {
      });
  }

  createComite() {
    let comite: Comite = this.form.value;
  

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.comiteService.create(comite).subscribe((response) => {
          this.notificationService.success(NotificationUtil.ajout);
          this.dialogRef.close(response.body);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        },
          () => { });
      } else {
        this.dialogRef.close();
      }
    })

  };

  updateComite() {
    let comite: Comite = this.form.value;
    comite.id = this.defaults.id;
    

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.comiteService.update(comite).subscribe((response) => {
          this.notificationService.success(NotificationUtil.modification);
          this.dialogRef.close(comite);
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
   compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) return o1.id === o2.id;
  }

}
