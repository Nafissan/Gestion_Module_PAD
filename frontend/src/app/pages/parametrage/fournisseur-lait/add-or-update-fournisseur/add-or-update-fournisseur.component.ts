import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { Agent } from 'src/app/shared/model/agent.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { Fournisseur } from '../../shared/model/fournisseur.model';
import { FournisseurService } from '../../shared/service/fournisseur.service';


@Component({
  selector: 'fury-add-or-update-fournisseur',
  templateUrl: './add-or-update-fournisseur.component.html',
  styleUrls: ['./add-or-update-fournisseur.component.scss']
})
export class AddOrUpdateFournisseurComponent implements OnInit {

  username: string;
  compte: Compte;
  agent: Agent;
  fournisseur: Fournisseur; 
  form: FormGroup; 

  mode: "create" | "update" = "create";


   constructor(
     @Inject(MAT_DIALOG_DATA) public defaults: Fournisseur,
     private dialogRef: MatDialogRef<AddOrUpdateFournisseurComponent>,
     private fb: FormBuilder,
     private fournisseurService: FournisseurService,
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
       this.fournisseur = this.defaults;

     } else {
       this.defaults = {} as Fournisseur;
     }
 
     // FormGroup
     this.form = this.fb.group({
      nomfournisseur: new FormControl(this.defaults.nomfournisseur || "", [Validators.required,]),
      reffournisseur: new FormControl(this.defaults.reffournisseur || "", [Validators.required]),
      commentaire: new FormControl(this.defaults.commentaire || "", [Validators.required,]),
     });
   }


   save() {
     if (this.mode === "create") {
       this.createFournisseur();
     } else if (this.mode === "update") {
       this.updateFournisseur();
     }
   }
   createFournisseur() {
     let Fournisseur: Fournisseur = this.form.value;
     
     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.fournisseurService.create(Fournisseur).subscribe((response) => {
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
 
   updateFournisseur() {
    let Fournisseur: Fournisseur  = this.form.value;
    Fournisseur.id = this.fournisseur.id;
 
     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
         this.fournisseurService.update(Fournisseur).subscribe((response) => {
           this.notificationService.success(NotificationUtil.modification);
           this.dialogRef.close(Fournisseur);
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
