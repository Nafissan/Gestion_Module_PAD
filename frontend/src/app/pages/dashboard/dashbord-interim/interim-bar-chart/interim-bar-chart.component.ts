import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import moment from 'moment';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { Agent } from '../../../../shared/model/agent.model';
import { Interim } from '../../../gestion-interim/shared/model/interim.model';
import { DossierInterim } from '../../../gestion-interim/shared/model/dossier-interim.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { InterimService } from '../../../gestion-interim/shared/services/interim.service';
import { DossierInterimService } from '../../../gestion-interim/shared/services/dossier-interim.service';
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
  selector: 'fury-interim-bar-chart',
  templateUrl: './interim-bar-chart.component.html',
  styleUrls: ['./interim-bar-chart.component.scss', "../../../../shared/util/bootstrap4.css"],
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
export class InterimBarChartComponent implements OnInit {
  nomUnite: string = undefined;
  uniteOrgNiveauSupCtrl: FormControl;
  filteredUniteOrg: Observable<any[]>;
  filteredUniteOrgNiveauSup: Observable<any[]>;
  range: FormGroup;
  compte: Compte;
  username: string;
  agent: Agent;
  interimStructure: Interim[] = [];
  // interimStructure: number = 0;
  dossierInterims: DossierInterim[] = [];
  interims: Interim[] = [];
  interim: Interim;
  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteSuperieureAgent: UniteOrganisationnelle;
  unite: UniteOrganisationnelle = undefined;
  uniteNiveauOrgSup: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleSuperieures: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  labelMap: Map<string, number> = new Map();
  interimMap: Map<string, number> = new Map();
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  anneeSelected = new Date().getFullYear();
  @ViewChild(MatDatepicker) picker;
  date : FormControl;
  private _gap = 16;
  gap = `${this._gap}px`;

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
  public barChartData = [
    { data: [], label: 'ABSENCE', backgroundColor: 'rgb(30,144,255)' },
  ];

  constructor(private interimService: InterimService,
    private dossierInterimService: DossierInterimService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private compteService: CompteService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.date = new FormControl(moment());
    this.interimStructure = [];
    this.uniteOrgNiveauSupCtrl = new FormControl();
    this.getUniteOrganisationnelleSupByNiveau();
    this.interimMap.clear();
    this.labelMap.clear();
    this.getAgentConnecte();
  }

  getAgentConnecte() {
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
      this.nomUnite = this.uniteOrganisationnelle.nom;
    }, err => { },
      () => {
        this.getDossierInterim();
      });
  }

  getDossierInterim() {
    this.dossierInterimService.getDossierInterimByAnnee(this.anneeSelected).subscribe(respone => {
      this.dossierInterims = respone.body;
      if (this.dossierInterims.length != 0) {
        this.getUniteOrganisationnellesInferieures(this.agent.uniteOrganisationnelle);
      }
    })
  }

  getUniteOrganisationnelleSuperieure() {
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.uniteSuperieureAgent = this.uniteOrganisationnelle;
    } else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          this.uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = this.uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        }, err => { },
          () => {
          })
    }
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

  getUniteOrganisationnellesInferieures(unite: UniteOrganisationnelle) {
    this.uniteOrganisationnelleService.getAllInferieures(unite.id).subscribe(response => {
      this.uniteOrganisationnelleInferieures = response.body;
      this.uniteOrganisationnelleInferieures.unshift(unite);
      this.uniteOrganisationnelleInferieures.forEach(u => {
        this.getInterimByUniteOrg(u)
      })
    }, err => { },
      () => {

      });
  }

  getInterimByUniteOrg(unite: UniteOrganisationnelle) {
    this.interimService.getInterimByUnORGAndAnnee(unite.id, this.anneeSelected).subscribe(
      (data) => {
        this.interims = data.body;
        this.interims.forEach(i => {
          this.interimStructure.push(i);
        })
        this.labelMap.set(unite.nom, unite.id);
        this.interimMap.set(unite.nom, this.interims.length);
        this.barChartLabels = Array.from(this.labelMap.keys());
        this.barChartData = [{ data: Array.from(this.interimMap.values()), label: 'INTERIMS', backgroundColor: 'rgb(30,144,255)' }];
      },
      (err) => {
        console.log("error lors du chargement des données : ", err);
      },
      () => {

      }
    );
  }

  yearSelected(params) {
    this.date.setValue(params);
    this.anneeSelected = params.year();
    this.picker.close();
    this.filtrerInterimByAnnee(this.anneeSelected);
  }

  filtrerInterimByAnnee(annee: number){
    this.interims = [];
    this.interimStructure = [];
    this.uniteOrganisationnelleInferieures.forEach(u => {
      this.interimService.getInterimByUnORGAndAnnee(u.id, annee).subscribe((data) => {
          this.interims = data.body;
          this.interims.forEach(i => {
            this.interimStructure.push(i);
          })
          this.labelMap.set(u.nom, u.id);
          this.interimMap.set(u.nom, this.interims.length);
          this.barChartLabels = Array.from(this.labelMap.keys());
          this.barChartData = [{ data: Array.from(this.interimMap.values()), label: 'INTERIMS', backgroundColor: 'rgb(30,144,255)' }];
        },(err) => {
          console.log("error lors du chargement des données : ", err);
        },
        () => {

        }
      );
    })
  }

  setUniteOrgNiveauSup(unite: UniteOrganisationnelle) {
    this.unite = unite;
    this.interimStructure = [];
    this.interimMap.clear();
    this.labelMap.clear();
    this.getUniteOrganisationnellesInferieures(unite);
  }

}
