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
import { Marque } from '../../shared/model/marque.model';
import { MarqueService } from '../../shared/service/marque.service';


@Component({
  selector: 'fury-add-marque-lait',
  templateUrl: './add-marque-lait.component.html',
  styleUrls: ['./add-marque-lait.component.scss']
})
export class AddMarqueLaitComponent implements OnInit {

  username: string;
  compte: Compte;
  agent: Agent;
  marque: Marque; 
  form: FormGroup; 

  mode: "create" | "update" = "create";
 


   constructor(
     @Inject(MAT_DIALOG_DATA) public defaults: Marque,
     private dialogRef: MatDialogRef<AddMarqueLaitComponent>,
     private fb: FormBuilder,
     private marqueService: MarqueService,
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
       this.marque = this.defaults;

     } else {
       this.defaults = {} as Marque;
     }
 
     // FormGroup
     this.form = this.fb.group({
      libelle: new FormControl(this.defaults.libelle || "", [Validators.required,]),
      commentaire: new FormControl(this.defaults.commentaire || "", [Validators.required,]),
     });
   }


   save() {
     if (this.mode === "create") {
       this.createMarque();
     } else if (this.mode === "update") {
       this.updateMarque();
     }
   }
   createMarque() {
     let Marque: Marque = this.form.value;
     
     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.marqueService.create(Marque).subscribe((response) => {
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
 
   updateMarque() {
    let marque: Marque  = this.form.value;
    marque.id = this.marque.id;

 
     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.marqueService.update(marque).subscribe((response) => {
           this.notificationService.success(NotificationUtil.modification);
           this.dialogRef.close(marque);
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
