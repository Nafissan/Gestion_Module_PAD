import { Component, OnInit, Inject } from '@angular/core';
import { Interim } from '../../shared/model/interim.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EtapeInterimService } from '../../shared/services/etape-interim.service';
import { InterimService } from '../../shared/services/interim.service';
import { Agent } from '../../../../shared/model/agent.model';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { EtapeInterim } from '../../shared/model/etapeInterim.modele';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { NotificationService } from '../../../../shared/services/notification.service';
import { DialogUtil, NotificationUtil } from '../../../../shared/util/util';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
@Component({
  selector: 'fury-close-interim',
  templateUrl: './close-interim.component.html',
  styleUrls: ['./close-interim.component.scss'],
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
export class CloseInterimComponent implements OnInit {

  static id = 100;
  interim: Interim;
  form: FormGroup;
  mindate:Date;
  etapeInterim:EtapeInterim
  agent: Agent;
  username: string;
  dialogUtil: DialogUtil = new DialogUtil();
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CloseInterimComponent>,
    private fb: FormBuilder,
    private etapeInterimService: EtapeInterimService,
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private interimService:InterimService,
    private _adapter: DateAdapter<any>,
    private notificationService:NotificationService,
    private dialogConfirmationService: DialogConfirmationService
  ) {}

  ngOnInit(){
    this.form = this.fb.group({
      commentaire: [''],
     // dateRetourEffective: new Date
         
    });
    
    this.username = this.authentificationService.getUsername();
    this.getCompteByUsername(this.username)
    this.french();


  }

  french() {
    this._adapter.setLocale('fr');
  }
 
  validerEtapeInterim() {
    let etapeInterim = this.form.value;
    etapeInterim.interim = this.defaults
    etapeInterim.prenom = this.agent.prenom;
    etapeInterim.nom = this.agent.nom;
    etapeInterim.matricule = this.agent.matricule;
    etapeInterim.fonction = this.agent.fonction.nom;
    etapeInterim.structure = this.agent.uniteOrganisationnelle.nom
    etapeInterim.action = 'CLOTURE'
    etapeInterim.etat = 'CLOTURE'
    etapeInterim.date = new Date;
 //   etapeInterim.structure= this.agent.uniteOrganisationelle.nom;
  // if(this.defaults.dateDepart  <   this.form.value.dateRetourEffective){
  //        this.notificationService.warn('la date de retour effectif ne peut pas etre inferieur à la date de depart');
  //      }else{
         this.dialogConfirmationService.confirmationDialog().subscribe(action => {
          if (action === DialogUtil.confirmer) {
            this.etapeInterimService.create(etapeInterim).subscribe(
            response => {   
            if(response.status === 201){
            this.notificationService.success(NotificationUtil.ajout)
            this.interim = response.body.interim
            this.interim.dateRetourEffective = this.form.value.dateRetourEffective
            this.updateInterim(this.interim, etapeInterim.action)
          }
        }
    )
    }}
    )
  // }
  }
  updateInterim(interim: Interim, etat){
    interim.etat = etat
    if(this.defaults.dateDepart  <   this.form.value.dateRetourEffective){
      this.notificationService.warn('la date de retour effectif ne peut pas etre inferieur à la date de depart');
   }else{
    this.interimService.update(interim).subscribe(
      response => {
       this.dialogRef.close(this.interim);
      }
   )
  }
  }

  getCompteByUsername(username){
    this.compteService.getByUsername(username).subscribe(
      response => {
        this.agent = response.body.agent;
      }
    )
  }

  onDateChange(e){
    this.form.get('dateRetourEffective').enable();
    this.mindate = new Date(this.defaults.dateDepart);
  
  }
}
