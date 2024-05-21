import { Component, OnInit, Inject } from '@angular/core';
import { EtapeAbsence } from '../../shared/model/etape-absence.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EtapeAbsenceService } from '../../shared/service/etape-absence.service';
import { EtatAbsence } from '../../shared/util/etat';
import { Absence } from '../../shared/model/absence.model';
import { AbsenceService } from '../../shared/service/absence.service';
import { defaults } from 'chart.js';
import { Agent } from '../../../../shared/model/agent.model';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { DialogUtil, NotificationUtil } from '../../../../shared/util/util';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'fury-imputer-absence',
  templateUrl: './imputer-absence.component.html',
  styleUrls: ['./imputer-absence.component.scss']
})
export class ImputerAbsenceComponent implements OnInit {
  static id = 100;
  etapeAbsence: EtapeAbsence;
  absence: Absence;
  dialogUtil: DialogUtil = new DialogUtil();
  form: FormGroup;
  //mode: 'create' | 'update' = 'create';
  etatAbsence: EtatAbsence = new EtatAbsence()
  agent: Agent;
  username: string;
  compte: Compte;
  uniteOrganisationnelle: UniteOrganisationnelle;
  niveau:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ImputerAbsenceComponent>,
    private fb: FormBuilder,
    private etapeAbsenceService: EtapeAbsenceService,
    private absenceService:AbsenceService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(){
    this.form = this.fb.group({
      commentaire: [''],
    });
    this.absence = this.defaults;
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
     this.compte = response.body;
     this.agent = this.compte.agent;
     this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
     this.niveau = this.uniteOrganisationnelle.niveauHierarchique.position;
  
 });
  }

  imputerAbsence() {
 let  etapeAbsence: EtapeAbsence;
      etapeAbsence = this.form.value;
      etapeAbsence.action = this.etatAbsence.transmettre;
      etapeAbsence.prenom = this.agent.prenom;
      etapeAbsence.nom =   this.agent.nom;
      etapeAbsence.matricule= this.agent.matricule;
      etapeAbsence.fonction= this.agent.fonction.nom;
      this.absence.etape_validation =  this.absence.etape_validation +1;
      etapeAbsence.absence = this.absence;
      etapeAbsence.structure = this.agent.uniteOrganisationnelle.nom
      etapeAbsence.date = new Date
      etapeAbsence.absence.etat = this.etatAbsence.transmettre;
      etapeAbsence.structure = this.agent.uniteOrganisationnelle.description;
  
   
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer){
        if(this.absence.niveau === 0){
          this.absence.niveau = this.absence.niveau + 2
       //   this.absence.niveau = this.absence.niveau;
          this.absence.etat = this.etatAbsence.transmettre;
        }
        else{
          this.absence.niveau = this.absence.niveau + 1;
          this.absence.etat = this.etatAbsence.transmettre;
        }
    this.etapeAbsenceService.create(etapeAbsence).subscribe(
      response => {   
       if(response.status === 200){
         let absence:Absence
         absence = response.body.absence
         absence.etape = this.agent.uniteOrganisationnelle.description;
         this.absenceService.update(absence)
           .subscribe(response => {
             absence = response.body;
             this.notificationService.success(NotificationUtil.impute)
           }, err => { },
             () => {
               this.dialogRef.close(absence);
             })
       }
      }
      )}else if (action === DialogUtil.confirmer) {
        this.dialogRef.close();
      } else {
        this.dialogRef.close();
      }
    })
  }

 
  // isCreateMode() {
  //   return this.mode === 'create';
  // }

  // isUpdateMode() {
  //   return this.mode === 'update';
  // }
}
