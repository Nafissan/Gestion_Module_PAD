import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from "@angular/core";

import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { map, startWith } from 'rxjs/operators';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { Conge } from '../../../gestion-conge/shared/model/conge.model';
import { PlanningDirection } from '../../../gestion-conge/shared/model/planning-direction.model';
import { PlanningConge } from '../../../gestion-conge/shared/model/planning-conge.model';
import { DossierConge } from '../../../gestion-conge/shared/model/dossier-conge.model';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { Agent } from '../../../../shared/model/agent.model';
import { Absence } from '../../../gestion-absence/shared/model/absence.model';
import { DossierAbsence } from '../../../gestion-absence/shared/model/dossier-absence.modele';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { PlanningAbsence } from '../../../gestion-absence/shared/model/planning-absence.modele';
import { Interim } from '../../../gestion-interim/shared/model/interim.model';
import { DossierInterim } from '../../../gestion-interim/shared/model/dossier-interim.model';
import { Attestation } from '../../../gestion-demande-attestation/shared/model/demande-attestation.model';
import { CongeService } from '../../../gestion-conge/shared/services/conge.service';
import { DossierCongeService } from '../../../gestion-conge/shared/services/dossier-conge.service';
import { PlanningDirectionService } from '../../../gestion-conge/shared/services/planning-direction.service';
import { DossierAbsenceService } from '../../../gestion-absence/shared/service/dossier-absence.service';
import { AbsenceService } from '../../../gestion-absence/shared/service/absence.service';
import { InterimService } from '../../../gestion-interim/shared/services/interim.service';
import { DossierInterimService } from '../../../gestion-interim/shared/services/dossier-interim.service';
import { PlanningCongeService } from '../../../gestion-conge/shared/services/planning-conge.service';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { AgentService } from '../../../../shared/services/agent.service';

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
  selector: 'fury-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', "../../../../shared/util/bootstrap4.css"],
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

export class HomeComponent implements OnInit {
  congeStructure: Conge[] = []
  congeStructure2: Conge[] = []
  conge: Conge;
  conges: Conge[] = [];
  conges2: Conge[] = [];
  currentPlanningDirection: PlanningDirection = undefined;
  PlanningDirectionUniteSelected: PlanningDirection = undefined;
  planningConges: PlanningConge[] = [];
  PlanningCongeOfUniteSelected: PlanningConge[] = [];
  planningCongesVerify: number[] = [];
  currentDossierConge: DossierConge = undefined;
  dossierconges: DossierConge[] = [];
  currentDate: Date = new Date();
  uniteOrgCtrl: FormControl;
  uniteOrgNiveauSupCtrl: FormControl;
  filteredUniteOrg: Observable<any[]>;
  filteredUniteOrgNiveauSup: Observable<any[]>;
  compte: Compte;
  username: string;
  agent: Agent;
  absence: Absence;
  absences: Absence[] = [];
  absences2: Absence[] = [];
  absencesFiltre: Absence[] = [];
  dossierAbsences: DossierAbsence[] = [];
  planningAbsences: PlanningAbsence[] = [];
  absenceStructure: Absence[] = [];
  absenceStructure2: Absence[] = [];
  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteOrganisationnelleSelected: UniteOrganisationnelle;
  uniteSuperieureAgent: UniteOrganisationnelle;
  uniteSuperieurUniteSelected: UniteOrganisationnelle;
  uniteNiveauOrgSup: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleSuperieures: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  toutesLesUniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  agentsOfUnite: Agent[] = [];
  directions: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleInferieuresOfUniteSelected: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleSuperieuresOfUniteSelected: UniteOrganisationnelle[] = [];
  interimStructure: Interim[] = [];
  interimStructure2: Interim[] = [];
  dossierInterims: DossierInterim[] = [];
  filteredDossierInterims: Observable<any[]>;
  filteredDossierAbsence: Observable<any[]>;
  dossierAbsenceCtrl: FormControl;
  interims: Interim[] = [];
  interims2: Interim[] = [];
  interim: Interim;
  attestation: Attestation;
  anneeCourant: number;
  attestations: Attestation[] = [];
  attestationStructure: Attestation[] = [];
  moisAbsence: any[] = [];
  moisAbsence2: any[] = [];
  moisConge: any[] = [];
  moisConge2: any[] = [];
  moisCongeTmp: number[] = [];
  moisInterim: any[] = [];
  moisInterim2: any[] = [];
  moisAttestation: any[] = [];
  absencesParAnnee: Absence[] = [];
  congesParAnnee: any[] = [];
  uniteOrganisationnelles: UniteOrganisationnelle[];
  uniteOrganisationnelleCtrl: FormControl;
  directionCtrl: FormControl;
  agentCtrl: FormControl;
  filteredUniteOrganisationnelles: Observable<any[]>;
  filteredDirection: Observable<any[]>;
  filteredAgent: Observable<any[]>;
  labelMap: Map<string, number> = new Map();
  absenceMap: Map<string, number> = new Map();
  absenceMap2: Map<string, number> = new Map();
  congeMap: Map<string, number> = new Map();
  congeMap2: Map<string, number> = new Map();
  interimMap: Map<string, number> = new Map();
  interimMap2: Map<string, number> = new Map();

