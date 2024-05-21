import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Absence } from '../../shared/model/absence.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AbsenceService } from '../../shared/service/absence.service';
import { EtapeAbsenceService } from '../../shared/service/etape-absence.service';
import { EtapeAbsence } from '../../shared/model/etape-absence.model';
import { Agent } from '../../../../shared/model/agent.model';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { EtatAbsence } from '../../shared/util/etat';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { NotificationService } from '../../../../shared/services/notification.service';
import { NotificationUtil, DialogUtil } from '../../../../shared/util/util';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';

@Component({
  selector: 'fury-validation-absence',
  templateUrl: './validation-absence.component.html',
  styleUrls: ['./validation-absence.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ValidationAbsenceComponent implements OnInit {
 
  dialogUtil: DialogUtil = new DialogUtil();
  static id = 100;
  absence: Absence;
  agent: Agent;
  username: string
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  etatAbsence: EtatAbsence = new EtatAbsence()
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ValidationAbsenceComponent>,
    private fb: FormBuilder,
    private absenceService: AbsenceService,
    private etapeAbsenceService: EtapeAbsenceService,
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService
  ) {}

  ngOnInit(){
   
    this.form = this.fb.group({

      //  commentaire: ['', Validators.required],
      //  action: ['', Validators.required],
      commentaire: [''],
      date: [new Date()],
    });
    this.username = this.authentificationService.getUsername();
    this.getCompteByUsername(this.username)
  }
  save() {
    if (this.mode === 'create') {
      this.createEtapeAbsence();
    } else if (this.mode === 'update') {
      this.updateAbsence();
    }
  }
  createEtapeAbsence() {
    let etapeAbsence: EtapeAbsence = this.form.value;
    etapeAbsence.prenom=this.agent.prenom;
    etapeAbsence.nom=this.agent.nom;
    etapeAbsence.matricule=this.agent.matricule;
    etapeAbsence.fonction=this.agent.fonction.nom;
    etapeAbsence.structure=this.agent.uniteOrganisationnelle.nom;
    etapeAbsence.absence = this.defaults;
    
    this.etapeAbsenceService.create(etapeAbsence).subscribe(
         response => {  
           if(response.status === 200){
            this.notificationService.success(NotificationUtil.validation)
          }     
          if(response.status === 200){
            this.absence = response.body.absence;
            this.updateAbsenceWithEtat(this.absence, etapeAbsence.action)
          }
         }
    )
  }

  updateAbsence() {
    let absence = this.form.value;
    absence.id = this.defaults.id;
    absence.agent = this.defaults.agent;
    
    this.absenceService.update(absence).subscribe(
       response => {
        this.dialogRef.close(absence);
       }
    )
  }
  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
  getCompteByUsername(username){
    this.compteService.getByUsername(username).subscribe(
      response => {
        this.agent = response.body.agent;
      }
    )
  }
  updateAbsenceWithEtat(absence: Absence, etat){
    absence.etat = etat
    this.absenceService.update(absence).subscribe(
      response => {
       this.dialogRef.close(this.absence);
       
      }
   )
  }

}
