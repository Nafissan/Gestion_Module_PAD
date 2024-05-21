
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
import { map, startWith } from 'rxjs/operators';
import { Activite } from '../../shared/model/activite.model';
import { Observable } from 'rxjs';
import { ActiviteService } from '../../shared/service/activite.service';
import { ConventionService } from 'src/app/pages/gestion-partenariat/shared/service/convention.service';
import { Convention } from 'src/app/pages/gestion-partenariat/shared/model/convention.model';


@Component({
  selector: 'fury-add-or-update-activite',
  templateUrl: './add-or-update-activite.component.html',
  styleUrls: ['./add-or-update-activite.component.scss','../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],


})
export class AddOrUpdateActiviteComponent implements OnInit {

  username: string;
  compte: Compte;
  agent: Agent;
  activite: Activite;
  activites: Activite[];
  conventions: Convention[];
  convention: Convention;
  filtereConvention: Observable<any[]>;
  conventionCtrl: FormControl = new FormControl();
  form: FormGroup;
  mode: "create" | "update" = "create";

   constructor(
     @Inject(MAT_DIALOG_DATA) public defaults: Activite,
     private dialogRef: MatDialogRef<AddOrUpdateActiviteComponent>,
     private fb: FormBuilder,
     private activiteService: ActiviteService,
     private conventionService: ConventionService,
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
       this.conventionCtrl.setValue(this.defaults.convention.libelle);
       this.mode = "update";
       this.activite = this.defaults;
     } else {
       this.defaults = {} as Activite;
     }

     // FormGroup
     this.form = this.fb.group({
      description: new FormControl(this.defaults.description || ""),
      code: new FormControl(this.defaults.code),
      libelle: new FormControl(this.defaults.libelle || "", [Validators.required,]),
      date: [new Date(this.defaults.date) || '', Validators.required],
      commentaire: new FormControl(this.defaults.commentaire|| "", [Validators.required,]),
      statut: new FormControl(this.defaults.statut?.toString()|| "1", [Validators.required,]),
      active: new FormControl(this.defaults.active || false, [Validators.required,]),
     });

     this.getConvention();
   }
   save() {
     if (this.mode === "create") {
       this.createActivite();
     } else if (this.mode === "update") {
       this.updateActivite();
     }
   }
   filterConvention(name: string) {
    return this.conventions.filter(convention =>
      convention.libelle.toLowerCase().indexOf(name.toLowerCase()) === 0 
      
    );
  }

  createActivite() {
     let activite: Activite    = this.form.value;
     activite.convention = this.convention;

     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.activiteService.create(activite).subscribe((response) => {
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

   updateActivite() {
     let activite: Activite    = this.form.value;
     activite.id= this.activite.id;
 
     activite.date = new Date(this.form.value.date);
     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
        if (this.convention == null) {
          activite.convention = this.defaults.convention;
        } else {
          activite.convention = this.convention;
        }
        
         this.activiteService.update(activite).subscribe((response) => {
           this.notificationService.success(NotificationUtil.modification);
           this.dialogRef.close(activite);
         }, err => {
           this.notificationService.warn(NotificationUtil.echec);},
         () => { })
        } else {
         this.dialogRef.close();
       }
     })
   }
   getConvention() {
    this.conventionService.getAll().subscribe(
      (response) => {
        this.conventions = response.body;
      },err =>{

      },() => {
        this.filtereConvention = this.conventionCtrl.valueChanges.pipe(
          startWith(''),
          map(convention => convention ? this.filterConvention(convention) : this.conventions.slice())
        );
      }
    );
  }

  setConvention(convention) {
    this.convention = convention
  }

   isCreateMode() {
     return this.mode === "create";
   }

   isUpdateMode() {
     return this.mode === "update";
   }

}
