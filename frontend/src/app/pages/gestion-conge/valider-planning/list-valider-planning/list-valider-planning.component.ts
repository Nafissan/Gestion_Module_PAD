import { Component, OnInit, ViewChild } from '@angular/core';
import { DossierConge } from '../../shared/model/dossier-conge.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PlanningDirection } from '../../shared/model/planning-direction.model';
import { PlanningDirectionService } from '../../shared/services/planning-direction.service';
import { DossierCongeService } from '../../shared/services/dossier-conge.service';
import { startWith, map } from 'rxjs/operators';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { PlanningConge } from '../../shared/model/planning-conge.model';
import { PlanningCongeService } from '../../shared/services/planning-conge.service';
import { Conge } from '../../shared/model/conge.model';
import { CongeService } from '../../shared/services/conge.service';
import { ValidationCongeComponent } from '../../suivi-conge/validation-conge/validation-conge.component';
import { MatDialog } from '@angular/material/dialog';
import { Agent } from '../../../../shared/model/agent.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { EtatPlanningDirection } from '../../shared/util/util';
import { DialogUtil } from '../../../../shared/util/util';
import { EtapeValidationComponent } from '../../suivi-conge/etape-validation/etape-validation.component';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
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
  selector: 'fury-list-valider-planning',
  templateUrl: './list-valider-planning.component.html',
  styleUrls: ['./list-valider-planning.component.scss', '../../../../shared/util/bootstrap4.css'],
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
export class ListValiderPlanningComponent implements OnInit {
  date: Date = new Date();
  currentYear: number = new Date().getFullYear();
  username: string;
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  compte: Compte;
  niveau: number;
  dossierConge: DossierConge = undefined;
  planningDirection: PlanningDirection = undefined;
  planningconges: PlanningConge[] = [];

  etatPlanningDirection: EtatPlanningDirection = new EtatPlanningDirection();
  dialogUtil: DialogUtil = new DialogUtil();
  planningDirections: PlanningDirection[] = [];
  planningDirectionCtrl: FormControl;
  filteredPlanningDirections: Observable<any[]>;

  private _gap = 16;
  gap = `${this._gap}px`;
  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }
  anneeSelected = new Date().getFullYear();  
  @ViewChild(MatDatepicker) picker;
  dateControl: FormControl;
  constructor(
    private planningDirectionService: PlanningDirectionService,
    private dossierCongeService: DossierCongeService,
    private planningCongeService: PlanningCongeService,
    private dialog: MatDialog,
    private compteService: CompteService,
    private authService: AuthenticationService,
    private authentificationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
      this.niveau = this.uniteOrganisationnelle.niveauHierarchique.position;
    });
    //
    this.dateControl = new FormControl(moment());
    //
    let annee = this.currentYear.toString();
    this.getDossierConge(annee); 
    //
    this.planningDirectionCtrl = new FormControl();
  }
  // Get DossierConge by annee
  getDossierConge(annee?: string) {
    this.dossierCongeService.getByAnnee(annee).subscribe(
      (response) => {
        this.dossierConge = response.body;
      },
      (err) => { },
      () => {
        this.getPlanningDirections(this.dossierConge);
      }
    );
  }
  getPlanningDirections(dossierConge: DossierConge) {
    this.planningDirectionService.getByDossierConge(dossierConge.id).subscribe(
      (response) => {
        this.planningDirections = response.body;
      },
      (err) => { },
      () => {
        this.filteredPlanningDirections = this.planningDirectionCtrl.valueChanges.pipe(
          startWith(""),
          map((planningDirection) =>
            planningDirection
              ? this.filterPlanningDirections(planningDirection)
              : this.planningDirections.slice()
          )
        );
      }
    );
  }
  filterPlanningDirections(code: string) {
    return this.planningDirections.filter(
      (planningDirection: PlanningDirection) =>
        planningDirection.code.toLowerCase().indexOf(code.toLowerCase()) === 0 ||
        planningDirection.descriptionDirection.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }
  setPlanningDirection(planningDirection: PlanningDirection) {
    this.planningconges = undefined;
    this.planningDirection = planningDirection;
  }
  getAllPlanningCongesByIdPLanninngDirection(id: number) {
    this.planningCongeService.getAllByPlanningDirection(id)
      .subscribe(response => {
        this.planningconges = response.body;
      });
  }
  DetailsPlanningDirection(planningDirection: PlanningDirection) {
    this.planningconges = undefined;
    this.getAllPlanningCongesByIdPLanninngDirection(planningDirection.id);
  }
  setPlanningConge(planningConge: PlanningConge) {
    this.dialog
      .open(ValidationCongeComponent, {
        data: { planningConge: planningConge, vue: "DCH" }
      });
  }
  imputerPlanningDirection(planningDirection: PlanningDirection) {
    this.dialog
      .open(EtapeValidationComponent, {
        data: { vue: 'imputer-planning', planningDirection: planningDirection }
      });
  }
  cloturerPlanningDirection(planningDirection: PlanningDirection) {
    this.dialog
      .open(EtapeValidationComponent, {
        data: { vue: 'cloturer-planning', planningDirection: planningDirection }
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
 setDossierConge(dossierConge: DossierConge) {
  this.dossierConge = dossierConge;
  this.planningDirections = [];
  this.planningconges = [];
  this.planningDirection = undefined;
  this.planningDirectionCtrl.setValue('');
  this.getPlanningDirections(this.dossierConge);
}
}
