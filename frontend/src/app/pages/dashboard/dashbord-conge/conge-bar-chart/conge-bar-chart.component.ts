import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDatepicker } from '@angular/material/datepicker';
import moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { Agent } from '../../../../shared/model/agent.model';
import { Conge } from '../../../gestion-conge/shared/model/conge.model';
import { PlanningDirection } from '../../../gestion-conge/shared/model/planning-direction.model';
import { PlanningConge } from '../../../gestion-conge/shared/model/planning-conge.model';
import { DossierConge } from '../../../gestion-conge/shared/model/dossier-conge.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { CongeService } from '../../../gestion-conge/shared/services/conge.service';
import { DossierCongeService } from '../../../gestion-conge/shared/services/dossier-conge.service';
import { PlanningDirectionService } from '../../../gestion-conge/shared/services/planning-direction.service';
import { PlanningCongeService } from '../../../gestion-conge/shared/services/planning-conge.service';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { AuthenticationService } from '../../../../shared/services/authentification.service';

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
  selector: 'fury-conge-bar-chart',
  templateUrl: './conge-bar-chart.component.html',
  styleUrls: ['./conge-bar-chart.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class CongeBarChartComponent implements OnInit {
  uniteOrgNiveauSupCtrl: FormControl;
  filteredUniteOrg: Observable<any[]>;
  filteredUniteOrgNiveauSup: Observable<any[]>;
  range: FormGroup;
  compte: Compte;
  username: string;
  agent: Agent;
  conges: Conge[] = [];
  congeStructure: Conge[] = [];
  // congeStructure: number = 0;
  conge: Conge;
  currentPlanningDirection: PlanningDirection = undefined;
  planningConges: PlanningConge[] = [];
  planningCongesVerify: number[] = [];
  currentDossierConge: DossierConge = undefined;
  dossierconges: DossierConge[] = [];
  currentDate: Date = new Date();
  nomUnite: string = undefined;
  uniteOrganisationnelle: UniteOrganisationnelle;
  unite: UniteOrganisationnelle = undefined;
  uniteSuperieureAgent: UniteOrganisationnelle;
  uniteNiveauOrgSup: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleSuperieures: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  labelMap: Map<string, number> = new Map();
  congeMap: Map<string, number> = new Map();
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  anneeSelected = new Date().getFullYear();
  @ViewChild(MatDatepicker) picker;
  date: FormControl;

  private _gap = 16;
  gap = `${this._gap}px`;
  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public barChartData = [{ data: [], label: 'CONGE', backgroundColor: 'rgb(50,205,50)' }];

  constructor(private congeService: CongeService,
    private dossierCongeService: DossierCongeService,
    private planningDirectionService: PlanningDirectionService,
    private planningService: PlanningCongeService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private compteService: CompteService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.date = new FormControl(moment());
    this.uniteOrgNiveauSupCtrl = new FormControl();
    this.getUniteOrganisationnelleSupByNiveau();
    this.getAgentConnecte();
  }
  
  getAgentConnecte() {
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
      this.nomUnite = this.uniteOrganisationnelle.nom;
      this.getUniteOrganisationnelleSuperieure();
      this.getDossierConges();
    }, (err) => {
      console.log("error lors du chargement des données : ", err);
    },
      () => {
        
      });
  }


  getUniteOrganisationnelleSuperieure() {
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.uniteSuperieureAgent = this.uniteOrganisationnelle;
      this.getUniteOrganisationnellesInferieures(this.uniteOrganisationnelle);
    } else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          this.uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = this.uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
          this.getUniteOrganisationnellesInferieures(this.uniteOrganisationnelle);
        }, (err) => {
          console.log("error lors du chargement des données : ", err);
        },
          () => {
            
          })
    }
  }

  getDossierConges() {
    this.dossierCongeService.getByAnnee(this.anneeSelected.toString()).subscribe(
      (response) => {
        this.currentDossierConge = response.body;
        if (this.currentDossierConge != null) {
          this.getPlanningDirection(this.uniteSuperieureAgent.code, this.currentDossierConge.id)
        }
      }, (err) => {
        console.log("error lors du chargement des données : ", err);
      },
      () => { });
  }

  getPlanningDirection(codeDirection: string, idDossierConge: number) {
    this.planningDirectionService.getByCodeDirectionAndDossierConge(codeDirection, idDossierConge)
      .subscribe(response => {
        this.currentPlanningDirection = response.body; 
        if (this.currentPlanningDirection) {
          this.getPlanningCongeByPlanningDirectionAndUniteOrganisationnelle(this.currentPlanningDirection);
        }     
      }, err => {
        console.log("erreur", err);
      }, () => {
        
      });
  }

  getUniteOrganisationnellesInferieures(unite: UniteOrganisationnelle) {
    this.uniteOrganisationnelleService.getAllInferieures(this.uniteOrganisationnelle.id).subscribe(response => {
      this.uniteOrganisationnelleInferieures = response.body;
      this.uniteOrganisationnelleInferieures.unshift(unite);
    }, (err) => {
      console.log("error lors du chargement des données : ", err);
    }, () => {

    });
  }
  
  getPlanningCongeByPlanningDirectionAndUniteOrganisationnelle(planningDirection: PlanningDirection) {
    console.log('inf', this.uniteOrganisationnelleInferieures);
    this.planningService.getAllByPlanningDirection(planningDirection.id).subscribe(
      (response) => {
        this.planningConges = response.body;
        console.log('plann', this.planningConges);
        this.planningConges.forEach(p => {
          this.getCongesByPlanning(p);
        })
      }, err => {
        console.log("erreur", err);
      }, () => {

      }
    );
  }

  getCongesByPlanning(planning: PlanningConge) {
    this.congeService.getAllByIdPlanningCongeAndAnnee(planning.id, this.anneeSelected.toString()).subscribe(
      (data) => {
        this.conges = data.body;
        this.conges.forEach(c => {
          this.congeStructure.push(c);
        });
        this.dessignerGaph(planning.uniteOrganisationnelle);
      }, (err) => {
        console.log("error lors du chargement des données : ", err);
      }, () => {
      }
    );
  }

  yearSelected(params) {
    this.date.setValue(params);
    this.anneeSelected = params.year();
    this.picker.close();
    this.filtrerCongeByAnnee(this.anneeSelected);
  }

  filtrerCongeByAnnee(annee: number) {
    this.conges = [];
    this.congeStructure = [];
    this.planningConges.forEach(p => {
      this.congeService.getAllByIdPlanningCongeAndAnnee(p.id, annee.toString()).subscribe((data) => {
        this.conges = data.body;
        this.conges.forEach(i => {
          this.congeStructure.push(i);
        });
        this.dessignerGaph(p.uniteOrganisationnelle);
      }, (err) => {
        console.log("error lors du chargement des données : ", err);
      }, () => {
       
      });
    })
  }

  setUniteOrgNiveauSup(unite: UniteOrganisationnelle) {
    this.unite = unite;
    this.congeStructure = [];
    this.congeMap.clear();
    this.labelMap.clear();
    this.getUniteOrganisationnellesInferieures(this.unite);
  }

  dessignerGaph(unite: UniteOrganisationnelle) {
    this.labelMap.set(unite.nom, unite.id);
    this.barChartLabels = Array.from(this.labelMap.keys());
    this.congeMap.set(unite.nom, this.conges.length);
    this.barChartData = [{ data: Array.from(this.congeMap.values()), label: 'CONGE', backgroundColor: 'rgb(50,205,50)' }];
  }

  getUniteOrganisationnelleSupByNiveau() {
    this.uniteOrganisationnelleService.getAllSuperieuresByNiveau().subscribe(response => {
      this.uniteNiveauOrgSup = response.body;
    }, (err) => {
      console.log("error lors du chargement des données : ", err);
    }, () => {
      this.filteredUniteOrgNiveauSup = this.uniteOrgNiveauSupCtrl.valueChanges.pipe(
        startWith(""),
        map((uniteOrg) => uniteOrg
          ? this.filteredUniteOrganisationnelleNiveauSup(uniteOrg)
          : this.uniteNiveauOrgSup.slice()
        )
      );
    })
  }

  filteredUniteOrganisationnelleNiveauSup(code: string) {
    return this.uniteNiveauOrgSup.filter(
      (unite: UniteOrganisationnelle) =>
        unite.nom.toLowerCase().indexOf(code.toLowerCase()) === 0 ||
        unite.description.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }

}
