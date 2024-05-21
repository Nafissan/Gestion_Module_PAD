import { Component, OnInit, Inject } from '@angular/core';
import { Absence } from '../../shared/model/absence.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbsenceService } from '../../shared/service/absence.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Agent } from '../../../../shared/model/agent.model';
import { EtatAbsence } from '../../shared/util/etat';
import { MotifService } from '../../shared/service/motif.service';
import { Motif } from '../../shared/model/motif.model';
import { now } from 'moment';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { DialogUtil, NotificationUtil } from '../../../../shared/util/util';
import { NotificationService } from '../../../../shared/services/notification.service';
import { AgentService } from "../../../../shared/services/agent.service";
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PlanningAbsence } from '../../shared/model/planning-absence.modele';
import { PlanningAbsenceService } from '../../shared/service/planning-absence.service';
import { DossierAbsence } from '../../shared/model/dossier-absence.modele';
import { DossierAbsenceService } from '../../shared/service/dossier-absence.service';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { MotifAbsenceModule } from '../../motif-absence/motif-absence.module';


@Component({
  selector: 'fury-add-absence',
  templateUrl: './add-absence.component.html',
  styleUrls: ['./add-absence.component.scss'],
  providers: [

    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class AddAbsenceComponent implements OnInit {
  dialogUtil: DialogUtil = new DialogUtil();
  username: string;
  compte: Compte;
  static id = 100;
  absence: Absence;
  form: FormGroup;
  form1: FormGroup;
  agent: Agent;
  agentConnecte: Agent;
  agents: Agent[];
  motifs: Motif[];
  motif: Motif;
  uniteOrganisationnelle: UniteOrganisationnelle;
  planningAbsences: PlanningAbsence[];
  planningAbsence: PlanningAbsence;
  minDatePrevisionnelle: Date;
  maxDatePrevisionnelle: Date;
  mindate = new Date();
  mode: 'create' | 'update' = 'create';
  etatAbsence: EtatAbsence = new EtatAbsence()
  annee: string;
  dossierAbsence: DossierAbsence;
  dossierAbsences: DossierAbsence[];
  stateCtrl: FormControl = new FormControl();
  motiifCtrl: FormControl = new FormControl();
  uniteSuperieureAgent: UniteOrganisationnelle;
  filteredAgents: Observable<any[]>;
  filteredMotifs: Observable<any[]>;
  anneeCourant: number;
  isDisable: boolean = true;
  nombrejours: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Absence,
    private dialogRef: MatDialogRef<AddAbsenceComponent>,
    private fb: FormBuilder,
    private absenceService: AbsenceService,
    private motifService: MotifService,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private _adapter: DateAdapter<any>,
    private planningAbsenceService: PlanningAbsenceService,
    private agentService: AgentService,
    private dossierAbsenceService: DossierAbsenceService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,

  ) {
    this.motif = null;
  }

  ngOnInit() {
    this.anneeCourant = new Date().getFullYear();
    if (this.defaults) {
      this.mode = 'update';
      this.stateCtrl.setValue(this.defaults.agent.prenom);
      this.motiifCtrl.setValue(this.defaults.motif.description);
    } else {
      this.defaults = {} as Absence;
    }

    this.form = this.fb.group({
      dateDepart: [new Date(this.defaults.dateDepart) || '', Validators.required],
      dateRetourPrevisionnelle: [new Date(this.defaults.dateRetourPrevisionnelle) || '', Validators.required],
      commentaire: [this.defaults.commentaire || '', Validators.required],
      dateSaisie: [new Date()],
      // createdAt: [new Date()],
    });

    this.form1 = this.fb.group({

    });

    this.username = this.authentificationService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agentConnecte = this.compte.agent;
      this.uniteOrganisationnelle = this.agentConnecte.uniteOrganisationnelle;
      this.getUniteOrganisationnelleSuperieure();
    }, err => { }
      , () => {
        this.getAgents();
      });

    this.getMotifs();
    this.french();

  }
  french() {
    this._adapter.setLocale('fr');
  }

  filterAgents(name: string) {
    return this.agents.filter(agent =>
      agent.matricule.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.prenom.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
      agent.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  filterMotifs(name: string) {
    return this.motifs.filter(motif =>
      this.motif.description.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  setAgent(agent) {
    this.agent = agent
    if (this.agent.sexe == 'm') {
      let index = this.motifs.findIndex(m => m.description === 'Congé de maternité');
      this.motifs.splice(index, 1);

    } else if (this.agent.sexe == 'f') {
      this.getMotifs();
    }
  }

  save() {
    if (this.mode === 'create') {
      this.createAbsence();
    } else if (this.mode === 'update') {
      this.updateAbsence();
    }
  }

  createAbsence() {
    let absence: Absence = this.form.value;
    absence.agent = this.agent;
    absence.motif = this.motif;
    absence.etat = this.etatAbsence.saisir;
    absence.mois = new Date(absence.dateDepart).toLocaleString("fr-FR", { month: "long" })
    absence.annee = new Date(absence.dateDepart).getFullYear();
    absence.niveau = this.compte.agent.uniteOrganisationnelle.niveauHierarchique.position;
    absence.etape = this.agent.uniteOrganisationnelle.description;
    absence.etape_validation = this.compte.agent.uniteOrganisationnelle.niveauHierarchique.position;
    absence.uniteOrganisationnelle = this.compte.agent.uniteOrganisationnelle
    absence.planningAbsence = this.planningAbsence;

    if (absence.planningAbsence === undefined && this.getDossierAbsence() === undefined) {
      // this.notificationService.warn('La feuille d\'absence de l\'unité doit exister d\'abord');
      this.createPlanningAbsence();
    } else {
      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === DialogUtil.confirmer) {
          this.absenceService.create(absence).subscribe(
            response => {
              if (response.status === 200) {
                this.notificationService.success(NotificationUtil.ajout)
              }
              this.dialogRef.close(response.body);
            });
        } else if (action === DialogUtil.confirmer) {
          this.dialogRef.close();
        } else {
          this.dialogRef.close();
        }
      })
    }
  };

  getPlanningAbsence() {
    this.planningAbsenceService.getAllByDossierAbsenceAndUniteOrganisationnelle(this.dossierAbsence.id, this.uniteOrganisationnelle.id)
      .subscribe(
        (response) => {
          this.planningAbsences = response.body;
          // this.planningAbsences = this.planningAbsences.filter(d => d.uniteOrganisationnelle.id === this.uniteOrganisationnelle.id);

          this.planningAbsences.forEach(element => {
            this.planningAbsence = element;
          });
        },
        (err) => {
        },
        () => {
          //  this.subject$.next(this.planningAbsences);
        }
      );
  }
  updateAbsence() {
    let absence: Absence = this.defaults;
    absence.id = this.defaults.id;
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        if (this.agent == null) {
          absence.agent = this.defaults.agent;
        } else {
          absence.agent = this.agent;
        }
        if (this.motif === null) {
          absence.motif = this.defaults.motif;
        }
        else {
          absence.motif = this.motif;
        }
        absence.dateDepart = new Date(this.form.value.dateDepart);
        absence.dateRetourPrevisionnelle = new Date(this.form.value.dateRetourPrevisionnelle);
        absence.commentaire = this.form.value.commentaire;
        absence.mois = new Date(absence.dateDepart).toLocaleString("fr-FR", { month: "long" })
        absence.annee = new Date(absence.dateDepart).getFullYear();
        absence.etat = this.etatAbsence.saisir;
        absence.etape_validation = this.compte.agent.uniteOrganisationnelle.niveauHierarchique.position;

        this.absenceService.update(absence).subscribe(
          response => {
            if (response.status === 200) {
              this.notificationService.success(NotificationUtil.modification)
            }
            this.dialogRef.close(absence);
          })
      } else {
        this.dialogRef.close();
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
    this.agentService.getAllByUniteOrganisationnelle(this.uniteOrganisationnelle.id).subscribe(
      (response) => {
        this.agents = response.body;
      },
      (err) => {
      }
      , () => {
        this.filteredAgents = this.stateCtrl.valueChanges.pipe(
          startWith(''),
          map(agent => agent ? this.filterAgents(agent) : this.agents.slice())
        );
      }
    );
  }

  getMotifs() {
    this.motifService.getAll().subscribe(
      (response) => {
        this.motifs = response.body;
      },err =>{

      },() => {
        this.filteredMotifs = this.motiifCtrl.valueChanges.pipe(
          startWith(''),
          map(motif => motif ? this.filterAgents(motif) : this.motifs.slice())
        );
      }
    );
  }

  setMotif(motif: Motif) {
    this.motif = motif;
    this.isDisable = true;
    if (motif.description === "Convenance personnelle" || motif.description === "Congé de maternité") {
      if (this.form.controls.dateDepart.status !== 'INVALID') {
        this.isDisable = false;
      }
      this.form.controls.dateRetourPrevisionnelle.setValue("");
      return;
    }
    let dateDepart = new Date(this.form.value.dateDepart);
    let dateRetour = new Date(dateDepart.setDate(dateDepart.getDate() + motif.jours));
    this.form.controls.dateRetourPrevisionnelle.setValue(dateRetour);
  }
  setDateRetour() {
    let date = new Date(this.form.value.dateRetourPrevisionnelle).getTime() - new Date(this.form.value.dateDepart).getTime();
    this.nombrejours = date / (1000 * 3600 * 24);
    if (this.motif && this.motif.description === 'Convenance personnelle' && this.nombrejours > this.motif.jours) {
      this.notificationService.warn('La date de retour prévisionnelle ne peut pas dépasser ' + this.motif.jours + ' jours');
      this.form.controls.dateRetourPrevisionnelle.setValue("");
      return;
    }

    else if (this.motif && this.motif.description === 'Congé de maternité' && this.nombrejours > this.motif.jours) {
      this.notificationService.warn('La date de retour prévisionnelle ne peut pas dépasser ' + this.motif.jours + ' jours');
      this.form.controls.dateRetourPrevisionnelle.setValue("");
      return;
    }
  }
  controledate(e) {
    if (this.motif && this.motif.description === "Convenance personnelle" || this.motif.description === "Congé de maternité") {
      if (this.form.controls.dateDepart.status !== 'INVALID') {
        this.isDisable = false;
      }
      return;

    }
    if (this.motif != null) {
      let dateDepart = new Date(this.form.value.dateDepart);
      let dateRetour = new Date(dateDepart.setDate(dateDepart.getDate() + this.motif.jours));
      this.form.controls.dateRetourPrevisionnelle.setValue(dateRetour);
    } else {
      let dateDepart = new Date(this.form.value.dateDepart);
      let dateRetour = new Date(dateDepart.setDate(dateDepart.getDate() + this.defaults.motif.jours));
      this.form.controls.dateRetourPrevisionnelle.setValue(dateRetour);
    }
    this.form.get("dateRetourPrevisionnelle").enable;
    this.mindate = new Date(new Date())
  }

  onDateChange(e) {
    //this.form.get('dateRetourPrevisionnelle').enable()
    this.minDatePrevisionnelle = new Date(this.form.value.dateDepart);
    // this.maxDatePrevisionnelle = new Date(new Date(this.form.value.dateDepart).getFullYear(), 11, 31);
  }
  createPlanningAbsence() {
    let planningAbsence: PlanningAbsence = this.form1.value;
    planningAbsence.dateCreation = new Date();
    this.annee = new Date(planningAbsence.dateCreation).getFullYear().toString();
    planningAbsence.code = "FA-" + this.uniteOrganisationnelle.nom + "-" + this.annee;
    planningAbsence.dossierAbsence = this.dossierAbsence;
    planningAbsence.uniteOrganisationnelle = this.uniteOrganisationnelle;

    planningAbsence.description = "Feuille D'absence " + this.annee + "- " + this.uniteOrganisationnelle.nom
    if (planningAbsence.dossierAbsence === undefined && this.getDossierAbsence() === undefined) {

      this.createDossierAbsence();
    } else {

      this.planningAbsenceService.create(planningAbsence).subscribe((response) => {
        this.planningAbsence = response.body;
      }, (err) => {

      }, () => {
        this.createAbsence();
      })
    }
  }

  createDossierAbsence() {
    let dossierAbsence: DossierAbsence = this.form1.value;

    dossierAbsence.matricule = this.agent.matricule;
    dossierAbsence.prenom = this.agent.prenom;
    dossierAbsence.nom = this.agent.nom;
    dossierAbsence.fonction = this.agent.fonction.nom;
    dossierAbsence.annee = new Date().getFullYear();
    dossierAbsence.codeDirection = this.uniteSuperieureAgent.code;
    dossierAbsence.code = "DA-" + dossierAbsence.annee + "-" + this.uniteSuperieureAgent.nom;
    dossierAbsence.nomDirection = this.uniteSuperieureAgent.nom;
    dossierAbsence.description = "Dossier Absence-" + this.uniteSuperieureAgent.description;

    this.dossierAbsenceService.create(dossierAbsence).subscribe((response) => {
      this.dossierAbsence = response.body;
    }, (err) => {
    }, () => {

      this.createPlanningAbsence();
    }
    )
  }

  getUniteOrganisationnelleSuperieure() {
    let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];

    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.uniteSuperieureAgent = this.uniteOrganisationnelle;
      this.getDossierAbsence();
    }
    else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        }, err => { },
          () => {
            this.getDossierAbsence();
          });
    }
  }

  getDossierAbsence() {
    this.dossierAbsenceService.getAll()
      .subscribe(response => {
        this.dossierAbsences = response.body;
        this.dossierAbsences = this.dossierAbsences.filter(d => (d.codeDirection === this.uniteSuperieureAgent.code) && (d.annee === this.anneeCourant));
        // this.dossierAbsence = this.dossierAbsences
        this.dossierAbsences.forEach(element => {
          this.dossierAbsence = element;
        });
      }, err => { },
        () => {
          this.getPlanningAbsence();
        });
  }
}