  @ViewChild(MatDatepicker) picker;
  date: FormControl;
  anneeSelected = new Date().getFullYear();

  listMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'CONGES', borderColor: '#008000' },
    { data: [], label: 'ABSENCES', borderColor: '#086A87' },
    { data: [], label: 'INTERIMS', borderColor: '#0040FF' }
  ];
  public lineChartData2: ChartDataSets[] = [
    { data: [], label: 'CONGES', borderColor: '#008000' },
    { data: [], label: 'ABSENCES', borderColor: '#086A87' },
    { data: [], label: 'INTERIMS', borderColor: '#0040FF' }
  ];
  public lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      pointLabels: {
        fontSize: 15,
      }
    }
  };

  lineChartColors: Color[] = [
    // {
    //   backgroundColor: [
    //     'rgba(255, 99, 132, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(255, 206, 86, 0.2)',
    //     'rgba(75, 192, 192, 0.2)',
    //     'rgba(153, 102, 255, 0.2)',
    //     'rgba(255, 159, 64, 0.2)'
    //   ],
    //   borderColor: [
    //     'rgba(255,99,132,1)',
    //     'rgba(54, 162, 235, 1)',
    //     'rgba(255, 206, 86, 1)',
    //     'rgba(75, 192, 192, 1)',
    //     'rgba(153, 102, 255, 1)',
    //     'rgba(255, 159, 64, 1)'
    //   ],
    //   borderWidth: 2,
    // }
  ];

  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartType = 'line';

  constructor(
    private congeService: CongeService,
    private absenceService: AbsenceService,
    private planningDirectionService: PlanningDirectionService,
    private dossierCongeService: DossierCongeService,
    private dossierAbsenceService: DossierAbsenceService,
    private interimService: InterimService,
    private planningService: PlanningCongeService,
    private dossierInterimService: DossierInterimService,
    private authentificationService: AuthenticationService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private agentService: AgentService,
    private compteService: CompteService,
    private authService: AuthenticationService) {}
  private _gap = 16;
  gap = `${this._gap}px`;

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  ngOnInit() {    
    this.getAgentConnecte();
    this.setLabel( ); 
    this.date = new FormControl(moment() );
    this.uniteOrganisationnelleCtrl= new FormControl();
    this.directionCtrl= new FormControl();
    this.agentCtrl= new FormControl();    
    this.absenceMap.clear();
    this.congeMap.clear();
    this.interimMap.clear();
    this.absenceStructure = [];
    this.congeStructure = [];
    this.interimStructure = [];
    this.getPlanningDirection
  }

  setLabel() {
    for (let i = 0; i < this.listMois.length; i++) {
      this.labelMap.set(this.listMois[i], i);
      this.lineChartLabels = Array.from(this.labelMap.keys() );
    }
  }

  yearSelected(params) {
    this.date.setValue(params);
    this.anneeSelected = params.year();
    this.picker.close();
    this.filterDashboard(this.anneeSelected);
  }
 
  getAgentConnecte() {
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;     
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
      this.getUniteOrganisationnelleSuperieure();
      this.getUniteOrganisationnellesInferieures(this.uniteOrganisationnelle);//recuperations des conges absences et interims des unités inferieur
      this.afficherDirectionsDansSelect(this.uniteOrganisationnelle)
     // this.afficherAgentsDansSelect(this.uniteOrganisationnelle)
    if  (! this.hasAnyRole(['DASHBOARD_ALL']) ) {
        this.afficherUniteOrganisationnellesInferieuresDansSelect(this.uniteOrganisationnelle)
    }else{
      
      this.setDirection(this.uniteOrganisationnelle, this.currentDossierConge.id)
     // this.afficherUniteOrganisationnellesInferieuresDansSelect(this.uniteOrganisationnelle)
    }      
    }, (err) => {
    },() => {        
    });
  }


  filterUniteOrg(uniteOrg: string) {
    return this.uniteOrganisationnelles.filter(uniteOrganisationnelle =>
      uniteOrganisationnelle.nom.toLowerCase().indexOf(uniteOrg.toLowerCase()) === 0||
      uniteOrganisationnelle.description.toLowerCase().indexOf(uniteOrg.toLowerCase()) === 0);
  }


  filterAgent(agentp: string) {
    return this.agentsOfUnite.filter(agent =>
      agent.nom.toLowerCase().indexOf(agentp.toLowerCase()) === 0||
      agent.prenom.toLowerCase().indexOf(agentp.toLowerCase()) === 0);
  }



  getUniteOrganisationnelleSuperieure() {
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1) {
      this.uniteSuperieureAgent = this.uniteOrganisationnelle;
    } else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id).subscribe(response => {
          this.uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = this.uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        }, err => { },
          () => {
        
          })
    }
  }

  getUniteOrganisationnellesInferieures(unite: UniteOrganisationnelle) {
    this.uniteOrganisationnelleService.getAllInferieures(unite.id).subscribe(response => {
      this.uniteOrganisationnelleInferieures = response.body;
      this.uniteOrganisationnelleInferieures.unshift(unite);
      this.uniteOrganisationnelleInferieures.forEach(u => {
        if  (this.hasAnyRole(['DASHBOARD_ABSENCE']) ) {
          this.getAbsencesByUniteOrg(u);
          this.getAbsencesByUniteOrgAnneePrecedende(u);
        }
       
        if  (this.hasAnyRole(['DASHBOARD_INTERIM']) ) {
          this.getInterimByUniteOrg(u);
          this.getInterimByUniteOrgAnneePrecedent(u);
        }
       
      });
      if  (this.hasAnyRole(['DASHBOARD_CONGE']) ) {
        this.getDossierConges();
      }
    }, (err) => {
    }, () => { 
    });
  }

  getAbsencesUniteOrganisationnellesInferieures(unite: UniteOrganisationnelle) {
    this.uniteOrganisationnelleService.getAllInferieures(unite.id).subscribe(response => {
      this.uniteOrganisationnelleInferieures = response.body;
      this.uniteOrganisationnelleInferieures.unshift(unite);
      this.uniteOrganisationnelleInferieures.forEach(u => {
        this.getAbsencesByUniteOrg(u);
      });
    }, (err) => {
    }, () => { 
    });
  }

  getInterimsUniteOrganisationnellesInferieures(unite: UniteOrganisationnelle) {
    this.uniteOrganisationnelleService.getAllInferieures(unite.id).subscribe(response => {
      this.uniteOrganisationnelleInferieures = response.body;
      this.uniteOrganisationnelleInferieures.unshift(unite);
      this.uniteOrganisationnelleInferieures.forEach(u => {
        this.getInterimByUniteOrg(u);
      });
    }, (err) => {
    }, () => { 
      
    });
  }

  afficherUniteOrganisationnellesInferieuresDansSelect(unite: UniteOrganisationnelle) {
    this.uniteOrganisationnelleService.getAllInferieures(unite.id).subscribe(response => {
      this.uniteOrganisationnelleInferieures = response.body;
      this.uniteOrganisationnelleInferieures.unshift(unite);
      this.uniteOrganisationnelleInferieures.forEach(u => {
      });
    }, (err) => {
    }, () => {
      this.filteredUniteOrganisationnelles = this.uniteOrganisationnelleCtrl.valueChanges.pipe(        
        startWith(''), map(uniteOrganisationnelle => uniteOrganisationnelle ? this.filterUniteOrg(uniteOrganisationnelle) : this.uniteOrganisationnelleInferieures.slice())
      
        );
    });
  }

  afficherDirectionsDansSelect(unite: UniteOrganisationnelle) {
    this.uniteOrganisationnelleService.getAll().subscribe(response => {
      this.toutesLesUniteOrganisationnelleInferieures = response.body;
      this.toutesLesUniteOrganisationnelleInferieures.unshift(unite);
      this.toutesLesUniteOrganisationnelleInferieures.forEach(u => {
        if (u.niveauHierarchique.position===1){
          this.directions.push(u)
        }
      });
      }, (err) => {
      }, () => {     
      this.filteredDirection = this.directionCtrl.valueChanges.pipe(        
        startWith(''), map(uniteOrganisationnelle => uniteOrganisationnelle ? this.filterUniteOrg(uniteOrganisationnelle) : this.directions.slice())
      
        );
    });
  }
  afficherAgentsDansSelect(unite: UniteOrganisationnelle) {
    console.log("afficherAgentsDansSelect")
    this.agentsOfUnite=[]
    this.agentCtrl.reset

    this.agentService.getAllByUniteOrganisationnelle(unite.id).subscribe(response => {      
    this.agentsOfUnite=response.body;

      }, (err) => {
      }, () => { 
            
      this.filteredAgent = this.agentCtrl.valueChanges.pipe(        
        startWith(''), map(agent => agent ? this.filterAgent(agent) : this.agentsOfUnite.slice())      
      );
    });
  }

  getAbsencesByUniteOrg(unite: UniteOrganisationnelle) {

    this.absenceService.getAbsencesByUniteOrgAndAnnee(unite.id, this.anneeSelected).subscribe((response => {
      this.absences = response.body;
      this.absences.forEach(a => {
        this.absenceStructure.push(a);
        this.moisAbsence.push(new Date(a.dateDepart).getMonth());
      });
      for (let i = 0; i < this.listMois.length; i++) {
        let moisAbsenceTmp = this.moisAbsence.filter(a => a === i);
        this.absenceMap.set(this.listMois[i], moisAbsenceTmp.length);
      }
    }), (err) => {
    }, () => {
    });
  }

  getAbsencesAgent(agent: Agent) {
    console.log("getAbsencesAgent")
    //this.moisAbsence=[]
    this.absenceService.getAbsencesByAgent(agent.id).subscribe((response => {
      this.absences = response.body;
      this.absences.forEach(a => {
        this.absenceStructure.push(a);
        this.moisAbsence.push(new Date(a.dateDepart).getMonth());
      });

      console.log("absenceStructure length "+this.absenceStructure.length)
      console.log("moisAbsence length "+this.moisAbsence.length)
      for (let i = 0; i < this.listMois.length; i++) {
        let moisAbsenceTmp = this.moisAbsence.filter(a => a === i);
        this.absenceMap.set(this.listMois[i], moisAbsenceTmp.length);
        console.log("moisAbsenceTmp "+moisAbsenceTmp.length)
      }
      this.dessignerGaph();
    }), (err) => {
    }, () => {
    });
  }


  getInterimsAgent(agent: Agent) {
    console.log("getInterimsAgent")
    this.moisInterim=[]
    this.interimService.getInterimsByAgent(agent.id).subscribe((response => {
      this.interims = response.body;
      this.interims.forEach(a => {
        this.interimStructure.push(a);
        this.moisInterim.push(new Date(a.dateDepart).getMonth());
      });
      for (let i = 0; i < this.listMois.length; i++) {
        let moisTmp = this.moisInterim.filter(a => a === i);
        this.interimMap.set(this.listMois[i], moisTmp.length);
      }
      this.dessignerGaph();
    }), (err) => {
    }, () => {
    });
  }



  getCongesAgent(agent: Agent) {
    console.log("getCongesAgent")
    this.moisConge=[]
    this.congeService.getCongeByIdAgent(agent.id).subscribe((response => {
      this.conges = response.body;
      this.conges.forEach(a => {
        this.congeStructure.push(a);
        this.moisConge.push(new Date(a.dateDepart).getMonth());
      });
      for (let i = 0; i < this.listMois.length; i++) {
        let moisTmp = this.moisConge.filter(a => a === i);
        this.congeMap.set(this.listMois[i], moisTmp.length);
      }
      this.dessignerGaph();
    }), (err) => {
    }, () => {
    });
  }

  getAbsencesByUniteOrgAnneePrecedende(unite: UniteOrganisationnelle) {
    this.absenceService.getAbsencesByUniteOrgAndAnnee(unite.id, this.anneeSelected - 1).subscribe((response => {
      this.absences2 = response.body;
      this.absences2.forEach(a => {
        this.absenceStructure2.push(a);
        this.moisAbsence2.push(new Date(a.dateDepart).getMonth());
      });
      for (let i = 0; i < this.listMois.length; i++) {
        let moisTmp = this.moisAbsence2.filter(a => a === i);
        this.absenceMap2.set(this.listMois[i], moisTmp.length);
      }
    }), (err) => {
    }, () => {

    });
  }

  getInterimByUniteOrg(unite: UniteOrganisationnelle) {
    
    this.interimService.getInterimByUnORGAndAnnee(unite.id, this.anneeSelected).subscribe((data) => {
      this.interims = data.body;
      this.interims.forEach(i => {
        this.interimStructure.push(i);
        this.moisInterim.sort().push(new Date(i.dateDepart).getMonth());
      })
      for (let k = 0; k < this.listMois.length; k++) {
        let moisInterimTmp = this.moisInterim.filter(t => t === k);
        this.interimMap.set(this.listMois[k], moisInterimTmp.length);
      }    
    }), (err) => {
    }, () => {
    }
  }

  getInterimByUniteOrgAnneePrecedent(unite: UniteOrganisationnelle) {
    this.interimService.getInterimByUnORGAndAnnee(unite.id, this.anneeSelected-1).subscribe((data) => {
      this.interims2 = data.body;
      this.interims2.forEach(i => {
        this.interimStructure2.push(i);
        this.moisInterim2.sort().push(new Date(i.dateDepart).getMonth());
      })
      for (let k = 0; k < this.listMois.length; k++) {
        let moisInterimTmp = this.moisInterim2.filter(t => t === k);
        this.interimMap2.set(this.listMois[k], moisInterimTmp.length);
      }
      this.dessignerGaphAnneePasse();
    }), (err) => {
    }, () => {

    }
  }

  getDossierConges() {
    this.dossierCongeService.getByAnnee(this.anneeSelected.toString()).subscribe(
      (response) => {
        this.currentDossierConge = response.body;
        if (this.currentDossierConge != null) {
          this.getPlanningDirection(this.currentDossierConge.id);
        }
      }, (err) => {
      }, () => {

      });
  }


