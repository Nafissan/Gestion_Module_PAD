import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UniteOrganisationnelleService } from '../../shared/services/unite-organisationnelle.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NiveauHierarchique} from '../../shared/model/niveau-hierarchique.model';
import {NiveauHierarchiqueService} from '../../shared/services/niveau-hierarchique.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../../shared/services/notification.service';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { DialogUtil } from '../../../../shared/util/util';
import { Router } from '@angular/router';

@Component({
  selector: 'fury-add-niveau-hierarchique',
  templateUrl: './add-niveau-hierarchique.component.html',
  styleUrls: ['./add-niveau-hierarchique.component.scss']
})
export class AddNiveauHierarchiqueComponent implements OnInit {
  dialogUtil: DialogUtil = new DialogUtil();
  niveauHierarchique: NiveauHierarchique;
  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddNiveauHierarchiqueComponent>,
    private fb: FormBuilder,
    private niveauHierarchiqueService: NiveauHierarchiqueService,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as NiveauHierarchique;
    }
    if(this.defaults.position == 0){
      this.form = this.fb.group({
        libelle: [this.defaults.libelle || '', Validators.required],
        position: [this.defaults.position || '0', Validators.required],
      });
    }
    else{
      this.form = this.fb.group({
        libelle: [this.defaults.libelle || '', Validators.required],
        position: [this.defaults.position || '', Validators.required],
      });
    }
    
  }
  save() {
    if (this.mode === 'create') {
      this.createNiveauHierarchique();
    } else if (this.mode === 'update') {
      this.updateNiveauHierarchique();
    }
  }
  createNiveauHierarchique() {
    let niveauHierarchique = this.form.value;

    this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
      if (action === DialogUtil.confirmer){
        this.niveauHierarchiqueService.create(niveauHierarchique).subscribe(
          response => {      
           this.dialogRef.close(response.body);
           this.notificationService.success("Création réussie avec succès !")
          },(error) => {
            if(error.status === 302) {
             this.notificationService.warn('La position spécifiée existe déjà')
            }
          }
        )
      }else if (action === DialogUtil.confirmer) {
        this.dialogRef.close();
      } else {
        this.dialogRef.close();
      }
    }
    )
  
  }
  updateNiveauHierarchique() {
    let niveauHierarchique = this.form.value;
    niveauHierarchique.id = this.defaults.id;

    this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
      if (action === DialogUtil.confirmer){
        this.niveauHierarchiqueService.update(niveauHierarchique).subscribe(
          response => {
           this.dialogRef.close(niveauHierarchique);
          },(error) => {
            if(error.status === 404) {
             this.notificationService.warn('La position spécifiée existe déjà')
            }
          }
       )
       this.notificationService.success("Modification réussie avec succès !")
      }else if (action === DialogUtil.confirmer) {
        this.dialogRef.close();
      } else {
        this.dialogRef.close();
      }
    }
    )
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  onReinitialize()
  {
    this.form.reset();
    //this.router.navigate(['list-niveau-hierarchique']);
  }
}
