import { Component, OnInit, ViewChild } from "@angular/core";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { DossierCongeService } from "../../shared/services/dossier-conge.service";
import { CongeService } from "../../shared/services/conge.service";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { Conge } from "../../shared/model/conge.model";
import { DossierConge } from "../../shared/model/dossier-conge.model";
import { PlanningConge } from "../../shared/model/planning-conge.model";
import { PlanningCongeService } from "../../shared/services/planning-conge.service";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { Agent } from "../../../../shared/model/agent.model";
import { MatDialog } from "@angular/material/dialog";
import { ValidationCongeComponent } from "../validation-conge/validation-conge.component";
import { EtatPlanningConge, EtatPlanningDirection, EtatDossierConge } from "../../shared/util/util";
import { UniteOrganisationnelleService } from "../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service";
import { PlanningDirectionService } from "../../shared/services/planning-direction.service";
import { PlanningDirection } from "../../shared/model/planning-direction.model";
import { DialogUtil } from "../../../../shared/util/util";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { EtapeValidationComponent } from "../etape-validation/etape-validation.component";
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from "@angular/material/core";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { MatDatepicker } from "@angular/material/datepicker";
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
  selector: "fury-list-suivi-conge",
  templateUrl: "./list-suivi-conge.component.html",
  styleUrls: ["./list-suivi-conge.component.scss", '../../../../shared/util/bootstrap4.css'],
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
export class ListSuiviCongeComponent implements OnInit {
  showProgressBar: boolean = false;
  date: Date = new Date();
  currentYear: number = new Date().getFullYear();
  username: string;
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteSuperieureAgent: UniteOrganisationnelle;
  uniteOrganisationnelleSuperieures: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  idUniteOrganisationnelleInferieures: number[] = [];
  compte: Compte;

  dossierConge: DossierConge = undefined;
  saisiDossierConge: string = EtatDossierConge.saisi;
  // currentDate: Date = new Date();
  planningDirection: PlanningDirection = undefined;
  etapePlanningDirection: EtatPlanningDirection;
  saisi: string  = EtatPlanningDirection.saisi;
  valider: string  = EtatPlanningDirection.valider;
  ouvert: string  = EtatPlanningDirection.encours;

  planningconges: PlanningConge[] = [];
  dialogUtil: DialogUtil = new DialogUtil();
  planningCongeCtrl: FormControl;
  filteredPlanningConges: Observable<any[]>;
  private _gap = 16;
  gap = `${this._gap}px`;
  anneeSelected = new Date().getFullYear();  
  @ViewChild(MatDatepicker) picker;
  dateControl: FormControl;
  
  constructor(
    private dossierCongeService: DossierCongeService,
    private congeService: CongeService,
    private planningCongeService: PlanningCongeService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private planningDirectionService: PlanningDirectionService,
    private authentificationService: AuthenticationService
  ) { }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }
  ngOnInit(): void {
    
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
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
    }, err => {
      this.showProgressBar = true;
    },
    () => {
      this.idUniteOrganisationnelleInferieures = [];
      this.planningconges = [];
      this.planningDirection = undefined;
      if(this.dossierConge){
        this.getUniteOrganisationnelleSuperieure(this.dossierConge);
      }
    });
   }
  getUniteOrganisationnelleSuperieure(dossierConge: DossierConge) {
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
        this.uniteSuperieureAgent = this.uniteOrganisationnelle;
        this.showProgressBar = true;
        this.getPlanningDirection(this.uniteSuperieureAgent.code, dossierConge.id)
    } else {
        this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
          .subscribe(response => {
            this.uniteOrganisationnelleSuperieures = response.body;
            this.uniteSuperieureAgent = this.uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
          }, err => { 
            this.showProgressBar = true;
          },
            () => {
              this.getPlanningDirection(this.uniteSuperieureAgent.code, dossierConge.id)
            })
    }
  }
  getPlanningDirection(codeDirection: string, idDossierConge: number) {
    this.planningDirectionService.getByCodeDirectionAndDossierConge(codeDirection, idDossierConge)
      .subscribe(response => {
        this.planningDirection = response.body;
      }, err => { 
        this.showProgressBar === true
      },
        () => {
          this.showProgressBar = false;
          this.getUniteOrganisationnellesInferieures(this.planningDirection.id, this.uniteOrganisationnelle.id);
        })
  }
  getUniteOrganisationnellesInferieures(idPlanningDirection: number, idUniteOrganisationnelle: number) {
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.idUniteOrganisationnelleInferieures.unshift(this.uniteOrganisationnelle.id);
      this.getAllPlanningCongeByPlanningDirectionAndUniteOrganisationnelles(idPlanningDirection, this.idUniteOrganisationnelleInferieures);
    } else {
      this.uniteOrganisationnelleService.getAllInferieures(idUniteOrganisationnelle)
        .subscribe(response => {
          this.uniteOrganisationnelleInferieures = response.body;
          this.uniteOrganisationnelleInferieures.unshift(this.uniteOrganisationnelle);

          this.uniteOrganisationnelleInferieures.forEach(unite => {
            this.idUniteOrganisationnelleInferieures.push(unite.id);
          })
        }, err => { },
          () => {
            this.getAllPlanningCongeByPlanningDirectionAndUniteOrganisationnelles(idPlanningDirection, this.idUniteOrganisationnelleInferieures);
          });
    }

  }

  getAllPlanningCongeByPlanningDirectionAndUniteOrganisationnelles(
    idPlanningDirection: number,
    idUniteOrganisationnelles: number[]
  ) {
    this.planningCongeService
      .getAllByPlanningDirectionAndUniteOrganisationnelles(
        idPlanningDirection,
        idUniteOrganisationnelles
      )
      .subscribe(
        (response) => {
          this.planningconges = response.body;
        }, err => {
          this.showProgressBar = true;
        },
        () => {
          this.isPlanningDirectionValide();
          this.showProgressBar = true;
        });
  }
  setPlanningConge(planningConge: PlanningConge) {
    this.dialog
      .open(ValidationCongeComponent, {
        data: { planningConge: planningConge, unites: this.uniteOrganisationnelleInferieures, superieurs: this.uniteOrganisationnelleSuperieures }
      }).afterClosed().subscribe( result => {
      });
  }
  isPlanningDirectionValide(): boolean {
    let isValide: boolean = false;
    for (const planningConge of this.planningconges) {
      if (planningConge.etat === EtatPlanningConge.valider) {
           isValide = true;
      }else{
           isValide = false;
           break;
      }
    }
    return isValide;
  }
  setEatPlanningDirection(planningDirection: PlanningDirection){
    this.planningDirectionService.update(planningDirection)
          .subscribe( response => {
          })
  }
  updatePlanningDirection(planningDirection: PlanningDirection) {
    this.dialog
    .open(EtapeValidationComponent, {
       data: {vue: 'valider-planning', planningDirection: planningDirection}
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
    this.idUniteOrganisationnelleInferieures = [];
    this.planningconges = [];
    this.planningDirection = undefined;
    this.dossierConge = undefined;
    this.getDossierConge(this.anneeSelected.toString());
  }
}