/**
 * Recupere le planning direction de la 
*/
  getPlanningDirection(idDossierConge: number) {
    console.log("idDossierConge "+idDossierConge)
    console.log(this.uniteSuperieureAgent)
    this.planningDirectionService.getByCodeDirectionAndDossierConge(this.uniteSuperieureAgent.code, idDossierConge)
      .subscribe(response => {
        this.currentPlanningDirection = response.body;///recupere le planning direction
        this.getUniteOrganisationnellesInferieures0(this.uniteOrganisationnelle);//recupere sous structure et leur planning conge
      }, err =>{
      }, ()  =>{
    });
  }


/**
 * fonction qui permet de recuperer les conges enregistres dans la structure selected ainsi que ses sous structure
 */
  setUniteOrganisationnelle(uniteOrganisationnelle2: UniteOrganisationnelle,idDossierConge: number) { 

    this.afficherAgentsDansSelect(uniteOrganisationnelle2)// afficher les agents de l'unite selected
    idDossierConge=this.currentDossierConge.id//recuperer le dossier conge de ****** A FAIRE courant  ****    
    this.congeStructure =[];//vide table conge
    this.absenceStructure =[];//vide table absence
    this.interimStructure =[];//vide table interim       
    this.absenceStructure =[];//empty table absence
    this.moisAbsence=[];//empty this.moisAbsence
    this.moisConge=[];//empty this.moisConge
    this.moisInterim=[];//empty this.moisInterim pour graphe
    this.uniteOrganisationnelleSelected = uniteOrganisationnelle2;
    if  ( this.hasAnyRole(['DASHBOARD_ABSENCE']) ) {
       this.getAbsencesUniteOrganisationnellesInferieures(this.uniteOrganisationnelleSelected);//recupere mes absences d'un unite org et de ses sous structures
    }
    if  ( this.hasAnyRole(['DASHBOARD_INTERIM']) ) {
        this.getInterimsUniteOrganisationnellesInferieures(this.uniteOrganisationnelleSelected);//recupere interim d'une unite org et de ses sous structures
    }
    if  (this.hasAnyRole(['DASHBOARD_CONGE']) ) {
    this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelleSelected.id).subscribe(response => {
    this.uniteOrganisationnelleSuperieuresOfUniteSelected = response.body;       
    }, err => {},
    () => {
        if (this.uniteOrganisationnelleSelected.niveauHierarchique.position === 1) {
          this.uniteSuperieurUniteSelected = uniteOrganisationnelle2;
        }else{//a des superieur
          this.uniteSuperieurUniteSelected = this.uniteOrganisationnelleSuperieuresOfUniteSelected.find(e => e.niveauHierarchique.position === 1);
        } 

        this.planningDirectionService.getByCodeDirectionAndDossierConge(this.uniteSuperieurUniteSelected.code, idDossierConge)//recupere le planning conge lié a l'unite selectionne
          .subscribe(response => {
            this.PlanningDirectionUniteSelected = response.body;//recupere le planning direction de l'unité selectionne
            this.getUniteOrganisationnellesInferieures1(this.uniteOrganisationnelleSelected);// lance la recuperation du planning direction de l'unite selectionné
            }, err =>{
            }, ()  =>{
          });
        })

      }
  }  

  setAgent(agent,idDossierConge: number) { 

   // idDossierConge=28;  //recuperer le dossier conge de ****** A FAIRE courant  ****    
   idDossierConge=this.currentDossierConge.id
   /* this.congeStructure =[];//vide table conge
    this.absenceStructure =[];//vide table absence
    this.interimStructure =[];//vide table interim
       
    this.absenceStructure =[];//empty table absence
    this.moisAbsence=[];//empty this.moisAbsence
    this.moisConge=[];//empty this.moisConge
    this.moisInterim=[];//empty this.moisInterim pour graphe*/


    this.congeStructure =[];//vide table conge
    this.absenceStructure =[];//vide table absence
    this.interimStructure =[];//vide table interim       
    this.absenceStructure =[];//empty table absence
    this.moisAbsence=[];//empty this.moisAbsence
    this.moisConge=[];//empty this.moisConge
    this.moisInterim=[];//empty this.moisInterim pour graphe


    if  (this.hasAnyRole(['DASHBOARD_ABSENCE']) ) {
      this.getAbsencesAgent(agent);//recupere les absences de l'agent selected
    }
    if  (this.hasAnyRole(['DASHBOARD_INTERIM']) ) {
      this.getInterimsAgent(agent);//recupere les interims de l'agent selected 
    }
    if  (this.hasAnyRole(['DASHBOARD_CONGE']) ) {
      this.getCongesAgent(agent);//recupere les conges de l'agent selected
    }

  }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }

  setDirection(unite: UniteOrganisationnelle, idDossierConge:number) { 
    this.uniteOrganisationnelleSelected=unite;
    console.log("uniteSuperieurUniteSelected "+this.uniteOrganisationnelleSelected.nom +" "+this.uniteOrganisationnelleSelected.code)

    this.afficherUniteOrganisationnellesInferieuresDansSelect(unite)
    console.log("uniteSuperieurUniteSelected "+this.uniteOrganisationnelleSelected.nom +" "+this.uniteOrganisationnelleSelected.code)
    this.setUniteOrganisationnelle(unite,idDossierConge)
    console.log("apres set  "+this.uniteOrganisationnelleSelected.nom +" "+this.uniteOrganisationnelleSelected.code)
  }

