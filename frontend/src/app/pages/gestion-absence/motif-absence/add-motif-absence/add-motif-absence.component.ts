import { Component, OnInit, Inject } from '@angular/core';
import { Motif } from '../../shared/model/motif.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MotifService } from '../../shared/service/motif.service';
import { AddAbsenceComponent } from '../../absence/add-absence/add-absence.component';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { DialogUtil, NotificationUtil } from '../../../../shared/util/util';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'fury-add-motif-absence',
  templateUrl: './add-motif-absence.component.html',
  styleUrls: ['./add-motif-absence.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class AddMotifAbsenceComponent implements OnInit {
  dialogUtil: DialogUtil = new DialogUtil();
  static id = 100;
  motif: Motif;
  titre:String ;
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  stateCtrl: FormControl =  new FormControl();
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddAbsenceComponent>,
    private fb: FormBuilder,
    private motifService:MotifService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(){
  if (this.defaults) {
    this.mode = 'update';
  } else {
 
    this.defaults = {} as Motif;
  }
  this.form = this.fb.group({
    description: [this.defaults.description || '', Validators.required],
  //  jours: [this.defaults.jours || '', Validators.required],
    jours: [this.defaults.jours || '', [Validators.required, Validators.min(1), Validators.max(10)]]
  });

   }
   
  save() {
    if (this.mode === 'create') {
      this.createAbsence();
    } else if (this.mode === 'update') {
      this.updateAbsence();
    }
  }
  createAbsence() {
    let motif: Motif = this.form.value;

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    this.motifService.create(motif).subscribe(
         response => {  
           if(response.status === 200){
            this.notificationService.success(NotificationUtil.ajout)
          }    
          this.dialogRef.close(response.body);
         })
        } else if (action === DialogUtil.confirmer) {
          this.dialogRef.close();
        } else {
          this.dialogRef.close();
        }
      })
  }
  updateAbsence() {
    let motif: Motif = this.defaults;
    motif.description = this.form.value.description;
    motif.jours = this.form.value.jours;
  
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    this.motifService.update(motif).subscribe(
       response => {
        if(response.status === 200){
          this.notificationService.success(NotificationUtil.modification)
        } 
        this.dialogRef.close(motif);
       })
      } else if (action === DialogUtil.confirmer) {
        this.dialogRef.close();
      } else {
        this.dialogRef.close();
      }
    })
  }
  
  isCreateMode() {
    this.titre='Nouveau';
    return this.mode === 'create';
  }

  isUpdateMode() {

    return this.mode === 'update';
  }
}
