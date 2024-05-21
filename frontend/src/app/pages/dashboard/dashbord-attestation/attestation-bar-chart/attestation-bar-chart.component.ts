import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { Attestation } from '../../../gestion-demande-attestation/shared/model/demande-attestation.model';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { Agent } from '../../../../shared/model/agent.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { DemandeAttestationService } from '../../../gestion-demande-attestation/shared/services/demande-attestation.service';

@Component({
  selector: 'fury-attestation-bar-chart',
  templateUrl: './attestation-bar-chart.component.html',
  styleUrls: ['./attestation-bar-chart.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class AttestationBarChartComponent implements OnInit {
  uniteOrgNiveauSupCtrl: FormControl;
  filteredUniteOrg: Observable<any[]>;
  filteredUniteOrgNiveauSup: Observable<any[]>;
  range: FormGroup;
  compte: Compte;
  username: string;
  agent: Agent;
  attestation: Attestation;
  attestations: Attestation[] = [];
  attestationStructure: Attestation[] = [];
  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteSuperieureAgent: UniteOrganisationnelle;
  unite: UniteOrganisationnelle = undefined;
  uniteNiveauOrgSup: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleSuperieures: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  labelMap: Map<string, number> = new Map();
  attestationMap: Map<string, number> = new Map();

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
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


  public barChartData = [{ data: [], label: 'ATTESTATION', backgroundColor: 'rgb(0,128,128)' }];

  constructor(
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private compteService: CompteService,
    private authService: AuthenticationService,
    private attestationService: DemandeAttestationService) { }

  ngOnInit() {
    this.uniteOrgNiveauSupCtrl = new FormControl();
    this.getUniteOrganisationnelleSupByNiveau();

    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
    this.attestationMap.clear();
    this.labelMap.clear();
    this.getAgentConnecte();
  }

  getAgentConnecte() {
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
      console.log("AGENT CONNECTE: ", this.agent);
    }, err => { },
      () => {
        this.getUniteOrganisationnelleSuperieure();
      });
  }

  getUniteOrganisationnelleSuperieure() {
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      console.log("Unite Superieure Agent v.1: ", this.uniteOrganisationnelle);
      this.uniteSuperieureAgent = this.uniteOrganisationnelle;
      this.getUniteOrganisationnellesInferieures(this.uniteSuperieureAgent);
    } else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          this.uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = this.uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
          console.log("Unite Superieure Agent v.2: ", this.uniteSuperieureAgent);
        }, err => { },
          () => {
            this.getUniteOrganisationnellesInferieures(this.uniteSuperieureAgent);
          })
    }
  }

  getUniteOrganisationnellesInferieures(unite: UniteOrganisationnelle) {
    this.uniteOrganisationnelleService.getAllInferieures(unite.id).subscribe(response => {
      this.uniteOrganisationnelleInferieures = response.body;
      this.uniteOrganisationnelleInferieures.unshift(unite);
      this.uniteOrganisationnelleInferieures.forEach(u => {
        this.getAttestationByUnite(u);
      })
    }, err => { },
      () => {
      });
  }

  getAttestationByUnite(uniteOrg: UniteOrganisationnelle) {
    this.attestationService.getAttestationByUnORG(uniteOrg.id).subscribe(
      (data) => {
        this.attestations = data.body;
        this.attestations.forEach(a => {
          this.attestationStructure.push(a);
        })
      },
      (err) => {
        console.log("error lors du chargement des données : ", err);
      }, () => {
        this.setChart(uniteOrg);
      }
    );
  }

  setChart(unite: UniteOrganisationnelle) {
    this.labelMap.set(unite.nom, unite.id);
    this.attestationMap.set(unite.nom, this.attestations.length);
    this.barChartLabels = Array.from(this.labelMap.keys());
    this.barChartData = [{ data: Array.from(this.attestationMap.values()), label: 'ATTESTATION', backgroundColor: 'rgb(0,128,128)' }];
  }

  setUniteOrgNiveauSup(unite: UniteOrganisationnelle) {
    this.unite = unite;
    this.attestationStructure = [];
    this.attestationMap.clear();
    this.labelMap.clear();
    this.getUniteOrganisationnellesInferieures(unite);
  }

  getUniteOrganisationnelleSupByNiveau() {
    this.uniteOrganisationnelleService.getAllSuperieuresByNiveau().subscribe(response => {
      this.uniteNiveauOrgSup = response.body;
      console.log("unite organisationnelle supérieur", this.uniteNiveauOrgSup)
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