/*
*recupere les sous structures d'une unite et pour chaque sous structure recupere son planning conge*
*/
  getUniteOrganisationnellesInferieures0(unite: UniteOrganisationnelle) {
    this.uniteOrganisationnelleService.getAllInferieures(unite.id).subscribe(response => {
      this.uniteOrganisationnelleInferieures = response.body;
      this.uniteOrganisationnelleInferieures.unshift(unite);
    }, err =>{
    }, () => {
      this.uniteOrganisationnelleInferieures.forEach(u => {
        this.getPlanningCongeByPlanningDirectionAndUniteOrganisationnelle(this.currentPlanningDirection, u);
      })
    });
  }


  /**
   * recupere les conges pour l'unite selected
   * @param unite 
   */
  getUniteOrganisationnellesInferieures1(unite: UniteOrganisationnelle) { 
    
    this.uniteOrganisationnelleService.getAllInferieures(unite.id).subscribe(response => {
      this.uniteOrganisationnelleInferieuresOfUniteSelected = response.body;
      this.uniteOrganisationnelleInferieuresOfUniteSelected.unshift(unite);
    }, err =>{
    }, () => {
      this.uniteOrganisationnelleInferieuresOfUniteSelected.forEach(u => {
        this.getPlanningCongeByPlanningDirectionAndUniteOrganisationnelle2(this.PlanningDirectionUniteSelected, u);
      })
    });
  }

  /** 
   * recupere tous les planning conge à partir d'un planning conge et pour chaque planning conge recupere les conges qui s'y trouve
  */
  getPlanningCongeByPlanningDirectionAndUniteOrganisationnelle(planningDirection: PlanningDirection, unite: UniteOrganisationnelle) {
    console.log("getAllByPlanningDirectionAndUniteOrganisationnelle")
    this.planningService.getAllByPlanningDirectionAndUniteOrganisationnelle(planningDirection.id, unite.id).subscribe(
      (response) => {
        this.planningConges = response.body;
        this.planningConges.forEach(p => {
          this.getCongesByPlanning(p);
        })
      }, err => {
      }, () => {

      }
    );
  }

  getPlanningCongeByPlanningDirectionAndUniteOrganisationnelle2(planningDirectionSelected: PlanningDirection, unite: UniteOrganisationnelle) {
   
    this.planningService.getAllByPlanningDirectionAndUniteOrganisationnelle(planningDirectionSelected.id, unite.id).subscribe(
      (response) => {
        this.PlanningCongeOfUniteSelected = response.body;
       
        if (this.PlanningCongeOfUniteSelected.length != 0) {

          this.PlanningCongeOfUniteSelected.forEach(p => {
          console.log("p "+p)
          this.getCongesByPlanning(p);
        })
       }else{        
        this.congeMap.clear();       
        this.dessignerGaph();
       }
        
      }, err => {
      }, () => {

      }
    );
  }

