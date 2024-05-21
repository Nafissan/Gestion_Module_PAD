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
import { DialogUtil, NotificationUtil } from '../../../../shared/util/util';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { NotificationService } from '../../../../shared/services/notification.service';



@Component({
  selector: 'fury-add-etapeabsence',
  templateUrl: './add-etapeabsence.component.html',
  styleUrls: ['./add-etapeabsence.component.scss']
})
export class AddEtapeabsenceComponent implements OnInit {

  dialogUtil: DialogUtil = new DialogUtil();
  static id = 100;
  etapeAbsence: EtapeAbsence;
  absence: Absence;

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
    private dialogRef: MatDialogRef<AddEtapeabsenceComponent>,
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

  updateAbsenceValider() {
  let etapeAbsence: EtapeAbsence;
      etapeAbsence = this.form.value;
      etapeAbsence.action = this.etatAbsence.valider;
      etapeAbsence.prenom = this.agent.prenom;
      etapeAbsence.nom =   this.agent.nom;
      etapeAbsence.matricule= this.agent.matricule;
      etapeAbsence.fonction= this.agent.fonction.nom;
      etapeAbsence.structure = this.agent.uniteOrganisationnelle.description;
      etapeAbsence.date = new Date;
      etapeAbsence.absence = this.absence;

      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === DialogUtil.confirmer){

       if(this.absence.niveau === 0){
        this.absence.niveau = this.absence.niveau;
        this.absence.etape_validation =  this.absence.etape_validation + 5;
        this.absence.etat = this.etatAbsence.encours;

       }
       else if(this.absence.niveau === 1){
        this.absence.niveau = this.absence.niveau - 1;
        this.absence.etat = this.etatAbsence.atransmettre
        this.absence.etape_validation =  this.absence.etape_validation - 1;
      }
      else{
        this.absence.niveau = this.absence.niveau - 1;
        this.absence.etat = this.etatAbsence.encours;
        this.absence.etape_validation =  this.absence.etape_validation - 1;
      }

     this.etapeAbsenceService.create(etapeAbsence).subscribe(
      response => {
       if(response.status === 200){
         let absence:Absence
         absence = response.body.absence;
         absence.etape = this.agent.uniteOrganisationnelle.description;
         this.absenceService.update(absence)
           .subscribe(response => {
             absence = response.body;
             this.notificationService.success(NotificationUtil.validation)
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
  ngOnDestroy() {}
}
