import { Component, OnInit, ViewChild } from '@angular/core';

import { Agent } from '../../../../shared/model/agent.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { DossierInterim } from '../../shared/model/dossier-interim.model';
import { Interim } from '../../shared/model/interim.model';
import { DossierInterimService } from '../../shared/services/dossier-interim.service';
import { InterimService } from '../../shared/services/interim.service';
import { ListInterimComponent } from '../../dossier-interim/list-interim/list-interim.component';


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
  selector: 'fury-dossier-interim',
  templateUrl: './dossier-interim.component.html',
  styleUrls: ['./dossier-interim.component.scss'],
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
  ],
})
export class DossierInterimComponent implements OnInit {


  @ViewChild(MatDatepicker) picker;
  date = new FormControl(moment());

  anneeSelected =new Date().getFullYear();
 
//  etatPlanningDirection : EtatPlanningDirection = new EtatPlanningDirection();
dossierInterims: DossierInterim[];
dossierAbsenceCtrl: FormControl;
filteredDossierInterims: Observable<any[]>;
interims:Interim[];
interim:Interim;
username: string;
agent: Agent;
uniteOrganisationnelle: UniteOrganisationnelle;
uniteSuperieureAgent: UniteOrganisationnelle;
compte: Compte;
anneeCourant:number;
dossierInterim: DossierInterim;

// chosenYearHandler(normalizedYear: Moment) {
//   // const ctrlValue = this.date.value;
//   // ctrlValue.year(normalizedYear.year());
//   // this.date.setValue(ctrlValue);
//   // this.picker.close();
// }


// chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
//   const ctrlValue = this.date.value;
//   ctrlValue.month(normalizedMonth.month());
//   this.date.setValue(ctrlValue);
//   datepicker.close();
// }



private _gap = 16;
gap = `${this._gap}px`;
col(colAmount: number) {
  return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
}
constructor(
  private dossierInterimService: DossierInterimService,
  private authService: AuthenticationService,
  private compteService: CompteService,
  private uniteOrganisationnelleService: UniteOrganisationnelleService,
  private interimService: InterimService,
  private dialog: MatDialog) { }

ngOnInit(): void {
this.dossierAbsenceCtrl = new FormControl();


  //this.getInterims();

  this.setDossierInterimAnnee(this.anneeSelected);
  this.anneeCourant = new Date().getFullYear();
  
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

 // Get All DossierConge
 getInterims() {
  this.dossierInterimService.getAll().subscribe(
    (response) => {
      this.dossierInterims = response.body;
    },
    (err) => { },
    () => {
      this.filteredDossierInterims= this.dossierAbsenceCtrl.valueChanges.pipe(
        startWith(""),
        map((dossierInterim) =>
        dossierInterim
            ? this.filterDossierInterim(dossierInterim)
            : this.dossierInterims.slice()
        )
      );
    }
  );
}
filterDossierInterim(code: string) {
  return this.dossierInterims.filter(
    (dossierInterim: DossierInterim) =>
    dossierInterim.code.toLowerCase().indexOf(code.toLowerCase()) === 0
  );
}
setDossierInterim(dossierInterim: DossierInterim) {
 // this.planningDirection = undefined;
   
 this.dossierInterimService.getDossierInterimByAnnee(this.anneeCourant).subscribe(
   response=>{
    this.dossierInterims= response.body;
   }
 )
   this.dossierInterim= dossierInterim;
  //this.getUniteOrganisationnelleSuperieure();
}

setDossierInterimAnnee(annee:number) {
  // this.planningDirection = undefined;  
  this.dossierInterimService.getDossierInterimByAnnee(annee).subscribe(
    response=>{
     this.dossierInterims= response.body;
    }
  )
  ///  this.dossierInterim= dossierInterim;
   //this.getUniteOrganisationnelleSuperieure();
 }
DetailsInterim(dossierInterim: DossierInterim) {
  // this.interims = undefined;
  // this.getAllInterimByIdDossier(this.dossierInterim.id);
    this.dialog
  .open(ListInterimComponent, {
    data: { dossierInterim: dossierInterim, vue: "DCH" }
  });
}

// setPlanningAbsence(dossierInterim: DossierInterim) {
//   this.dialog
//   .open(ListInterimComponent, {
//     data: { dossierInterim: dossierInterim, vue: "DCH" }
//   });
// }
getAllInterimByIdDossier(idDossierInterim:number){
  this.interimService.getInterimsByDossier(idDossierInterim).subscribe(
    (response) => {
      this.interims = response.body;
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
// setDossierConge(dossierConge: DossierConge) {
//   this.planningDirection = undefined;
//   this.dossierConge = dossierConge;
//   this.getUniteOrganisationnelleSuperieure();
// }
// transmettrePlanningDirection(planningDirection: PlanningDirection){
//   this.dialog
//     .open(EtapeValidationComponent, {
//       data: {vue: 'transmettre-planning', planningDirection: planningDirection}
//     });
// }
// historiquePlanningDirection(planningDirection: PlanningDirection){
//   this.dialog
//   .open(EtapeValidationComponent, {
//      data: {vue: 'historique-planning', planningDirection: planningDirection}
//   });
// }

}
