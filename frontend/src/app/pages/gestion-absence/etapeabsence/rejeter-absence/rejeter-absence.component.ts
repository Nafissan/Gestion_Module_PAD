import { Component, OnInit, Inject } from '@angular/core';
import { EtapeAbsence } from '../../shared/model/etape-absence.model';
import { Absence } from '../../shared/model/absence.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EtatAbsence } from '../../shared/util/etat';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EtapeAbsenceService } from '../../shared/service/etape-absence.service';
import { AbsenceService } from '../../shared/service/absence.service';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { Agent } from '../../../../shared/model/agent.model';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { DialogUtil, NotificationUtil } from '../../../../shared/util/util';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'fury-rejeter-absence',
  templateUrl: './rejeter-absence.component.html',
  styleUrls: ['./rejeter-absence.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class RejeterAbsenceComponent implements OnInit {
  dialogUtil: DialogUtil = new DialogUtil();
  static id = 100;
  etapeAbsence: EtapeAbsence;
  absence: Absence;
  form: FormGroup;
  etatAbsence: EtatAbsence = new EtatAbsence()
  agent: Agent;
  username: string;
  compte: Compte;
  uniteOrganisationnelle: UniteOrganisationnelle;
  niveau:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<RejeterAbsenceComponent>,
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
      commentaire: ['',Validators.required],
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
  updateAbsenceValider() {
  let etapeAbsence: EtapeAbsence;
      etapeAbsence = this.form.value;
      etapeAbsence.prenom = this.agent.prenom;
      etapeAbsence.nom =   this.agent.nom;
      etapeAbsence.matricule= this.agent.matricule;
      etapeAbsence.fonction= this.agent.fonction.nom;
      etapeAbsence.structure = this.agent.uniteOrganisationnelle.nom
      etapeAbsence.action = this.etatAbsence.rejeter;
      etapeAbsence.structure = this.agent.uniteOrganisationnelle.description;
      etapeAbsence.date = new Date
      etapeAbsence.absence = this.absence;
 
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer){
    this.etapeAbsenceService.create(etapeAbsence).subscribe(
      response => {       
       if(response.status === 200){
         let absence:Absence
         absence = response.body.absence
         absence.etat = this.etatAbsence.rejeter;
         this.absenceService.update(absence)
           .subscribe(response => {
             absence = response.body;
             this.notificationService.success(NotificationUtil.rejet)
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
  ngOnDestroy() {}
}
