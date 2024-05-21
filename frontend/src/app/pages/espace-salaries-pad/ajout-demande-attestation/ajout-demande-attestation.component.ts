import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddAttestationComponent } from '../../gestion-demande-attestation/demande-attestation/add-attestation/add-attestation.component';
import { Attestation } from '../../gestion-demande-attestation/shared/model/demande-attestation.model';
import { DemandeAttestationService } from '../../gestion-demande-attestation/shared/services/demande-attestation.service';
import { EtatAttestation } from '../../gestion-demande-attestation/shared/util/etat';
import { Compte } from '../../gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from '../../gestion-utilisateurs/shared/services/compte.service';
import { DialogUtil } from '../../../shared/util/util';
import { Agent } from '../../../shared/model/agent.model';
import { UniteOrganisationnelle } from '../../../shared/model/unite-organisationelle';
import { NotificationService } from '../../../shared/services/notification.service';
import { AuthenticationService } from '../../../shared/services/authentification.service';
import { DialogConfirmationService } from '../../../shared/services/dialog-confirmation.service';
import { AgentService } from '../../../shared/services/agent.service';
import { UniteOrganisationnelleService } from '../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';

@Component({
  selector: 'fury-ajout-demande-attestation',
  templateUrl: './ajout-demande-attestation.component.html',
  styleUrls: ['./ajout-demande-attestation.component.scss', "../../../shared/util/bootstrap4.css"]
})
export class AjoutDemandeAttestationComponent implements OnInit {

  username: string;
  compte:Compte;
  dialogUtil: DialogUtil = new DialogUtil();
  agent: Agent;
  agentResponsableDCH: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  demandeAttestation: Attestation;
  form: FormGroup;
  agents: any;
  mode: 'create' | 'update' = 'create';
  stateCtrl: FormControl = new FormControl();
  filteredStates: Observable<any[]>;
  etatAttestation: EtatAttestation = new EtatAttestation();
  uniteSuperieureAgent: UniteOrganisationnelle;

  constructor(
    private notificationService:NotificationService,
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private dialogConfirmationService: DialogConfirmationService,
    @Inject(MAT_DIALOG_DATA) public defaults: Attestation,
    private dialogRef: MatDialogRef<AddAttestationComponent>,
    private fb: FormBuilder,
    private demandeAttestationService: DemandeAttestationService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,    
    private agentService: AgentService
  ) {}

  ngOnInit(){
    if (this.defaults) {
      this.mode = 'update';  
      this.stateCtrl.setValue(this.defaults.agent.matricule)
    } else {
      this.defaults = {} as Attestation;
    }
    this.form = this.fb.group({
      commentaire: [this.defaults.commentaire || '', Validators.required],
    });

    this.username = this.authentificationService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
    this.compte = response.body;
    this.agent = this.compte.agent;
    this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
    }, error => {}
    ,() => {
      this.getAgents()
    });
  }

  setAgent(agent){
    this.agent = this.compte.agent;
  }
  filterStates(name: string) {
    return this.agents.filter(agent =>
      agent.matricule.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.prenom.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  save() {
    if (this.mode === 'create') {
      this.createDemandeAttestation();
    } else if (this.mode === 'update') {
      this.updateDemandeAttestation();
    }
  }
  getUniteOrganisationnelleSuperieure(uniteOrganisationnelle: UniteOrganisationnelle) {
    let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];
    if (uniteOrganisationnelle.niveauHierarchique.position === 1 || uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.uniteSuperieureAgent = uniteOrganisationnelle;
      this.getResponsableDCH()
    } else {
      this.uniteOrganisationnelleService.getAllSuperieures(uniteOrganisationnelle.id)
        .subscribe(response => {
          uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        }, err => { },
          () => {
            
          })
    }
  }
  // getUniteDCH(){
  //   let uniteDCH: UniteOrganisationnelle;
  //   this.uniteOrganisationnelleService.getByCode('UO015')
  //   .subscribe(response => {
  //     uniteDCH = response.body;
  //   }, err => { },
  //     () => {
  //       this.getResponsableDCH();
  //     });
  // }
  getResponsableDCH() {
    this.agentService.getResponsableDCH()
      .subscribe(response => {
        this.agentResponsableDCH = response.body;
      }, err => { },
        () => {

        })
  }
  createDemandeAttestation() {
    this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
    if (action === DialogUtil.confirmer){
    let demandeAttestation: Attestation = this.form.value;
    demandeAttestation.fonctionDemandeur = this.agent.fonction.nom
    demandeAttestation.uniteDemandeur = this.uniteSuperieureAgent.description;
    // demandeAttestation.directeurSectorielDCH = this.agentResponsableDCH.prenom + ' ' + this.agentResponsableDCH.nom.toUpperCase();
    demandeAttestation.dateSaisie=new Date()
    let annee = new Date(demandeAttestation.dateSaisie).getFullYear().toString();
    demandeAttestation.agent = this.compte.agent;
    demandeAttestation.uniteOrganisationnelle = this.uniteOrganisationnelle;
    demandeAttestation.etat = EtatAttestation.saisir
    this.demandeAttestationService.create(demandeAttestation).subscribe(
         response => { 
            this.dialogRef.close(response.body);
          }
     )
        }
      })
  }

  updateDemandeAttestation() {
    let demandeAttestation: Attestation = this.defaults;
    // demandeAttestation.code = this.defaults.code;
    // demandeAttestation.annee = this.defaults.annee;
    //demandeAttestation.agent =  this.agent;
    demandeAttestation.commentaire = this.form.value.commentaire
    demandeAttestation.etat = EtatAttestation.saisir
    // demandeAttestation.dateSaisie = this.form.value.dateSaisie;
    
    this.demandeAttestationService.update(demandeAttestation).subscribe(
       response => {
        this.dialogRef.close(demandeAttestation);
       }
    )
  }
  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
  getAgents() {
    this.agentService.getAllByUniteOrganisationnelle(this.uniteOrganisationnelle.id).subscribe(
      (response) => {
        this.agents = response.body;
      },
      (err) => {
      },
      () => {
        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(''),
          map(state => state ? this.filterStates(state) : this.agents.slice())
        );
        this.getUniteOrganisationnelleSuperieure(this.uniteOrganisationnelle);
      }
    );
  }
  transmettre(){
    
  }
  updateAttestation(attestation: Attestation, etat){
    attestation.etat = etat
    this.demandeAttestationService.update(attestation).subscribe(
      response => {
       this.dialogRef.close(attestation);
      }
   )
  }
}