/**
 * recupere la liste des conges qui se trouvent dans un planning conge 
 */
  getCongesByPlanning(planning: PlanningConge) {

   
    this.congeService.getAllByIdPlanningCongeAndAnnee(planning.id, this.anneeSelected.toString()).subscribe((data) => {
      this.conges = data.body;
      this.planningConges.unshift(planning);
      this.conges.forEach(c => {
        this.congeStructure.push(c);
        this.moisConge.sort().push(new Date(c.dateDepart).getMonth());
      })      
      
      for (let j = 0; j < this.listMois.length; j++) {
        let moisCongeTmp = this.moisConge.filter(g => g === j);        
        this.congeMap.set(this.listMois[j], moisCongeTmp.length);
        console.log("moisCongeTmp.length "+ moisCongeTmp.length )
      }      
      this.dessignerGaph();
    }, (err) => {
    }, () => {

    });
  }

  getCongesByPlanningAnneePrecedende(planning: PlanningConge) {
    this.congeService.getAllByIdPlanningCongeAndAnnee(planning.id, (this.anneeSelected - 1).toString()).subscribe((data) => {
      this.conges2 = data.body;
      this.planningConges.unshift(planning);
      this.conges2.forEach(c => {
        this.congeStructure2.push(c);
        this.moisConge2.sort().push(new Date(c.dateDepart).getMonth());
      })
      for (let j = 0; j < this.listMois.length; j++) {
        let moisCongeTmp = this.moisConge2.filter(g => g === j);
        this.congeMap2.set(this.listMois[j], moisCongeTmp.length);
      }
      this.dessignerGaphAnneePasse( );
    }, (err) => {
    }, () => {

    }
    );
  }

  filterDashboard(annee: number) {
    this.absenceMap.clear();
    this.congeMap.clear();
    this.interimMap.clear();

    this.moisInterim = [];
    this.interims = [];
    this.interimStructure = [];

    this.moisAbsence = [];
    this.absences = [];
    this.absenceStructure = [];

    this.moisConge = [];
    this.conges = [];
    this.congeStructure = [];

    this.lineChartData = [
      { data: [], label: 'CONGES', borderColor: '#008000' },
      { data: [], label: 'ABSENCES', borderColor: '#086A87' },
      { data: [], label: 'INTERIMS', borderColor: '#0040FF' }];

    this.filtrerInterimByAnnee(annee);
    this.filtrerInterimByAnneePrecedente(annee - 1);
    this.filterAbsenceByAnnee(annee);
    this.filterAbsenceByAnneePrecedente(annee - 1);
    this.filterCongeByAnnee(annee);
    this.filterCongeByAnneePrecedente(annee - 1); 
  }


  filterDashboard2(annee: number) {
    this.absenceMap.clear();
    this.congeMap.clear();
    this.interimMap.clear();

    this.moisInterim = [];
    this.interims = [];
    this.interimStructure = [];

    this.moisAbsence = [];
    this.absences = [];
    this.absenceStructure = [];

    this.moisConge = [];
    this.conges = [];
    this.congeStructure = [];

    this.lineChartData = [
      { data: [], label: 'CONGES', borderColor: '#008000' },
      { data: [], label: 'ABSENCES', borderColor: '#086A87' },
      { data: [], label: 'INTERIMS', borderColor: '#0040FF' }];

    this.filtrerInterimByAnnee(annee);
    this.filtrerInterimByAnneePrecedente(annee - 1);
    this.filterAbsenceByAnnee(annee);
    this.filterAbsenceByAnneePrecedente(annee - 1);
    this.filterCongeByAnnee(annee);
    this.filterCongeByAnneePrecedente(annee - 1); 
  }

  filtrerInterimByAnnee(annee: number) {
    let moisInterimTmp: any[] = [];
    this.uniteOrganisationnelleInferieures.forEach(u => {
      this.interimService.getInterimByUnORGAndAnnee(u.id, annee).subscribe((data) => {
        this.interims = data.body;
        this.interims.forEach(i => {
          this.interimStructure.push(i);
          this.moisInterim.sort().push(new Date(i.dateDepart).getMonth());
        })
        for (let k = 0; k < this.listMois.length; k++) {
          moisInterimTmp = this.moisInterim.filter(m => m === k);
          this.interimMap.set(this.listMois[k], moisInterimTmp.length);
        }
      }), (err) => {
      }, () => {

      }})  
  }

  filtrerInterimByAnneePrecedente(annee: number) {
    this.interims2 = [];
    this.interimStructure2 = [];
    this.interimMap2.clear();
    let moisInterimTmp: any[] = [];
    let moisInterimAnneePrecedente: any[] = [];
    this.uniteOrganisationnelleInferieures.forEach(u => {
      this.interimService.getInterimByUnORGAndAnnee(u.id, annee).subscribe((data) => {
        this.interims2 = data.body;
        this.interims2.forEach(i => {
          this.interimStructure2.push(i);
          moisInterimAnneePrecedente.sort().push(new Date(i.dateDepart).getMonth());
        })
        for (let k = 0; k < this.listMois.length; k++) {
          moisInterimTmp = moisInterimAnneePrecedente.filter(m => m === k);
          this.interimMap2.set(this.listMois[k], moisInterimTmp.length);
        }
      }), (err) => {
      }, () => {
      }
    })
    
  }

  filterAbsenceByAnnee(annee: number) {
    let moisAbsenceTmp: any[] = [];
    this.uniteOrganisationnelleInferieures.forEach(u => {
      this.absenceService.getAbsencesByUniteOrgAndAnnee(u.id, annee).subscribe((data) => {
        this.absences = data.body;
        this.absences.forEach(a => {
          this.absenceStructure.push(a);
          this.moisAbsence.sort().push(new Date(a.dateDepart).getMonth());
        })
        for (let k = 0; k < this.listMois.length; k++) {
          moisAbsenceTmp = this.moisAbsence.filter(m => m === k);
          this.absenceMap.set(this.listMois[k], moisAbsenceTmp.length);
        } 
      }), (err) => {
      }, () => {

      }
    }) 
  }

  filterAbsenceByAnneePrecedente(annee: number) {
    let moisAbsenceTmp: any[] = [];
    this.absences2 = [];
    this.absenceStructure2 = [];
    this.absenceMap2.clear();
    this.moisAbsence2 = [];
    this.uniteOrganisationnelleInferieures.forEach(u => {
      this.absenceService.getAbsencesByUniteOrgAndAnnee(u.id, annee).subscribe((data) => {
        this.absences2 = data.body;
        this.absences2.forEach(a => {
          this.absenceStructure2.push(a);
          this.moisAbsence2.sort().push(new Date(a.dateDepart).getMonth());
        })
        for (let k = 0; k < this.listMois.length; k++) {
          moisAbsenceTmp = this.moisAbsence2.filter(m => m === k);
          this.absenceMap2.set(this.listMois[k], moisAbsenceTmp.length);
        }
      }), (err) => {
      }, () => {

      }
    })
  }

  filterCongeByAnnee(annee: number) {
    let moisCongeTmp: any[] = [];
    this.planningConges.forEach(p => {
      this.congeService.getAllByIdPlanningCongeAndAnnee(p.id, annee.toString()).subscribe((data) => {
        this.conges = data.body;
        this.conges.forEach(c => {
          this.congeStructure.push(c);
          this.moisConge.sort().push(new Date(c.dateDepart).getMonth());
        })
        for (let k = 0; k < this.listMois.length; k++) {
          moisCongeTmp = this.moisConge.filter(mc => mc === k);
          this.congeMap.set(this.listMois[k], moisCongeTmp.length);
        }
        this.dessignerGaph();   
      }), (err) => {
      }, () => {
        
      }
    })
  }

  filterCongeByAnneeAndStructure(annee: number, idUnite: number) {
    let moisCongeTmp: any[] = [];
    this.planningConges.forEach(p => {
      this.congeService.getAllByIdPlanningCongeAndAnneeAndStructure(p.id, annee.toString(), idUnite).subscribe((data) => {
        this.conges = data.body;
        this.conges.forEach(c => {
          this.congeStructure.push(c);
          this.moisConge.sort().push(new Date(c.dateDepart).getMonth());
        })
        for (let k = 0; k < this.listMois.length; k++) {
          moisCongeTmp = this.moisConge.filter(mc => mc === k);
          this.congeMap.set(this.listMois[k], moisCongeTmp.length);
        }
        this.dessignerGaph();   
      }), (err) => {
      }, () => {
        
      }
    })
  }

  filterCongeByAnneePrecedente(annee: number) {
    let moisCongeTmp: any[] = [];
    this.conges2 = [];
    this.congeStructure2 = [];
    this.moisConge2 = [];
    this.congeMap2.clear();
    this.planningConges.forEach(p => {
      this.congeService.getAllByIdPlanningCongeAndAnnee(p.id, annee.toString()).subscribe((data) => {
        this.conges2 = data.body;
        this.conges2.forEach(c => {
          this.congeStructure2.push(c);
          this.moisConge2.sort().push(new Date(c.dateDepart).getMonth());
        })
        for (let k = 0; k < this.listMois.length; k++) {
          moisCongeTmp = this.moisConge2.filter(mc => mc === k);
          this.congeMap2.set(this.listMois[k], moisCongeTmp.length);
        }
        this.dessignerGaphAnneePasse();
      }), (err) => {
      }, () => {

      }
    })
  }

  dessignerGaph() {
    this.lineChartData = [
      { data: Array.from(this.congeMap.values()), label: 'CONGES', borderColor: '#008000' },
      { data: Array.from(this.absenceMap.values()), label: 'ABSENCES', borderColor: '#086A87' },
      { data: Array.from(this.interimMap.values()), label: 'INTERIMS', borderColor: '#0040FF' }
    ];
  }

  dessignerGaphAnneePasse() {
    this.lineChartData2 = [
      { data: Array.from(this.congeMap2.values()), label: 'CONGES', borderColor: '#008000' },
      { data: Array.from(this.absenceMap2.values()), label: 'ABSENCES', borderColor: '#086A87' },
      { data: Array.from(this.interimMap2.values()), label: 'INTERIMS', borderColor: '#0040FF' }
    ];
  }


}