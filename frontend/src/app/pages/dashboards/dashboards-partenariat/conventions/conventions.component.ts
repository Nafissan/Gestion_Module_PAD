import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartData, ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable, ReplaySubject } from 'rxjs';
import { Compte } from 'src/app/pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from 'src/app/pages/gestion-utilisateurs/shared/services/compte.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DonutChartWidgetOptions } from '../../../dashboard/widgets/donut-chart-widget/donut-chart-widget-options.interface';
import { DashboardsService } from '../../../../shared/services/dashboards.service'
import { Partenaire } from 'src/app/pages/gestion-partenariat/shared/model/partenaire.model';
import { PartenaireService } from 'src/app/pages/gestion-partenariat/shared/service/partenaire.service';
import { map, startWith } from 'rxjs/operators';
import { Convention } from 'src/app/pages/gestion-partenariat/shared/model/convention.model';
import { ConventionService } from 'src/app/pages/gestion-partenariat/shared/service/convention.service';
import { ActiviteService } from 'src/app/pages/gestion-activite/shared/service/activite.service';
import { Activite } from 'src/app/pages/gestion-activite/shared/model/activite.model';
import * as _moment from "moment";
import { default as _rollupMoment, Moment } from "moment";
import { MatDatepicker } from '@angular/material/datepicker';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: "YYYY",
  },
  display: {
    dateInput: "YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
@Component({
  selector: 'fury-conventions',
  templateUrl: './conventions.component.html',
  styleUrls: ['./conventions.component.scss', "../../../../shared/util/bootstrap4.css"],
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
export class ConventionsComponent implements OnInit {
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    { name: "Code ", property: "code", visible: false, isModelProperty: true },
    { name: "Nom ", property: "nom", visible: true, isModelProperty: true },
    { name: "Email", property: "email", visible: true, isModelProperty: true },
    { name: "Telephone", property: "telephone", visible: false, isModelProperty: true },
    { name: "Adresse", property: "adresse", visible: true, isModelProperty: true },
    { name: "Fax", property: "fax", visible: false, isModelProperty: true },
    { name: "SiteWeb", property: "siteWeb", visible: false, isModelProperty: true },
    { name: "Prenom Representant", property: "representantPrenom", visible: false, isModelProperty: true },
    { name: "Nom Representant", property: "representantNom", visible: false, isModelProperty: true },
    { name: "Email Representant", property: "representantEmail", visible: false, isModelProperty: true },
    { name: "Telephone Representant", property: "representantTelephone", visible: false, isModelProperty: true },
    { name: "Statut", property: "statut", visible: false, isModelProperty: true },
    { name: "Ville", property: "ville", visible: false, isModelProperty: true },
    { name: "Active", property: "active", visible: false, isModelProperty: true },
    { name: "Statut", property: "partenaire", visible: true, isModelProperty: true },
    { name: "Actions", property: "action", visible: true },
  ] as ListColumn[];

  currentYear: number = new Date().getFullYear();
  username: string;
  @ViewChild(MatDatepicker) picker;
  dateSelectedCtrl = new FormControl(moment());
  labelMap: Map<string, number> = new Map();
  partenaireMap: Map<string, number> = new Map();
  range: FormGroup;
  compte: Compte;
  mode: "create" | "update" = "create";
  listconventions: Convention[];
  listactivites: Activite[];
  partenaires: Partenaire[];
  partenaire: Partenaire;
  listpartenaire: Partenaire[];
  listprospect: Partenaire[];
  filterePartenaire: Observable<any[]>;
  partenaireCtrl: FormControl = new FormControl();
  anneeSelected = new Date().getFullYear();
  filtereActivite: Observable<any[]>;
  activiteCtrl: FormControl = new FormControl();
  conventions: Convention[];
  activites: Activite[];
  activite: Activite;
  convention: Convention;
  filtereConvention: Observable<any[]>;
  conventionCtrl: FormControl = new FormControl();
  subject$: ReplaySubject<Convention[]> = new ReplaySubject<Convention[]>(
    1
  );
  subjec$: ReplaySubject<Activite[]> = new ReplaySubject<Activite[]>(
    1
  );
  subj$: ReplaySubject<Partenaire[]> = new ReplaySubject<Partenaire[]>(
    1
  );
  sub$: ReplaySubject<Partenaire[]> = new ReplaySubject<Partenaire[]>(
    1
  );
  donutActionsData$: Observable<ChartData>;
  donutOptions: DonutChartWidgetOptions = {
    title: 'Actions',
    subTitle: 'Réalisation des activités'
  };
  parJanv: number = 0;
  parFev: number = 0;
  parMars: number = 0;
  parAvr: number = 0;
  parMai: number = 0;
  parJuin: number = 0;
  parJuil: number = 0;
  parAout: number = 0;
  parSept: number = 0;
  parOct: number = 0;
  parNov: number = 0;
  parDec: number = 0;


  prosJanv: number = 0;
  prosFev: number = 0;
  prosMars: number = 0;
  prosAvr: number = 0;
  prosMai: number = 0;
  prosJuin: number = 0;
  prosJuil: number = 0;
  prosAout: number = 0;
  prosSept: number = 0;
  prosOct: number = 0;
  prosNov: number = 0;
  prosDec: number = 0;


  conJanv: number = 0;
  conFev: number = 0;
  conMars: number = 0;
  conAvr: number = 0;
  conMai: number = 0;
  conJuin: number = 0;
  conJuil: number = 0;
  conAout: number = 0;
  conSept: number = 0;
  conOct: number = 0;
  conNov: number = 0;
  conDec: number = 0;


  atJanv: number = 0;
  atFev: number = 0;
  atMars: number = 0;
  atAvr: number = 0;
  atMai: number = 0;
  atJuin: number = 0;
  atJuil: number = 0;
  atAout: number = 0;
  atSept: number = 0;
  atOct: number = 0;
  atNov: number = 0;
  atDec: number = 0;


  lineChartData: ChartDataSets[] = [
    {
      label: 'Partenaire', backgroundColor: 'green',
      data: []
    },
    {
      label: 'Convention', backgroundColor: 'primary',
      data: []
    },
    {
      label: 'Prospect', backgroundColor: 'red',
      data: []
    },
    {
      label: 'Activites', backgroundColor: 'blue',
      data: []
    }
  ];
  lineChartLabels: Label[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai',
    'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];




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
  lineChartType = 'bar';

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

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dashboardsService: DashboardsService,
    private partenaireService: PartenaireService,
    private activiteService: ActiviteService,
    private conventionService: ConventionService,
  ) { }

  ngOnInit() {

    this.donutActionsData$ = this.dashboardsService.getActionsChartData();

    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });

    this.getPartenaire();
    this.getConvention();
    this.getActivite();
    this.getData(this.currentYear)

  }

  filterPartenaire(name: string) {
    return this.partenaires.filter(partenaire =>
      partenaire.nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  filterConvention(name: string) {
    return this.conventions?.filter(convention =>
      convention.libelle.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  
  filterActivite(name: string) {
    return this.activites?.filter(activite =>
      activite.libelle.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  getPartenaire() {
    this.partenaireService.getAll().subscribe(
      (response) => {
        this.partenaires = response.body;

      }, err => {


      }, () => {

        this.filterePartenaire = this.partenaireCtrl.valueChanges.pipe(
          startWith(''),
          map(partenaire => partenaire ? this.filterPartenaire(partenaire) : this.partenaires.slice())
        );

        this.listpartenaire = this.partenaires.filter(partenaire =>
          partenaire.partenaire == true);
        this.getProspectByAnnee(this.currentYear);
        this.listprospect = this.partenaires.filter(partenaire =>
          partenaire.partenaire == false);
        this.getPartenaireByAnnee(this.currentYear);


      }
    );
  }
  getConvention() {
    this.conventionService.getAll().subscribe(
      (response) => {
        this.conventions = response.body;
      }, err => {

      }, () => {
        this.filtereConvention = this.conventionCtrl.valueChanges.pipe(
          startWith(''),
          map(convention => convention ? this.filterConvention(convention) : this.conventions.slice())
        );
        this.getConventionByAnnee(this.currentYear);
      }
    );
  }
  getActivite() {
    this.activiteService.getAll().subscribe(
      (response) => {
        this.activites = response.body;
      }, err => {

      }, () => {
        this.getActiviteByAnnee(this.currentYear);
      }
    );
  }
  setConvention(convention) {
    this.convention = convention
  }
  setPartenaire(partenaire) {
    this.partenaire = partenaire
  }
  yearSelected(params) {
    console.log(params);

    this.dateSelectedCtrl.setValue(params);
    this.anneeSelected = params.year();
    this.picker.close()

    this.getData(this.anneeSelected);

  }

  getData(yearSelected){
    this.getConventionByAnnee(yearSelected);
    this.getActiviteByAnnee(yearSelected);
    this.getPartenaireByAnnee(yearSelected);
    this.getProspectByAnnee(yearSelected);
  }

  getConventionByAnnee(annee: number) {
    if(annee>=this.currentYear){
      this.listconventions = this.conventions?.filter(a => new Date(a?.dateFin)?.getFullYear() >= annee)

      // Conventions du moi de janvier
      const date = new Date(annee, 0, 1);

      this.conJanv = this.listconventions?.filter( a => new Date(a?.dateFin) >= new Date(annee, 0, 31))?.length
      this.conFev = this.listconventions?.filter(  a => new Date(a?.dateFin) >= new Date(annee, 1, 28))?.length
      this.conMars = this.listconventions?.filter( a => new Date(a?.dateFin) >= new Date(annee, 2, 30))?.length
      this.conAvr = this.listconventions?.filter(  a => new Date(a?.dateFin) >= new Date(annee, 3, 30))?.length
      this.conMai = this.listconventions?.filter(  a => new Date(a?.dateFin) >= new Date(annee, 4, 30))?.length
      this.conJuin = this.listconventions?.filter( a => new Date(a?.dateFin) >= new Date(annee, 5, 30))?.length
      this.conJuil = this.listconventions?.filter( a => new Date(a?.dateFin) >= new Date(annee, 6, 30))?.length
      this.conAout = this.listconventions?.filter( a => new Date(a?.dateFin) >= new Date(annee, 7, 30))?.length
      this.conSept = this.listconventions?.filter( a => new Date(a?.dateFin) >= new Date(annee, 8, 30))?.length
      this.conOct = this.listconventions?.filter(  a => new Date(a?.dateFin) >= new Date(annee, 9, 30))?.length
      this.conNov = this.listconventions?.filter(  a => new Date(a?.dateFin) >= new Date(annee, 10, 30))?.length
      this.conDec = this.listconventions?.filter(  a => new Date(a?.dateFin) >= new Date(annee, 11, 30))?.length
    }
    else{
      this.listconventions = this.conventions?.filter(a => new Date(a?.dateFin)?.getFullYear() <= annee)

      // Conventions du moi de janvier
      const date = new Date(annee, 0, 1);

      this.conJanv = this.listconventions?.filter( a => new Date(a?.dateFin) <= new Date(annee, 0, 31))?.length
      this.conFev = this.listconventions?.filter(  a => new Date(a?.dateFin) <= new Date(annee, 1, 28))?.length
      this.conMars = this.listconventions?.filter( a => new Date(a?.dateFin) <= new Date(annee, 2, 30))?.length
      this.conAvr = this.listconventions?.filter(  a => new Date(a?.dateFin) <= new Date(annee, 3, 30))?.length
      this.conMai = this.listconventions?.filter(  a => new Date(a?.dateFin) <= new Date(annee, 4, 30))?.length
      this.conJuin = this.listconventions?.filter( a => new Date(a?.dateFin) <= new Date(annee, 5, 30))?.length
      this.conJuil = this.listconventions?.filter( a => new Date(a?.dateFin) <= new Date(annee, 6, 30))?.length
      this.conAout = this.listconventions?.filter( a => new Date(a?.dateFin) <= new Date(annee, 7, 30))?.length
      this.conSept = this.listconventions?.filter( a => new Date(a?.dateFin) <= new Date(annee, 8, 30))?.length
      this.conOct = this.listconventions?.filter(  a => new Date(a?.dateFin) <= new Date(annee, 9, 30))?.length
      this.conNov = this.listconventions?.filter(  a => new Date(a?.dateFin) <= new Date(annee, 10, 30))?.length
      this.conDec = this.listconventions?.filter(  a => new Date(a?.dateFin) <= new Date(annee, 11, 30))?.length
    }

    this.lineChartData[1] =
      { label: 'Convention', backgroundColor: '#17A2B8', data: [this.conJanv, this.conFev, this.conMars, this.conAvr, this.conMai, this.conJuin, this.conJuil, this.conAout, this.conSept, this.conOct, this.conNov, this.conDec] };

    this.subject$.next(this.conventions);
  }
  getActiviteByAnnee(annee: number) {

    this.listactivites = this.activites?.filter(a => new Date(a?.date)?.getFullYear() == annee)


    this.atJanv = this.listactivites?.filter(a => new Date(a?.date)?.getMonth() == 0)?.length
    this.atFev = this.listactivites?.filter(a => new Date(a?.date)?.getMonth() == 1)?.length
    this.atMars = this.listactivites?.filter(a => new Date(a?.date)?.getMonth() == 2)?.length
    this.atAvr = this.listactivites?.filter(a => new Date(a?.date)?.getMonth() == 3)?.length
    this.atMai = this.listactivites?.filter(a => new Date(a?.date)?.getMonth() == 4)?.length
    this.atJuin = this.listactivites?.filter(a => new Date(a?.date)?.getMonth() == 5)?.length
    this.atJuil = this.listactivites?.filter(a => new Date(a?.date)?.getMonth() == 6)?.length
    this.atAout = this.listactivites?.filter(a => new Date(a?.date)?.getMonth() == 7)?.length
    this.atSept = this.listactivites?.filter(a => new Date(a?.date)?.getMonth() == 8)?.length
    this.atOct = this.listactivites?.filter(a => new Date(a?.date)?.getMonth() == 9)?.length
    this.atNov = this.listactivites?.filter(a => new Date(a?.date)?.getMonth() == 10)?.length
    this.atDec = this.listactivites?.filter(a => new Date(a?.date)?.getMonth() == 11)?.length

    this.lineChartData[3] =
      { label: 'Activités', backgroundColor: '#007AFE', data: [this.atJanv, this.atFev, this.atMars, this.atAvr, this.atMai, this.atJuin, this.atJuil, this.atAout, this.atSept, this.atOct, this.atNov, this.atDec] };
    this.subjec$.next(this.activites);


  }
  getPartenaireByAnnee(annee: number) {

    this.listpartenaire = this.partenaires?.filter(a => new Date(a?.dateApprobation)?.getFullYear() == annee && a.partenaire)


    this.parJanv = this.listpartenaire?.filter(a => new Date(a?.dateApprobation)?.getMonth() == 0)?.length
    this.parFev = this.listpartenaire?.filter(a => new Date(a?.dateApprobation)?.getMonth() == 1)?.length
    this.parMars = this.listpartenaire?.filter(a => new Date(a?.dateApprobation)?.getMonth() == 2)?.length
    this.parAvr = this.listpartenaire?.filter(a => new Date(a?.dateApprobation)?.getMonth() == 3)?.length
    this.parMai = this.listpartenaire?.filter(a => new Date(a?.dateApprobation)?.getMonth() == 4)?.length
    this.parJuin = this.listpartenaire?.filter(a => new Date(a?.dateApprobation)?.getMonth() == 5)?.length
    this.parJuil = this.listpartenaire?.filter(a => new Date(a?.dateApprobation)?.getMonth() == 6)?.length
    this.parAout = this.listpartenaire?.filter(a => new Date(a?.dateApprobation)?.getMonth() == 7)?.length
    this.parSept = this.listpartenaire?.filter(a => new Date(a?.dateApprobation)?.getMonth() == 8)?.length
    this.parOct = this.listpartenaire?.filter(a => new Date(a?.dateApprobation)?.getMonth() == 9)?.length
    this.parNov = this.listpartenaire?.filter(a => new Date(a?.dateApprobation)?.getMonth() == 10)?.length
    this.parDec = this.listpartenaire?.filter(a => new Date(a?.dateApprobation)?.getMonth() == 11)?.length

    this.lineChartData[0] =
      { label: 'Partenaires', backgroundColor: '#28A745', data: [this.parJanv, this.parFev, this.parMars, this.parAvr, this.parMai, this.parJuin, this.parJuil, this.parAout, this.parSept, this.parOct, this.parNov, this.parDec] };
    this.subj$.next(this.listpartenaire);


  }
  getProspectByAnnee(annee: number) {

    this.listprospect = this.partenaires?.filter(a => new Date(a?.createdAt)?.getFullYear() == annee && !a.partenaire)


    this.prosJanv = this.listprospect?.filter(a => new Date(a?.createdAt)?.getMonth() == 0)?.length
    this.prosFev = this.listprospect?.filter(a => new Date(a?.createdAt)?.getMonth() == 1)?.length
    this.prosMars = this.listprospect?.filter(a => new Date(a?.createdAt)?.getMonth() == 2)?.length
    this.prosAvr = this.listprospect?.filter(a => new Date(a?.createdAt)?.getMonth() == 3)?.length
    this.prosMai = this.listprospect?.filter(a => new Date(a?.createdAt)?.getMonth() == 4)?.length
    this.prosJuin = this.listprospect?.filter(a => new Date(a?.createdAt)?.getMonth() == 5)?.length
    this.prosJuil = this.listprospect?.filter(a => new Date(a?.createdAt)?.getMonth() == 6)?.length
    this.prosAout = this.listprospect?.filter(a => new Date(a?.createdAt)?.getMonth() == 7)?.length
    this.prosSept = this.listprospect?.filter(a => new Date(a?.createdAt)?.getMonth() == 8)?.length
    this.prosOct = this.listprospect?.filter(a => new Date(a?.createdAt)?.getMonth() == 9)?.length
    this.prosNov = this.listprospect?.filter(a => new Date(a?.createdAt)?.getMonth() == 10)?.length
    this.prosDec = this.listprospect?.filter(a => new Date(a?.createdAt)?.getMonth() == 11)?.length

    this.lineChartData[2] =
      { label: 'Prospects', backgroundColor: '#DC3545', data: [this.prosJanv, this.prosFev, this.prosMars, this.prosAvr, this.prosMai, this.prosJuin, this.prosJuil, this.prosAout, this.prosSept, this.prosOct, this.prosNov, this.prosDec] };
    this.sub$.next(this.listprospect);


  }


}
