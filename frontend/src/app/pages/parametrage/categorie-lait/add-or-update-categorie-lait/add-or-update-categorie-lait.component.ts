import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { Agent } from 'src/app/shared/model/agent.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { CategorieLait } from '../../shared/model/categorie-lait.model';
import { CategorieLaitService } from '../../shared/service/categorie-lait.service';

@Component({
  selector: 'fury-add-or-update-categorie-lait',
  templateUrl: './add-or-update-categorie-lait.component.html',
  styleUrls: ['./add-or-update-categorie-lait.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class AddOrUpdateCategorieLaitComponent implements OnInit {

  username: string;
  compte: Compte;
  agent: Agent;
  categorieLait: CategorieLait;
  form: FormGroup;
  mode: "create" | "update" = "create";

   constructor(
     @Inject(MAT_DIALOG_DATA) public defaults: CategorieLait,
     private dialogRef: MatDialogRef<AddOrUpdateCategorieLaitComponent>,
     private fb: FormBuilder,
     private CategorieLaitService: CategorieLaitService,
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
       this.categorieLait = this.defaults;
     } else {
       this.defaults = {} as CategorieLait;
     }

     // FormGroup
     this.form = this.fb.group({
      seuil: new FormControl(this.defaults.seuil || "", [Validators.required,]),
      libelle: new FormControl(this.defaults.libelle || "", [Validators.required,]),
      description: new FormControl(this.defaults.description || "", [Validators.required,]),
     });
   }
   save() {
     if (this.mode === "create") {
       this.createcategorieLait();
     } else if (this.mode === "update") {
       this.updatecategorieLait();
     }
   }
   createcategorieLait() {
     let categorieLait: CategorieLait    = this.form.value;

     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.CategorieLaitService.create(categorieLait).subscribe((response) => {
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

   updatecategorieLait() {
     let categorieLait: CategorieLait    = this.form.value;
     categorieLait.id= this.categorieLait.id;

     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.CategorieLaitService.update(categorieLait).subscribe((response) => {
           this.notificationService.success(NotificationUtil.modification);
           this.dialogRef.close(categorieLait);
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
