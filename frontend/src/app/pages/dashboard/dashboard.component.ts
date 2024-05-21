import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { DashboardService } from './dashboard.service';
import { Absence } from '../gestion-absence/shared/model/absence.model';
import { AbsenceService } from '../gestion-absence/shared/service/absence.service';
import { CongeService } from '../gestion-conge/shared/services/conge.service';
import { Conge } from '../gestion-conge/shared/model/conge.model';
import { Attestation } from '../gestion-demande-attestation/shared/model/demande-attestation.model';
import { DemandeAttestationService } from '../gestion-demande-attestation/shared/services/demande-attestation.service';
import { Interim } from '../gestion-interim/shared/model/interim.model';
import { InterimService } from '../gestion-interim/shared/services/interim.service';
import { UniteOrganisationnelle } from 'src/app/shared/model/unite-organisationelle';
import { Agent } from 'src/app/shared/model/agent.model';
import { Compte } from '../gestion-utilisateurs/shared/model/compte.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { CompteService } from '../gestion-utilisateurs/shared/services/compte.service';
import { UniteOrganisationnelleService } from '../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Color, Label } from 'ng2-charts';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { DossierCongeService } from '../gestion-conge/shared/services/dossier-conge.service';
import { DossierConge } from '../gestion-conge/shared/model/dossier-conge.model';
import { PlanningDirection } from '../gestion-conge/shared/model/planning-direction.model';
import { PlanningConge } from '../gestion-conge/shared/model/planning-conge.model';
import { PlanningDirectionService } from '../gestion-conge/shared/services/planning-direction.service';
import { PlanningCongeService } from '../gestion-conge/shared/services/planning-conge.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Data } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'fury-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', "../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class DashboardComponent implements OnInit {
  absences: Absence[] = [];
  absence: Absence;
  attestations: Attestation[] = [];
  attestationStructure: Attestation[] = [];
  conges: Conge[] = [];
  congeStructure: Conge[] = [];
  interimStructure: Interim[] = [];
  interims: Interim[] = [];
  absenceStructure: Absence[] = [];
  dataAttestations: Map<string, number> = new Map();
  date: Date = new Date();
  currentYear: number = new Date().getFullYear();
  username: string;
  agent: Agent;
  dossierconge: DossierConge;
  currentPlanningDirection: PlanningDirection = undefined;
  currentPlanningConge: PlanningConge = undefined;
  planningConges: PlanningConge[] = [];
  planningCongesVerify: number[] = [];
  currentDossierConge: DossierConge = undefined;
  dossierconges: DossierConge[] = [];
  currentDate: Date = new Date();
  uniteOrganisationnelle: UniteOrganisationnelle;
  unite: UniteOrganisationnelle = undefined;
  uniteSuperieureAgent: UniteOrganisationnelle;
  uniteOrgaNiveauZeroEtUn: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleSuperieures: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  uniteOrgCtrl: FormControl;
  filteredUniteOrg: Observable<any[]>;
  range: FormGroup;
  compte: Compte;
  labelMap: Map<string, number> = new Map();
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'CONGE', backgroundColor: '#949FB1' },
    { data: [], label: 'INTERIM', backgroundColor: '#949FB1' },
    { data: [], label: 'ABSENCE', backgroundColor: '#949FB1' },
    { data: [], label: 'ATTESTATION', backgroundColor: '#949FB1' }
  ];

  lineChartLabels: Label[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai',
    'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  congeMap: Map<string, number> = new Map();
  absenceMap: Map<string, number> = new Map();
  interimMap: Map<string, number> = new Map();
  attestationMap: Map<string, number> = new Map();

  private _gap = 16;
  gap = `${this._gap}px`;

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }


  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#949FB1',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // public randomize(): void {
  //   // Only Change 3 values
  //   this.barChartData[0].data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40 ];
  // }
  constructor(private dashboardService: DashboardService,
    private router: Router,
    private absenceService: AbsenceService,
    private congeService: CongeService,
    private interimService: InterimService,
    private dossierCongeService: DossierCongeService,
    private authService: AuthenticationService,
    private planningService: PlanningCongeService,
    private planningDirectionService: PlanningDirectionService,
    private compteService: CompteService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private attestationService: DemandeAttestationService) { }

  ngOnInit() {
    this.labelMap.clear();
    this.absenceMap.clear();
    this.congeMap.clear();
    this.interimMap.clear();
    this.attestationMap.clear();
    this.getAgentConnecte();
    this.uniteOrgCtrl = new FormControl();

    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
  }
  setUniteOrg(unite: UniteOrganisationnelle) {
    this.unite = unite;
  }

  getAgentConnecte() {
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
      //console.log("AGENT CONNECTE: ", this.agent);
    }, err => { },
      () => {
        this.getUniteOrganisationnelleSuperieure();
      });
  }

  getUniteOrganisationnelleSuperieure() {
    this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id).subscribe(response => {
      this.uniteOrganisationnelleSuperieures = response.body;
      if (this.uniteOrganisationnelle.niveauHierarchique.position === 0 || this.uniteOrganisationnelle.niveauHierarchique.position === 1) {
        this.uniteSuperieureAgent = this.uniteOrganisationnelle;
        this.getUniteOrganisationnellesInferieures(this.uniteSuperieureAgent.id);
        console.log("Unite Superieure Agent v.2: ", this.uniteSuperieureAgent);
      } else {
        this.uniteSuperieureAgent = this.uniteOrganisationnelleSuperieures
          .find(e => e.niveauHierarchique.position === 1);
        this.getUniteOrganisationnellesInferieures(this.uniteSuperieureAgent.id);
      }
    }, err => { },
      () => {

      })
  }

  getUniteOrganisationnellesInferieures(idUniteOrganisationnelle: number) {
    let i = 0;
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 0){
      this.uniteOrganisationnelleInferieures.unshift(this.uniteOrganisationnelle);
    } else {
      this.uniteOrganisationnelleService.getAllInferieures(idUniteOrganisationnelle).subscribe(response => {
        this.uniteOrganisationnelleInferieures = response.body;
        this.uniteOrganisationnelleInferieures.unshift(this.uniteOrganisationnelle);
        this.uniteOrganisationnelleInferieures.forEach(u => {
          this.labelMap.set(u.nom, i);
          this.getAttestationByUnite(u.id, u.nom);
          i += 1;
        });
      }, err => { },
        () => {
          this.filteredUniteOrg = this.uniteOrgCtrl.valueChanges.pipe(
            startWith(""),
            map((uniteOrg) => uniteOrg
              ? this.filteredUniteOrganisationnelle(uniteOrg)
              : this.uniteOrganisationnelleInferieures.slice()
            )
          );
        });
    }
  }

  filteredUniteOrganisationnelle(code: string) {
    return this.uniteOrganisationnelleSuperieures.filter(
      (unite: UniteOrganisationnelle) =>
        unite.nom.toLowerCase().indexOf(code.toLowerCase()) === 0 ||
        unite.description.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }
  getAttestationByUnite(idUnite: number, nomUnite: string) {
    this.attestationService.getAttestationByUnORG(idUnite).subscribe(
      (reponse) => {
        this.attestations = reponse.body;
        this.attestationMap.set(nomUnite, this.attestations.length);
        this.attestations.forEach(a => {
          this.attestationStructure.push(a);
        });
      }, err => { },
      () => {
        this.getAbsences(idUnite, nomUnite);
      });
  }

  getAbsences(idUnite: number, nomUnite: string) {
    this.absenceService.getAbsencesByUnORG(idUnite).subscribe(
      (data) => {
        this.absences = data.body;
        this.absenceMap.set(nomUnite, this.absences.length);
        this.absences.forEach(a => {
          this.absenceStructure.push(a);
        });
      },
      (err) => {
        console.log("error lors du chargement des données : ", err);
      },
      () => {
        this.getInterims(idUnite, nomUnite);
      }
    );
  }

  getInterims(idUnite: number, nomUnite: string) {
    this.interimService.getInterimByUnORG(idUnite).subscribe(
      (data) => {
        this.interims = data.body;
        this.interims.forEach(i => {
          this.interimStructure.push(i);
        })
      },
      (err) => {
        console.log("error lors du chargement des données : ", err);
      },
      () => {
        this.interimMap.set(nomUnite, this.interims.length);
        //this.lineChartLabels = Array.from(this.labelMap.keys());
        this.lineChartData = [
          { data: Array.from(this.congeMap.values()), label: 'CONGE', backgroundColor: 'rgb(50,205,50)' },
          { data: Array.from(this.absenceMap.values()), label: 'ABSENCE', backgroundColor: 'rgb(255,0,0)' },
          { data: Array.from(this.interimMap.values()), label: 'INTERIM', backgroundColor: 'rgb(30,144,255)' },
          { data: Array.from(this.attestationMap.values()), label: 'ATTESTATION', backgroundColor: 'rgb(0,128,128)' },
        ];
        //this.getDossierConges(nomUnite);      
      }
    );
  }

  getDossierConges(nomUnite: string) {
    this.dossierCongeService.getAll().subscribe(
      (response) => {
        this.dossierconges = response.body;
        let currentYear: string = this.currentDate.getFullYear().toString();
        this.currentDossierConge = this.dossierconges.find(e => e.annee === currentYear);
      },
      (err) => { },
      () => {
        this.getPlanningDirection(this.uniteSuperieureAgent.code, this.currentDossierConge.id, nomUnite);
      });
  }

  getPlanningDirection(codeDirection: string, idDossierConge: number, nomUnite: string) {
    this.planningDirectionService.getByCodeDirectionAndDossierConge(codeDirection, idDossierConge)
      .subscribe(response => {
        this.currentPlanningDirection = response.body;
      }, err => { },
        () => {
          this.getPlanningCongeByPlanningDirectionAndUniteOrganisationnelle(this.currentPlanningDirection, nomUnite);
        });
  }

  getPlanningCongeByPlanningDirectionAndUniteOrganisationnelle(planningDirection: PlanningDirection, nomUnite: string) {
    this.planningService
      .getAllByPlanningDirectionAndUniteOrganisationnelle(planningDirection.id, this.uniteOrganisationnelle.id)
      .subscribe(
        (response) => {
          this.planningConges = response.body;
          console.log("pppppppppppl", this.planningConges)
        }, err => { },
        () => {
          this.planningConges.forEach(p => {
            this.getConges(p.id, nomUnite);
          });
        }
      );
  }

  getConges(idPlanning: number, nomUnite: string) {
    this.congeService.getAllByIdPlanningConge(idPlanning).subscribe(
      (data) => {
        this.conges = data.body;
        console.log("cccccccccccg", this.congeStructure);
        this.conges.forEach(c => {
          this.congeStructure.push(c);
        });
        this.congeMap.set(nomUnite, this.congeStructure.length);
      },
      (err) => {
        console.log("error lors du chargement des données : ", err);
      },
      () => {
        console.log("loggggggg", Array.from(this.congeMap.values()));
      }
    );
  }


}
