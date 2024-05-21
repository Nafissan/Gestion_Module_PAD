import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Form, Validators, FormControl } from "@angular/forms";
import { Attestation } from '../../shared/model/demande-attestation.model'
import { DemandeAttestationService } from "../../shared/services/demande-attestation.service";
// import { Agent } from "http";
import { Agent } from "../../../../shared/model/agent.model";
import { Observable } from "rxjs";
import { AgentService } from "../../../../shared/services/agent.service";
import { startWith, map } from "rxjs/operators";
import { EtatAttestation } from "../../shared/util/etat";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { NotificationService } from "../../../../shared/services/notification.service";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { UniteOrganisationnelleService } from "src/app/pages/gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service";
@Component({
  selector: 'fury-add-attestation',
  templateUrl: './add-attestation.component.html',
  styleUrls: ['./add-attestation.component.scss']
})
export class AddAttestationComponent implements OnInit {


  username: string;
  compte: Compte;
  dialogUtil: DialogUtil = new DialogUtil();
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  // matricule:string=this.agent.matricule;
  //static id = 100;
  demandeAttestation: Attestation;
  form: FormGroup;
  agents: any;
  agentResponsableDCH: Agent;
  mode: 'create' | 'update' = 'create';
  stateCtrl: FormControl = new FormControl();
  filteredStates: Observable<any[]>;
  etatAttestation: EtatAttestation = new EtatAttestation();
  uniteSuperieureAgent: UniteOrganisationnelle;

  constructor(
    private notificationService: NotificationService,
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private dialogConfirmationService: DialogConfirmationService,
    @Inject(MAT_DIALOG_DATA) public defaults: Attestation,
    private dialogRef: MatDialogRef<AddAttestationComponent>,
    private fb: FormBuilder,
    private demandeAttestationService: DemandeAttestationService,
    private agentService: AgentService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
  ) { }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
      this.stateCtrl.setValue(this.defaults.agent.matricule)
    } else {
      this.defaults = {} as Attestation;
    }
    this.form = this.fb.group({
      commentaire: [this.defaults.commentaire || '', Validators.required],
      // matricule: [{value: this.defaults.agent.matricule || '', disabled: true}, Validators.required]
    });

    this.username = this.authentificationService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
    }, error => { }
      , () => {
        this.getAgents();
      });
  }
  setAgent(agent) {
    this.agent = agent
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
            ;
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
        this.getUniteOrganisationnelleSuperieure(this.agent.uniteOrganisationnelle);
      }
    );
  }
  createDemandeAttestation() {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        let demandeAttestation: Attestation = this.form.value;
        demandeAttestation.fonctionDemandeur = this.agent.fonction.nom;
        demandeAttestation.uniteDemandeur = this.uniteSuperieureAgent.description;
        //demandeAttestation.directeurSectorielDCH = this.agentResponsableDCH.prenom + ' ' + this.agentResponsableDCH.nom.toUpperCase();
        demandeAttestation.dateSaisie = new Date()
        let annee = new Date(demandeAttestation.dateSaisie)
          .getFullYear()
          .toString();
        demandeAttestation.uniteOrganisationnelle = this.uniteOrganisationnelle;
        demandeAttestation.agent = this.agent;

        // demandeAttestation.code = "DA_" + annee
        demandeAttestation.etat = EtatAttestation.saisir;

        this.demandeAttestationService.create(demandeAttestation).subscribe(
          response => {
            this.notificationService.success(NotificationUtil.ajout);
            this.dialogRef.close(response.body);
          }
        )
      }
    }
    )
  }

  updateDemandeAttestation() {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        let demandeAttestation: Attestation = this.defaults;
        // demandeAttestation.code = this.defaults.code;
        // demandeAttestation.annee = this.defaults.annee;
        //demandeAttestation.agent =  this.agent;
        demandeAttestation.commentaire = this.form.value.commentaire
        // demandeAttestation.dateSaisie = this.form.value.dateSaisie;
        demandeAttestation.etat = EtatAttestation.saisir
        this.demandeAttestationService.update(demandeAttestation).subscribe(
          response => {
            this.notificationService.success(NotificationUtil.modification);
            this.dialogRef.close(demandeAttestation);
          })
      } else {
        this.dialogRef.close();
      }
    });
  }
  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
  transmettre() {

  }
  updateAttestation(attestation: Attestation, etat) {
    attestation.etat = etat
    attestation.etat = EtatAttestation.saisir
    this.demandeAttestationService.update(attestation).subscribe(
      response => {
        this.notificationService.success(NotificationUtil.modification);
        this.dialogRef.close(attestation);
      }
    )
  }
}
