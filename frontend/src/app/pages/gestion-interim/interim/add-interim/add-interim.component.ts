import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Form, Validators, FormControl, FormArray } from "@angular/forms";
import { Interim } from '../../shared/model/interim.model'
import { InterimService } from "../../shared/services/interim.service";
import { DossierInterimService } from "../../shared/services/dossier-interim.service";
import { startWith, map } from "rxjs/operators";
import { Observable, ObservableInput, ConnectableObservable } from "rxjs";
import { NotificationService } from "../../../../shared/services/notification.service";
import { values } from "lodash-es";
import { EtatInterim } from "../../shared/util/etat";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { Agent } from "../../../../shared/model/agent.model";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { DossierInterim } from "../../shared/model/dossier-interim.model";
import { UniteOrganisationnelleService } from "../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service";
import { MailService } from "../../../../shared/services/mail.service";
import { Mail } from "../../../../shared/model/mail.model";
import { AgentService } from "../../../../shared/services/agent.service";
@Component({
  selector: 'fury-add-interim',
  templateUrl: './add-interim.component.html',
  styleUrls: ['./add-interim.component.scss'],
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
export class AddInterimComponent implements OnInit {

  
  static id = 100;
  interim: Interim;
  agentDepart: {};
  agentArrive: {};
  agents:Agent[];
  agents1:Agent[];
  agent:Agent;
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
  idUniteOrganisationnelleInferieures: number[] = [];
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  niveau: number;
  agentsFilter:Agent[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddInterimComponent>,
    private fb: FormBuilder,
    private interimService: InterimService,
    private dossierInterimService: DossierInterimService,
    private notificationService:NotificationService,
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private dialogConfirmationService: DialogConfirmationService,
    private uniteOrganisationnelleService:UniteOrganisationnelleService,
    private mailService:MailService,
    private _adapter: DateAdapter<any>,
    private agentService:AgentService
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
     // this.getAgents1();
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
      this.niveau =  this.agent.uniteOrganisationnelle.niveauHierarchique.position;
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
    this.agentArrive = agentArrive;
    
   }
  
  save() {
    if (this.mode === 'create') {
     // this.setAgentDepart(this.agentDepart);
      this.createInterim();
    } else if (this.mode === 'update') {
      this.updateInterim();
    }
  }

//   sendMail(mail:Mail){
//     this.mailService.sendMailByDirections(mail).subscribe(
//       response => { 
//        this.notificationService.success(NotificationUtil.ajout)
     
//        this.dialogRef.close(response.body);
//       }
//  )
//   }
  createInterim() {

    // let mail: Mail
    // this.formMAil.controls.subject.setValue("lala")
    // this.formMAil.controls.commentaire.setValue("lala")
    // this.formMAil.controls.contenu.setValue("lala")
    
    // mail = this.formMAil.value; 
    // mail.destinataires = ["cheikhibra.samb@portdakar.sn", "serignemalick.gaye@portdakar.sn", "aliounebada.ndoye@portdakar.sn"]; // Pour les tests
    // // mail.destinataires=  this.agentsChefStructureMail; // Notifier les directions des structures de l'ouverture du dossier de congé
 
   

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    this.form.value.agentDepart = this.agentDepart;
    let interim = this.form.value;
    interim.dateSaisie = new Date
    interim.etat = this.etatInterim.saisir
    interim.agentArrive = this.agentArrive;
    interim.annee = this.anneeCourant;
    interim.uniteOrganisationnelle = this.uniteOrganisationnelle;
    interim.niveau = this.niveau
    interim.dossierInterim = this.dossierInterim;
    if(interim.dossierInterim ===  null || interim.dossierInterim.id === undefined){
       this.createDossierInterim();
    }else{

      interim.dossierInterim = this.dossierInterim;
    if(interim.agentDepart.id ===   interim.agentArrive.id){
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
        this.form.value.agentDepart = this.agentDepart;
        let interim = this.form.value;
        interim.dateSaisie = new Date
        interim.etat = this.etatInterim.saisir
        interim.niveau = this.niveau
        interim.agentArrive = this.agentArrive;
        interim.uniteOrganisationnelle = this.uniteOrganisationnelle;
        interim.dossierInterim = this.dossierInterim;
    if(interim.agentDepart.id ===   interim.agentArrive.id){
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
        interim.action = this.defaults.action;
        interim.niveau = this.niveau
    }else if(this.agentDepart==null && this.agentArrive != null){ 
        interim.niveau = this.niveau
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
      interim.niveau = this.niveau
      interim.uniteOrganisationnelle = this.defaults.uniteOrganisationnelle
      interim.dateRetour = this.defaults.dateRetour
      interim.etat = this.defaults.etat
      interim.action = this.defaults.action
   }else{
    interim.agentDepart = this.agentDepart;
    interim.agentArrive = this.agentArrive;
    interim.niveau = this.niveau
    interim.uniteOrganisationnelle = this.defaults.uniteOrganisationnelle
    interim.dateRetour = this.defaults.dateRetour
    interim.etat = this.defaults.etat
    interim.action = this.defaults.action
   }

     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
       if (action === DialogUtil.confirmer) {
    this.interimService.update(interim).subscribe(
       response => {
        this.notificationService.success(NotificationUtil.modification);
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
    let agentsFilter;
    this.agentService.getAllChefByUniteOrganisationnelleInferieures(this.idUniteOrganisationnelleInferieures)
    .subscribe(
      (response) => {
        this.agents = response.body;
         agentsFilter = this.agents.filter(p => (p.uniteOrganisationnelle.niveauHierarchique.position === this.uniteOrganisationnelle.niveauHierarchique.position))
      },
      (err) => {
      }
      ,
      () => {
        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(''),
          map(state => state ? this.filterStates(state) : agentsFilter.slice())
        );
      }
    );
  }

  getAgentsChefStructure() {
    let agentsFilter;
    this.agentService.getAllChefByPosition(true,this.uniteOrganisationnelle.niveauHierarchique.position)
    .subscribe(
      (response) => {
        this.agents = response.body;
         agentsFilter = this.agents.filter(p => (p.uniteOrganisationnelle.niveauHierarchique.position === this.uniteOrganisationnelle.niveauHierarchique.position) && p.estChef === true)
      },
      (err) => {
      }
      ,
      () => {
        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(''),
          map(state => state ? this.filterStates(state) : agentsFilter.slice())
        );
      }
    );
  }
    
  getAgentsChefStructureDG() {
    let agentsFilter;
    this.agentService.getAllChefByPosition(true,1)
    .subscribe(
      (response) => {
        this.agents = response.body;
         agentsFilter = this.agents.filter(p => (p.uniteOrganisationnelle.niveauHierarchique.position === 1) && p.estChef === true)
      },
      (err) => {
      }
      ,
      () => {
        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(''),
          map(state => state ? this.filterStates(state) : agentsFilter.slice())
        );
      }
    );
  }
    // used by autocomplete in role
 

  getAgents1() {
    
    this.agentService.getAllChefByUniteOrganisationnelleInferieures(this.idUniteOrganisationnelleInferieures).
    subscribe(
      (response) => {
        this.agents1 = response.body;
        this.agentsFilter = this.agents1.filter(p => (p.uniteOrganisationnelle.niveauHierarchique.position === this.uniteOrganisationnelle.niveauHierarchique.position))
      },
      (err) => {
      }
      ,
      () => {
        this.filteredStates1 = this.stateCtrl1.valueChanges.pipe(
          startWith(''),
          map(state => state ? this.filterStates1(state) : this.agentsFilter.slice())
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
    return this.agentsFilter.filter(agent =>
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
      this.getUniteOrganisationnellesInferieures();
      // this.getAgents1();
    }
     else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        }, err => {},
          () => {
            this.getInterimByDossierInterim();
            this.getUniteOrganisationnellesInferieures();
            // this.getAgents1();
          });
    }
  }

  getUniteOrganisationnellesInferieures() {
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1) {
      this.idUniteOrganisationnelleInferieures.unshift(this.uniteSuperieureAgent.id);
     // this.getAllAbsenceByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);
      this.getAgents1();
      this.getAgentsChefStructure()
    }
    else if(this.uniteOrganisationnelle.niveauHierarchique.position === 0){
      this.idUniteOrganisationnelleInferieures.unshift(this.uniteSuperieureAgent.id);
      // this.getAllAbsenceByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);
       this.getAgents1();
       this.getAgentsChefStructureDG();
    }
     else {
      this.uniteOrganisationnelleService.getAllInferieures(this.uniteSuperieureAgent.id)
        .subscribe(response => {
          this.uniteOrganisationnelleInferieures = response.body;
          this.uniteOrganisationnelleInferieures.filter(p => p.niveauHierarchique.position === this.uniteOrganisationnelle.niveauHierarchique.position);
          this.uniteOrganisationnelleInferieures.unshift(this.uniteSuperieureAgent);

          this.uniteOrganisationnelleInferieures.forEach(unite => {

            this.idUniteOrganisationnelleInferieures.push(unite.id);
           
          })
        //  this.idUniteOrganisationnelleInferieures.push(this.uniteOrganisationnelle.id);
          //this.getAllAbsenceByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);
        }, err => { },
          () => {
            this.getAgents1();
            this.getAgents();
          });
    }

  }
  getInterimByDossierInterim(){
    this.dossierInterimService.getDossierInterimByUnORGAndAnnee(this.uniteSuperieureAgent.id,this.anneeCourant)
            .subscribe(response => {
               this.dossierInterim = response.body;
              // this.dossierInterims = this.dossierInterims.filter(d => d.uniteOrganisationnelle === this.uniteSuperieureAgent);
              // this.dossierAbsence = this.dossierAbsences;
              //  this.dossierInterims.forEach(element => {
              //    this.dossierInterim = element;
              //  });
            }, err => {},
            () => {
             //this.subject$.next(this.dossierInterims);
            });
  }

}