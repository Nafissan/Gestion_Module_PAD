import { Component, OnInit, ViewChild } from '@angular/core';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DossierConge } from '../../shared/model/dossier-conge.model';
import { Agent } from '../../../../shared/model/agent.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { DossierCongeService } from '../../shared/services/dossier-conge.service';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { startWith, map } from 'rxjs/operators';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { PlanningDirectionService } from '../../shared/services/planning-direction.service';
import { PlanningConge } from '../../shared/model/planning-conge.model';
import { PlanningDirection } from '../../shared/model/planning-direction.model';
import { EtatPlanningDirection, EtatDossierConge } from '../../shared/util/util';
import { MatDialog } from '@angular/material/dialog';
import { EtapeValidationComponent } from '../../suivi-conge/etape-validation/etape-validation.component';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
     monthYearLabel: 'MMM YYYY',
     dateA11yLabel: 'LL',
     monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'fury-list-envoi-planning',
  templateUrl: './list-envoi-planning.component.html',
  styleUrls: ['./list-envoi-planning.component.scss', '../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation], 
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ListEnvoiPlanningComponent implements OnInit {
  showProgressBar: boolean = false;
  date: Date = new Date();
  currentYear: number = new Date().getFullYear();
  valider: string = EtatPlanningDirection.valider;
  filteredDossierConges: Observable<any[]>;

  username: string;
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteSuperieureAgent: UniteOrganisationnelle;
  compte: Compte;
  
  dossierConge: DossierConge = undefined;
  currentDate: Date = new Date();
  planningDirection: PlanningDirection = undefined;

  private _gap = 16;
  gap = `${this._gap}px`;
  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }
  anneeSelected = new Date().getFullYear();  
  @ViewChild(MatDatepicker) picker;
  dateControl: FormControl;
  constructor(
    private dossierCongeService: DossierCongeService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private planningDirectionService: PlanningDirectionService,
    private dialog: MatDialog,
    private authentificationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    //
    this.dateControl = new FormControl(moment());
    //
    let annee = this.currentYear.toString();
    this.getDossierConge(annee); 
    //
  }
   // Get DossierConge by annee
   getDossierConge(annee?: string) {
    this.dossierCongeService.getByAnnee(annee).subscribe(
      (response) => {
        this.dossierConge = response.body;
      },
      (err) => {
        this.showProgressBar = true;
       },
      () => {
        if(this.dossierConge)
            this.getAgentConnecte();
      });
  }
  getAgentConnecte(){
    //
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
    }, err => {},
    ( ) => {
     this.planningDirection = undefined;
     if(this.dossierConge){
      this.getUniteOrganisationnelleSuperieure(this.dossierConge);
     }
    });
}
  getUniteOrganisationnelleSuperieure(dossierConge: DossierConge) {
    let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {     
      this.showProgressBar = true;
      this.uniteSuperieureAgent = this.uniteOrganisationnelle;
      this.getPlanningDirection(this.uniteSuperieureAgent.code, dossierConge.id)
    } else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        }, err => { },
          () => {
            this.getPlanningDirection(this.uniteSuperieureAgent.code, dossierConge.id)
          })
    }
  }
  getPlanningDirection(codeDirection: string, idDossierConge: number) {
    this.planningDirectionService.getByCodeDirectionAndDossierConge(codeDirection, idDossierConge)
      .subscribe(response => {
        this.planningDirection = response.body;
      }, err => {},
       () => {
        this.showProgressBar = true;
       });
  }
  transmettrePlanningDirection(planningDirection: PlanningDirection){
    this.dialog
      .open(EtapeValidationComponent, {
        data: {vue: 'transmettre-planning', planningDirection: planningDirection}
      });
  }
  historiquePlanningDirection(planningDirection: PlanningDirection){
    this.dialog
    .open(EtapeValidationComponent, {
       data: {vue: 'historique-planning', planningDirection: planningDirection}
    });
  }
 // Verification des PRIVILEGES
 hasAnyRole(roles: string[]) {
  return this.authentificationService.hasAnyRole(roles);
}
yearSelected(params) {
  this.dateControl.setValue(params);
  this.anneeSelected = params.year();
  this.picker.close();
  this.dossierConge = undefined;
  this.planningDirection = undefined;
  this.getDossierConge(this.anneeSelected.toString());
}
}
