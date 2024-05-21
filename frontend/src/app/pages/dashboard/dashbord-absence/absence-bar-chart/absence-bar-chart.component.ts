import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, Chart } from 'chart.js';
import { Label } from 'ng2-charts';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { map, startWith } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { Data } from '@angular/router';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import moment from 'moment';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { Agent } from '../../../../shared/model/agent.model';
import { Absence } from '../../../gestion-absence/shared/model/absence.model';
import { DossierAbsence } from '../../../gestion-absence/shared/model/dossier-absence.modele';
import { PlanningAbsence } from '../../../gestion-absence/shared/model/planning-absence.modele';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { AbsenceService } from '../../../gestion-absence/shared/service/absence.service';
import { DossierAbsenceService } from '../../../gestion-absence/shared/service/dossier-absence.service';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { PlanningAbsenceService } from '../../../gestion-absence/shared/service/planning-absence.service';
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
  selector: 'fury-absence-bar-chart',
  templateUrl: './absence-bar-chart.component.html',
  styleUrls: ['./absence-bar-chart.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class AbsenceBarChartComponent implements OnInit {
  uniteOrgCtrl: FormControl;
  uniteOrgNiveauSupCtrl: FormControl;
  filteredUniteOrg: Observable<any[]>;
  filteredUniteOrgNiveauSup: Observable<any[]>;
  compte: Compte;
  username: string;
  agent: Agent;
  absence: Absence;
  absences: Absence[] = [];
  absencesParAnnee: any[] = [];
  dossierAbsences: DossierAbsence[] = [];
  planningAbsences: PlanningAbsence[] = [];
  absenceStructure: Absence[] = [];
  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteSuperieureAgent: UniteOrganisationnelle;
  unite: UniteOrganisationnelle = undefined;
  uniteNiveauOrgSup: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleSuperieures: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  moisAbsence: any[] = [];
  absenceTmp: any[] = [];
  labelMap: Map<string, number> = new Map();
  absenceMap: Map<string, number> = new Map();
  nomUnite: string = undefined;
  public barChartData = [{ data: [], label: 'ABSENCE', backgroundColor: 'rgb(0, 128, 128)' }];
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  private _gap = 16;
  gap = `${this._gap}px`;
  anneeSelected = new Date().getFullYear();
  @ViewChild(MatDatepicker) picker;
  date: FormControl;

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{

      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          return value !== 0 ? value.toLocaleString(/* ... */) : ''
        },
        anchor: 'end',
        align: 'end',
      }
    }
  };

  constructor(private absenceService: AbsenceService,
    private dossierAbsenceService: DossierAbsenceService,
    private planningAbsenceService: PlanningAbsenceService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private compteService: CompteService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.date = new FormControl(moment());
    this.uniteOrgNiveauSupCtrl = new FormControl();
    this.absenceMap.clear()
    this.labelMap.clear();
    this.absenceStructure = [];
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
      this.getDossierAbsence();
    }, (err) => {
    },
      () => {

      });
  }

  getDossierAbsence() {
    this.dossierAbsenceService.getDossierAbsenceByAnnee(this.anneeSelected).subscribe((response) => {
      this.dossierAbsences = response.body;
      if (this.dossierAbsences.length != 0) {
        this.getPlanningAngAbsence();
      }
    }, (err) => {
    },
      () => {

      });
  }

  getPlanningAngAbsence() {
    this.planningAbsenceService.getAll().subscribe((response) => {
      this.planningAbsences = response.body;
      if (this.planningAbsences.length != 0) {
        this.getUniteOrganisationnellesInferieures(this.uniteOrganisationnelle);
      }
    }, (err) => {
    },
      () => {
      });
  }

  getUniteOrganisationnelleSuperieure() {
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.uniteSuperieureAgent = this.uniteOrganisationnelle;
    } else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          this.uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = this.uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        }, (err) => {
        },
          () => {

          })
    }
  }

  getUniteOrganisationnellesInferieures(unite: UniteOrganisationnelle) {
    this.uniteOrganisationnelleService.getAllInferieures(unite.id).subscribe(response => {
      this.uniteOrganisationnelleInferieures = response.body;
      this.uniteOrganisationnelleInferieures.unshift(unite);
      this.uniteOrganisationnelleInferieures.sort().forEach(u => {
        this.getAbsencesByUniteOrg(u);
      })
    }, (err) => {
    }, () => {

    });
  }

  getAbsencesByUniteOrg(unite: UniteOrganisationnelle) {
    this.absenceService.getAbsencesByUniteOrgAndAnnee(unite.id, this.anneeSelected).subscribe((res => {
      this.absences = res.body;
      this.absences.forEach(a => {
        this.absenceStructure.push(a);
      });
      this.dessignerGaph(unite);
      }), (err) => {
    },
      () => {

      }
    );
  }

  yearSelected(params) {
    this.date.setValue(params);
    this.anneeSelected = params.year();
    this.picker.close();
    this.filtrerAbsenceByAnnee(this.anneeSelected);
  }

  filtrerAbsenceByAnnee(annee: number) {
    this.absences = [];
    this.absenceStructure = [];
    this.uniteOrganisationnelleInferieures.forEach(u => {
      this.absenceService.getAbsencesByUniteOrgAndAnnee(u.id, annee).subscribe((data) => {
        this.absences = data.body;
        this.absences.forEach(i => {
          this.absenceStructure.push(i);
        })
        this.dessignerGaph(u);
        },
        (err) => {
        },
        () => {

        });
    })
  }
  
  setUniteOrgNiveauSup(unite: UniteOrganisationnelle) {
    this.unite = unite;
    this.absenceStructure = [];
    this.absenceMap.clear();
    this.labelMap.clear();
    this.getUniteOrganisationnellesInferieures(unite);
  }

  dessignerGaph(unite: UniteOrganisationnelle) {
    this.labelMap.set(unite.nom, unite.id);
    this.absenceMap.set(unite.nom, this.absences.length);
    this.barChartLabels = Array.from(this.labelMap.keys());
    this.barChartData = [{ data: Array.from(this.absenceMap.values()), label: 'ABSENCE', backgroundColor: 'rgb(0, 128, 128)' }];
  }

  getUniteOrganisationnelleSupByNiveau() {
    this.uniteOrganisationnelleService.getAllSuperieuresByNiveau().subscribe(response => {
      this.uniteNiveauOrgSup = response.body;
    }, (err) => {
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
