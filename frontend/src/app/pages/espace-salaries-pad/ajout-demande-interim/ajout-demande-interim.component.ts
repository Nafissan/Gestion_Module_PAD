import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Agent } from '../../../../../src/app/shared/model/agent.model';
import { UniteOrganisationnelle } from '../../../../../src/app/shared/model/unite-organisationelle';
import { AuthenticationService } from '../../../../../src/app/shared/services/authentification.service';
import { DialogConfirmationService } from '../../../../../src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from '../../../../../src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from '../../../../../src/app/shared/util/util';
import { DossierInterimService } from "../../gestion-interim/shared/services/dossier-interim.service";
import { Interim } from '../../gestion-interim/shared/model/interim.model';
import { InterimService } from '../../gestion-interim/shared/services/interim.service';
import { EtatInterim } from '../../gestion-interim/shared/util/etat';
import { Compte } from '../../gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from '../../gestion-utilisateurs/shared/services/compte.service';
import { DossierInterim } from "../../gestion-interim/shared/model/dossier-interim.model";
import { UniteOrganisationnelleService } from "../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service";
import { MailService } from "../../../../../src/app/shared/services/mail.service";
import { Mail } from "../../../../../src/app/shared/model/mail.model";



@Component({
  selector: 'fury-ajout-demande-interim',
  templateUrl: './ajout-demande-interim.component.html',
  styleUrls: ['./ajout-demande-interim.component.scss' , "../../../shared/util/bootstrap4.css"],
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
export class AjoutDemandeInterimComponent implements OnInit {

  static id = 100;
  interim: Interim;
  agentDepart: {};
  agentArrive: {};
  agents:any;
  agents1:any;
  agent:Agent;
  agentConnecte: Agent;
  username: string;
  compte:Compte;
  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteSuperieureAgent: UniteOrganisationnelle;
  form: FormGroup;
  formMAil: FormGroup;
  mindate:Date;
  mindate2:Date;
  mode: 'create' | 'update' = 'create';
  dialogUtil: DialogUtil = new DialogUtil();
  interimsDefaults:any;
  stateCtrl: FormControl =  new FormControl();
  stateCtrl1: FormControl =  new FormControl();
  filteredAgents: Observable<any[]>;
  filteredAgents1: Observable<any[]>;
  filteredStates: Observable<any[]>;
  filteredStates1: Observable<any[]>;
  etatInterim: EtatInterim = new EtatInterim();
  idDossierInterim:number;
  dossierInterims:DossierInterim[];
  dossierInterim:DossierInterim;
  dossierInterim2:DossierInterim;
  anneeCourant = new Date().getFullYear();
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AjoutDemandeInterimComponent>,
    private fb: FormBuilder,
    private interimService: InterimService,
    private dossierInterimService: DossierInterimService,
    private notificationService:NotificationService,
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private dialogConfirmationService: DialogConfirmationService,
    private uniteOrganisationnelleService:UniteOrganisationnelleService,
    private mailService:MailService,
    private _adapter: DateAdapter<any>
  ) {}

  ngOnInit(){
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Interim;
    }
    if(this.mode=='update'){
      this.stateCtrl1.setValue(this.defaults.agentDepart.nom);

      this.stateCtrl.setValue(this.defaults.agentArrive.nom);
    }

    this.dossierInterim2;
    this.formMAil = this.fb.group({
      commentaire: [''],
      subject: [''],
      contenu: [''],
    })
    this.form = this.fb.group({
      commentaire: [this.defaults.commentaire || '', Validators.required],
      dateDepart: new FormControl({value: new Date(this.defaults.dateDepart), disabled: false}, [
        Validators.required,
      ]),
      dateRetour: new FormControl(
        { value: new Date(this.defaults.dateRetour), disabled: true},
        [Validators.required]
      ),
     
      // dateRetourEffective: new FormControl(
      //   { value: new Date(this.defaults.dateRetourEffective), disabled: false},
      //   [Validators.required]
      // ),
      //dateDepart: [this.defaults.dateDepart || '', Validators.required],
     // dateRetour: [this.defaults.dateDepart || '', Validators.required],
     // dateRetourEffective: [this.defaults.dateRetourEffective || ''],
    });
    this.interimsDefaults = this.defaults.body
     this.getAgents();
      this.getAgents1();
     this.filteredAgents = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(agent => agent ? this.filterAgents(agent) : this.agents.slice())
    );

    this.filteredAgents1 = this.stateCtrl1.valueChanges.pipe(
      startWith(''),
      map(agent => agent ? this.filterAgents(agent) : this.agents1.slice())
    );

    this.username = this.authentificationService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
      this.getUniteOrganisationnelleSuperieure();
      // Recuperer tous les plannings conges en fonction du dossier conge et de l'agent
     // this.getInterimByUORG();
    });
    this.french()
  }

  french() {
    this._adapter.setLocale('fr');
  }
  // addAgentDepart() {
  //   const agentDepart = this.form.controls.credentials as FormArray;
  //   agentDepart.push(this.fb.group({
  //     matricule: '',
  //     prenom: '',
  //   }));
  // }

  filterAgents(name: string) {
    return this.agents.filter(agent =>
      agent.matricule.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.prenom.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  filterAgents1(name: string) {
    return this.agents1.filter(agent =>
      agent.matricule.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.prenom.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  
  setAgentDepart(agentDepart):any{ 
    this.agentDepart = agentDepart;
  }

  
  setAgentArrive(agentArrive){
    this.agentArrive = agentArrive
    
   }
  
  save() {
    if (this.mode === 'create') {
     // this.setAgentDepart(this.agentDepart);
      this.createInterim();
    } else if (this.mode === 'update') {
      this.updateInterim();
    }
  }

  sendMail(mail:Mail){
    this.mailService.sendMailByDirections(mail).subscribe(
      response => { 
       this.notificationService.success(NotificationUtil.ajout)
     
       this.dialogRef.close(response.body);
      }
 )
  }
  createInterim() {

    let mail: Mail
    this.formMAil.controls.subject.setValue("lala")
    this.formMAil.controls.commentaire.setValue("lala")
    this.formMAil.controls.contenu.setValue("lala")
    
    mail = this.formMAil.value; 
    mail.destinataires = ["cheikhibra.samb@portdakar.sn", "serignemalick.gaye@portdakar.sn", "aliounebada.ndoye@portdakar.sn"]; // Pour les tests
    // mail.destinataires=  this.agentsChefStructureMail; // Notifier les directions des structures de l'ouverture du dossier de congé
 

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    //this.form.value.agentDepart = this.agentDepart;
    let interim = this.form.value;
    interim.agentDepart = this.agent;
    interim.dateSaisie = new Date
    interim.etat = this.etatInterim.saisir
    interim.agentArrive = this.agentArrive;
    interim.annee = this.anneeCourant;
    interim.uniteOrganisationnelle = this.uniteOrganisationnelle;

    interim.dossierInterim = this.dossierInterim;
    if(interim.dossierInterim ===  null){
       this.createDossierInterim();
     
    }else{

      interim.dossierInterim = this.dossierInterim;
      
    if(interim.agentDepart ===   interim.agentArrive){
       this.notificationService.warn('l\'agent depart et l\'agent d\'arrivé ne doit pas etre le meme');
    }else{     
      this.interimService.create(interim).subscribe(
           response => { 
            this.notificationService.success(NotificationUtil.ajout) 
            this.dialogRef.close(response.body);
           }
      )
    }
  }
      }
})
    
  }

  createDossierInterim() {

    let dossierInterim: DossierInterim;
    dossierInterim  = this.form.value
    dossierInterim.annee = this.anneeCourant;
    dossierInterim.nom = "Dossier-" +this.uniteSuperieureAgent.nom
    dossierInterim.uniteOrganisationnelle = this.uniteSuperieureAgent
    dossierInterim.code = this.uniteSuperieureAgent.code;
    dossierInterim.description = "Dossier Interim "+this.uniteSuperieureAgent.nom + this.anneeCourant;   
    this.dossierInterimService.create(dossierInterim).subscribe(
      response => { 
        this.dossierInterim = response.body;   
      
      },
      (err) => {
      }
      ,
      () => {
        //this.form.value.agentDepart = this.agentDepart;
        
        let interim = this.form.value;
        interim.agentDepart = this.agent;
       
        interim.dateSaisie = new Date
        interim.etat = this.etatInterim.saisir
        interim.agentArrive = this.agentArrive;
        interim.uniteOrganisationnelle = this.uniteOrganisationnelle;
        interim.dossierInterim = this.dossierInterim;
    if(interim.agentDepart ===   interim.agentArrive){
       this.notificationService.warn('l\'agent depart et l\'agent d\'arrivé ne doit pas etre le meme');
    }else{
      this.interimService.create(interim).subscribe(
           response => { 
            this.notificationService.success(NotificationUtil.ajout);   
            this.dialogRef.close(response.body);
           }
      );
  }
});}
    
  updateInterim() {
   
    let interim = this.form.value;
    interim.id = this.defaults.id;
    if(this.agentDepart==null && this.agentArrive==null)
    {
        interim.agentDepart=this.defaults.agentDepart;
        interim.agentArrive=this.defaults.agentArrive;
        interim.uniteOrganisationnelle = this.defaults.uniteOrganisationnelle
        interim.dateRetour = this.defaults.dateRetour
        interim.etat = this.defaults.etat
        interim.action = this.defaults.action

    }else if(this.agentDepart==null && this.agentArrive != null){ 

       interim.agentDepart=this.defaults.agentDepart;
       interim.agentArrive = this.agentArrive;
       interim.uniteOrganisationnelle = this.defaults.uniteOrganisationnelle
       interim.dateRetour = this.defaults.dateRetour
       interim.etat = this.defaults.etat
       interim.action = this.defaults.action
    }
    else if(this.agentDepart!=null && this.agentArrive == null){ 

      interim.agentDepart = this.agentDepart;
      interim.agentArrive=this.defaults.agentArrive;

      interim.uniteOrganisationnelle = this.defaults.uniteOrganisationnelle
      interim.dateRetour = this.defaults.dateRetour
      interim.etat = this.defaults.etat
      interim.action = this.defaults.action
   }else{
    interim.agentDepart = this.agentDepart;
    interim.agentArrive = this.agentArrive;

    interim.uniteOrganisationnelle = this.defaults.uniteOrganisationnelle
    interim.dateRetour = this.defaults.dateRetour
    interim.etat = this.defaults.etat
    interim.action = this.defaults.action
   }
     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
    this.interimService.update(interim).subscribe(
       response => {
        this.notificationService.success(NotificationUtil.modification)
        this.dialogRef.close(interim);
       }
    )
   }
 })
  }
  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  getAgents() {
    this.interimService.getAgents().subscribe(
      (response) => {
        this.agents = response.body;
      },
      (err) => {
      }
      ,
      () => {
        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(''),
          map(state => state ? this.filterStates(state) : this.agents.slice())
        );
      }
    );
  }
    
    // used by autocomplete in role
 

  getAgents1() {
    this.interimService.getAgents().subscribe(
      (response) => {
        this.agents1 = response.body;
      },
      (err) => {
      }
      ,
      () => {
        this.filteredStates1 = this.stateCtrl1.valueChanges.pipe(
          startWith(''),
          map(state => state ? this.filterStates1(state) : this.agents1.slice())
        );
      }
    );
      
  
  }
  filterStates(name: string) {
    return this.agents.filter(agent =>
      agent.matricule.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.prenom.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  filterStates1(name: string) {
    return this.agents.filter(agent =>
      agent.matricule.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.prenom.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  onDateChange(e){
    this.form.get('dateRetour').enable();
    this.mindate = new Date(this.form.value.dateDepart);
  }

  onDateChange2(e){
    this.form.get('dateRetourEffective').enable();
    this.mindate2 = new Date(this.form.value.dateRetour);
  }

  getUniteOrganisationnelleSuperieure() {
    let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];

    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.uniteSuperieureAgent = this.uniteOrganisationnelle;
      this.getInterimByDossierInterim();
    }
     else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        }, err => {},
          () => {
            this.getInterimByDossierInterim();
          });
    }
  }
  getInterimByDossierInterim(){
    this.dossierInterimService.getDossierInterimByUnORGAndAnnee(this.uniteSuperieureAgent.id,2020)
            .subscribe(response => {
               this.dossierInterim = response.body;
              // this.dossierInterims = this.dossierInterims.filter(d => d.uniteOrganisationnelle === this.uniteSuperieureAgent);
              // this.dossierAbsence = this.dossierAbsences
              //  this.dossierInterims.forEach(element => {
              //    this.dossierInterim = element;
              //  });
            }, err => {},
            () => {
             //this.subject$.next(this.dossierInterims);
            });
  }


  
}