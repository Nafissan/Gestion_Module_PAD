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
import { NotificationUtil } from '../../../../shared/util/util';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'fury-close-absence',
  templateUrl: './close-absence.component.html',
  styleUrls: ['./close-absence.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class CloseAbsenceComponent implements OnInit {
  static id = 100;
  absence: Absence;
  agent: Agent;
  username: string
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  etatAbsence: EtatAbsence = new EtatAbsence()
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CloseAbsenceComponent>,
    private fb: FormBuilder,
    private absenceService: AbsenceService,
    private etapeAbsenceService: EtapeAbsenceService,
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private notificationService: NotificationService,
    private _adapter: DateAdapter<any>,
  ) {}

  ngOnInit(){
   
    this.form = this.fb.group({

       commentaire: ['', Validators.required],
       dateRetourEffective:  ['', Validators.required],
       date: [new Date()],
    });
    this.username = this.authentificationService.getUsername();
    this.getCompteByUsername(this.username)
    this.french();
  }

  french() {
    this._adapter.setLocale('fr');
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
    etapeAbsence.absence = this.defaults;
    etapeAbsence.action = 'CLOTURER';
    
    this.etapeAbsenceService.create(etapeAbsence).subscribe(
         response => {  
           if(response.status === 200){
            this.notificationService.success(NotificationUtil.cloture)
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
