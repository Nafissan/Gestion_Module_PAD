import { Component, OnInit, ViewChild } from '@angular/core';
import { DossierAbsence } from '../../shared/model/dossier-absence.modele';
import { Agent } from '../../../../shared/model/agent.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { DossierAbsenceService } from '../../shared/service/dossier-absence.service';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { PlanningDirectionService } from '../../../gestion-conge/shared/services/planning-direction.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { PlanningAbsence } from '../../shared/model/planning-absence.modele';
import { PlanningAbsenceService } from '../../shared/service/planning-absence.service';
import { AbsenceService } from '../../shared/service/absence.service';
import { ListAbsenceComponent } from '../list-absence/list-absence.component';
ListAbsenceComponent
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';


import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
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
  selector: 'fury-absence-direction',
  templateUrl: './absence-direction.component.html',
  styleUrls: ['./absence-direction.component.scss','../../../../shared/util/bootstrap4.css'],
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
export class AbsenceDirectionComponent implements OnInit {

  currentYear: number = new Date().getFullYear();
  dossierAbsences: DossierAbsence[];
  dossierAbsenceCtrl: FormControl;
  filteredDossierAbsences: Observable<any[]>;
  planningAbsences:PlanningAbsence[];
  planningAbsence:PlanningAbsence;
  username: string;
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteSuperieureAgent: UniteOrganisationnelle;
  compte: Compte;
  dossierAbsence: DossierAbsence;
  afficherDossier:boolean;
  affcherFichier:boolean;


  @ViewChild(MatDatepicker) picker;
  date = new FormControl(moment());

  anneeSelected =new Date().getFullYear();
  private _gap = 16;
  gap = `${this._gap}px`;
  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }
  constructor(
    private dossierAbsenceService: DossierAbsenceService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private planningAbsenceService: PlanningAbsenceService,
    private dialog: MatDialog,private absenceService:AbsenceService  ) { }

  ngOnInit(): void {
  this.dossierAbsenceCtrl = new FormControl();
   // this.getDossierAbsences();
    this.afficherDossier=true;
    this.affcherFichier=false;
    this.setDossierInterimAnnee(this.anneeSelected);
     //
     this.username = this.authService.getUsername();
     this.compteService.getByUsername(this.username).subscribe((response) => {
       this.compte = response.body;
       this.agent = this.compte.agent;
       this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
     });
  }

  yearSelected(params) {
    this.date.setValue(params);
    this.anneeSelected = params.year();
    this.picker.close();
    this.setDossierInterimAnnee(this.anneeSelected);
  }

  setDossierInterimAnnee(annee:number) {

    // this.planningDirection = undefined;
    this.dossierAbsenceService.getAll().subscribe(
      response=>{
       this.dossierAbsences= response.body;
       this.dossierAbsences =  this.dossierAbsences.filter(a=> (a.annee===annee)) 
       
       
       this.dossierAbsences.forEach(d => {
           d.description=d.description.slice(16)
        })


      }
    )
    ///  this.dossierInterim= dossierInterim;
     //this.getUniteOrganisationnelleSuperieure();
   }
   

   afficherDossierAbsence() {  

    //this.setDossierInterimAnnee(this.anneeSelected);
    this.affcherFichier=false
    this.afficherDossier=true
   
   }

   // Get All DossierConge
   getDossierAbsences() {
    this.dossierAbsenceService.getAll().subscribe(
      (response) => {
        this.dossierAbsences = response.body;
      },
      (err) => { },
      () => {
        this.filteredDossierAbsences= this.dossierAbsenceCtrl.valueChanges.pipe(
          startWith(""),
          map((dossierAbsence) =>
          dossierAbsence
              ? this.filterDossierAbsences(dossierAbsence)
              : this.dossierAbsences.slice()
          )
        );
      }
    );
  }
  filterDossierAbsences(code: string) {
    return this.dossierAbsences.filter(
      (dossierAbsence: DossierAbsence) =>
      dossierAbsence.code.toLowerCase().indexOf(code.toLowerCase()) === 0
    );
  }
  setDossierAbsence(dossierAbsence: DossierAbsence) {
   // this.planningDirection = undefined;
     this.dossierAbsence= dossierAbsence;
    //this.getUniteOrganisationnelleSuperieure();
  }
  DetailsPlanningAbsence(dossierAbsence: DossierAbsence) {
    this.planningAbsences = undefined;
    this.getAllPlanningAbsencesByIdDossierAbsence(dossierAbsence.id);
    this.afficherDossier=false;
    this.affcherFichier=true;
  }

  setPlanningAbsence(planningAbsence: PlanningAbsence) {
    this.dialog
    .open(ListAbsenceComponent, {
      data: { planningAbsence: planningAbsence, vue: "DCH" }
    });
  }
  getAllPlanningAbsencesByIdDossierAbsence(idDossierAbsence:number){
    this.planningAbsenceService.getAllByDossierAbsence(idDossierAbsence).subscribe(
      (response) => {
        this.planningAbsences = response.body;
      },
      (err) => { },
      () => {
        // this.filteredDossierAbsences= this.dossierAbsenceCtrl.valueChanges.pipe(
        //   startWith(""),
        //   map((dossierAbsence) =>
        //   dossierAbsence
        //       ? this.filterDossierAbsences(dossierAbsence)
        //       : this.dossierAbsences.slice()
        //   )
        // );
      }
    
    )
    
  }
  // getUniteOrganisationnelleSuperieure() {
  //   let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];
  //   if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
 
  //     this.uniteSuperieureAgent = this.uniteOrganisationnelle;
  //     this.getPlanningDirection(this.uniteSuperieureAgent.code, this.dossierConge.id)
  //   } else {
  //     this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
  //       .subscribe(response => {
  //         uniteOrganisationnelleSuperieures = response.body;
  //         this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);

  //       }, err => { },
  //         () => {
  //           this.getPlanningDirection(this.uniteSuperieureAgent.code, this.dossierConge.id)
  //         })
  //   }
  // }
  // getPlanningDirection(codeDirection: string, idDossierConge: number) {
  //   this.planningDirectionService.getByCodeDirectionAndDossierConge(codeDirection, idDossierConge)
  //     .subscribe(response => {
  //       this.planningDirection = response.body;
  //     });
  // }
  // filterDossierConges(code: string) {
  //   return this.dossierconges.filter(
  //     (dossierConge: DossierConge) =>
  //       dossierConge.code.toLowerCase().indexOf(code.toLowerCase()) === 0
  //   );
  // }
 

}
