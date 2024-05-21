import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fadeInRightAnimation } from '../../../../../src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../src/@fury/animations/fade-in-up.animation';
import { DialogUtil, NotificationUtil } from '../../../../../src/app/shared/util/util';
import { Agent } from '../../../../../src/app/shared/model/agent.model';
import { EtatAbsence } from '../../gestion-absence/shared/util/etat';
import { ListColumn } from '../../../../../src/@fury/shared/list/list-column.model';
import { AbsenceService } from '../../gestion-absence/shared/service/absence.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationService } from '../../../../../src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from '../../../../../src/app/shared/services/notification.service';
import { MotifRejetAbsenceComponent } from '../../gestion-absence/absence/motif-rejet-absence/motif-rejet-absence.component';
import { HistoriqueAbsenceComponent } from '../../gestion-absence/etapeabsence/historique-absence/historique-absence.component';
import { ValidationAbsenceComponent } from '../../gestion-absence/absence/validation-absence/validation-absence.component';

import { filter } from 'rxjs/operators';
import { DossierAbsence } from '../../gestion-absence/shared/model/dossier-absence.modele';
import { DetailsAbsenceComponent } from '../../gestion-absence/absence/details-absence/details-absence.component';
import { CloseAbsenceComponent } from '../../gestion-absence/absence/close-absence/close-absence.component';
import { Compte } from '../../gestion-utilisateurs/shared/model/compte.model';
import { AuthenticationService } from '../../../../../src/app/shared/services/authentification.service';
import { CompteService } from '../../gestion-utilisateurs/shared/services/compte.service';
import { AjoutDemandeAbsenceComponent } from '../ajout-demande-absence/ajout-demande-absence.component';
import { Absence } from '../../gestion-absence/shared/model/absence.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { UniteOrganisationnelle } from '../../../../../src/app/shared/model/unite-organisationelle';
import { UniteOrganisationnelleService } from '../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { PlanningAbsence } from '../../gestion-absence/shared/model/planning-absence.modele';
import { PlanningAbsenceService } from '../../gestion-absence/shared/service/planning-absence.service';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'fury-mes-absences',
  templateUrl: './mes-absences.component.html',
  styleUrls: ['./mes-absences.component.scss', "../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class MesAbsencesComponent  implements OnInit, AfterViewInit, OnDestroy  {

 
showProgressBar: boolean = false;

@ViewChild(MatDatepicker) picker;
dateA = new FormControl();

@ViewChild(MatDatepicker) picker1;
dateM = new FormControl();

anneeSelected =new Date().getFullYear();
private _gap = 16;
gap = `${this._gap}px`;
col(colAmount: number) {
  return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
}
moisSelected =new Date().getMonth;
date: Date = new Date();
currentYear: number = new Date().getFullYear();
currentDossierAbsence: DossierAbsence = undefined;
currentPlanningAbsence: PlanningAbsence = undefined;
planningAbsences: PlanningAbsence[] = [];
dialogUtil: DialogUtil = new DialogUtil();
absences: Absence[] = [];
agent: Agent;
agents:Agent[];
uniteOrganisationnelle: UniteOrganisationnelle;
compte: Compte;
niveau: number;
username: string;
uniteSuperieureAgent: UniteOrganisationnelle;
idUniteOrganisationnelleInferieures: number[] = [];
uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
uniteOrganisationnelles: UniteOrganisationnelle[] = [];
uniteOrganisationnelleSuperieures: UniteOrganisationnelle[] = [];
subject$: ReplaySubject<Absence[]> = new ReplaySubject<Absence[]>(
  1
);

data$: Observable<Absence[]> = this.subject$.asObservable();
pageSize = 5;
dataSource: MatTableDataSource<Absence> | null;

// -----Utliser pour la pagination et le tri des listes--------
// @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
// @ViewChild(MatSort, { static: true }) sort: MatSort;
private paginator: MatPaginator;
private sort: MatSort;
@ViewChild(MatSort) set matSort(ms: MatSort) {
  this.sort = ms;
  this.setDataSourceAttributes();
}
@ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
  this.paginator = mp;
  this.setDataSourceAttributes();
}
setDataSourceAttributes() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}
// -------------------------------------------------------------
@Input()
columns: ListColumn[] = [
  { name: "Checkbox", property: "checkbox", visible: false },
  { name: "Id", property: "id", visible: false, isModelProperty: true },

  {
    name: "Matricule",
    property: "matricule",
    visible: false,
    isModelProperty: true,
  },
  { name: "prenom",
  property: "prenom",
  visible: true,
  isModelProperty: true,
 },
  { name: "nom",
  property: "nom",
  visible: true,
  isModelProperty: true,
 },
  {
    name: "Date Depart",
    property: "dateDepart",
    visible: true,
    isModelProperty: true,
  },
  { name: "date Retour Previsionnelle", 
   property: "dateRetourPrevisionnelle",
   visible: false, 
   isModelProperty: true,
   },
  {
    name: "date Retour Effectif",
    property: "dateRetourEffectif",
    visible: false,
    isModelProperty: true,
  },
  { name: "date de Saisie",
   property: "dateSaisie",
   visible: false,
   isModelProperty: true,
 },
 {
  name: "motif",
  property: "motif",
  visible: false,
  isModelProperty: true,
},
{ name: "Mois", property: "mois", visible: true, isModelProperty: true },
{ name: "Annee", property: "annee", visible: false, isModelProperty: true },
{
  name: "jours absence",
  property: "jours",
  visible: false,
  isModelProperty: true,
},
{
    name: "creer le",
    property: "createdAt",
    visible: false,
    isModelProperty: true,
  },
  { name: "mise a jour le",
   property: "updatedAt",
   visible: false,
   isModelProperty: true,
  },
  { name: "Etat", 
  property: "etat",
   visible: true, 
   isModelProperty: true,
  },
  { name: "Niveau", 
  property: "etape_validation",
   visible: true, 
   isModelProperty: true,
  },
  { name: "Profil",
  property: "profil",
  visible: false,
  isModelProperty: true,
  },
  { name: "commentaire",
  property: "commentaire",
  visible: false,
  isModelProperty: true,
 },
  { name: "Actions", property: "actions", visible: true },


] as ListColumn[];
constructor(
  private absenceService: AbsenceService,
  private dialog: MatDialog,
  private dialogConfirmationService: DialogConfirmationService,
  private notificationService: NotificationService,
  private authService: AuthenticationService,
  private compteService: CompteService,
  private uniteOrganisationnelleService: UniteOrganisationnelleService
) {}
ngOnInit() {

 // this.getAbsences()
 //this.getAgents();

  this.username = this.authService.getUsername();
  this.compteService.getByUsername(this.username).subscribe((response) => {
   this.compte = response.body;
   this.agent = this.compte.agent;
   this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
   this.niveau = this.uniteOrganisationnelle.niveauHierarchique.position;
   this.getAllByAgent(this.agent.id);

  this.getUniteOrganisationnelleSuperieure();
});
this.dataSource = new MatTableDataSource();
this.data$.pipe(filter((data) => !!data)).subscribe((absences) => {
 this.absences = absences;
 this.dataSource.data = absences;
 this.showProgressBar = true;

});
}
getNombtreJour(dateRetourEffectif: Date, dateRetourPrev: Date, dateDepart: Date){
let date: number;
if(dateRetourEffectif === null){
  date = new Date(dateRetourPrev).getTime() - new Date(dateDepart).getTime();
}else{
  date = new Date(dateRetourEffectif).getTime() - new Date(dateDepart).getTime();
}
return date/(1000*3600*24);
}
  yearSelected(params) {  
  this.dateA.setValue(params);
  this.anneeSelected = params.year();
  this.picker.close();
//this.setDossierAbsenceAnnee(this.anneeSelected);
}

monthSelected(params) {
  this.dateM.setValue(params);
  this.moisSelected = params.month()+1;
  this.picker1.close();
//this.setDossierAbsenceAnnee(this.anneeSelected);
}

ngAfterViewInit() {
  // this.dataSource.paginator = this.paginator;
  // this.dataSource.sort = this.sort;
}
get visibleColumns() {
  return this.columns
    .filter((column) => column.visible)
    .map((column) => column.property);
}

onFilterChange(value) {
  if (!this.dataSource) {
    return;
  }
  value = value.trim();
  value = value.toLowerCase();
  this.dataSource.filter = value;
  this.dataSource.filterPredicate = (data: any, value) => { const dataStr =JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }

}

getAllAbsenceByUniteOrganisationnelles(
  idUniteOrganisationnelles: number[]
) {   
      this.absenceService.getAllByAbsencesUniteOrganisationnelles(idUniteOrganisationnelles)
      .subscribe(
      (response) => {
        this.absences = response.body;
      }, err => { 
        this.showProgressBar = true;
      },
      () => {
        this.subject$.next(this.absences);
        this.showProgressBar = true;

        //this.isPlanningDirectionValide();
        // this.dataSource = new MatTableDataSource();
        // this.data$.pipe(filter((data) => !!data)).subscribe((absences) => {
        //   this.absences = absences;
    
        //   this.dataSource.data = absences;
        // });
      });
}

createAbsence() {
  this.dialog
    .open(AjoutDemandeAbsenceComponent)
    .afterClosed()
    .subscribe((absence: any) => {
      if (absence) {
        this.absences.unshift(new Absence(absence));
        this.subject$.next(this.absences);
      }
    });
}
updateAbsence(absence: Absence) {
  this.dialog
    .open(AjoutDemandeAbsenceComponent, { 
      data: absence,
    })
    .afterClosed()
    .subscribe((absence) => {
      if (absence) {
        const index = this.absences.findIndex(
          (existingAbsence) =>
            existingAbsence.id === absence.id
        );
        this.absences[index] = new Absence(absence);
        this.subject$.next(this.absences);
      }
    });
}
deleteAbsence(absence: Absence) {

  this.dialogConfirmationService.confirmationDialog().subscribe(action => {
    if (action === DialogUtil.confirmer){
  this.absenceService.delete(absence).subscribe((response) => {
    this.notificationService.success(NotificationUtil.suppression);
    this.absences.splice(
      this.absences.findIndex(
        (existingAbsence) => existingAbsence.id === absence.id
      ),
      1
    );
    this.subject$.next(this.absences);
  })
    }
   });
}
detailsAbsence(absence: Absence) {
  this.dialog
    .open(DetailsAbsenceComponent, {
      data: absence,
    })
    .afterClosed()
    .subscribe((absence) => {
      if (absence) {
        const index = this.absences.findIndex(
          (existingAbsence) =>
          existingAbsence.id === absence.id
        );
        this.absences[index] = new Absence(absence);
        this.subject$.next(this.absences);
      }
    });
}
motifRejetAbsence(absence: Absence) {
  this.dialog
    .open(MotifRejetAbsenceComponent, {
      data: absence,
    })
    .afterClosed()
    .subscribe((absence) => {
      if (absence) {
        const index = this.absences.findIndex(
          (existingAbsence) =>
          existingAbsence.id === absence.id
        );
        this.absences[index] = new Absence(absence);
        this.subject$.next(this.absences);
      }
    });
}

historiqueAbsence(absence: Absence) {
  this.dialog
    .open(HistoriqueAbsenceComponent, {
      data: absence,
    })
    .afterClosed()
    .subscribe((absence) => {
      if (absence) {
        const index = this.absences.findIndex(
          (existingAbsence) =>
          existingAbsence.id === absence.id
        );
        this.absences[index] = new Absence(absence);
        this.subject$.next(this.absences);
      }
    });
}

closeAbsence(absence: Absence) {
  this.dialog.open(CloseAbsenceComponent, {
    data: absence
  }).afterClosed().subscribe((absence: any) => {
    if (absence) {
      const index = this.absences.findIndex(
        (existingAbsence) =>
          existingAbsence.id === absence.id
      );
      this.absences[index] = new Absence(absence);
      this.subject$.next(this.absences);
    }
  });
}

validerAbsence(absence: Absence){
  this.dialog
  .open(ValidationAbsenceComponent, {
    data: absence,
  })
  .afterClosed()
  .subscribe((absence) => {
    if (absence) {
      const index = this.absences.findIndex(
        (existingAbsence) =>
        existingAbsence.id === absence.id
      );
      this.absences[index] = new Absence(absence);
      this.subject$.next(this.absences);
      // this.updateAbsenceWithEtat(absence, this.etatAbsence.transmettre);
    }
  });
}

getAllByAgent(idAgent:number) {
  this.absenceService.getAbsencesByAgent(idAgent)
  .subscribe(
    (response) => {
      this.absences = response.body;
    },
    (err) => {
    },
    () => {
      this.subject$.next(this.absences);
      this.showProgressBar = true;
    }
  );
}
transmettreAbsence(absence: Absence){
  // this.updateAbsenceWithEtat(absence, this.etatAbsence.transmettre)
}
updateAbsenceWithEtat(absence: Absence, etat){
  absence.etat = etat
  this.absenceService.update(absence).subscribe(
    response => {
     const index = this.absences.findIndex(
      (existingAbsence) =>
       existingAbsence.id === absence.id
      );
      this.absences[index] = new Absence(absence);
      this.subject$.next(this.absences);
      })
}

getNomStructure(etape: number): string{
    
  if(etape === 0){
   etape = etape + 1; 
  }

let uniteOrganisationnelle = this.uniteOrganisationnelleSuperieures.find(e=> (e.niveauHierarchique.position === etape))

if(uniteOrganisationnelle){
return  uniteOrganisationnelle.description;
}

else if(etape === 5){
  return "Direction Capital Humain"; 
}
else if(etape === 6){
 return "Division Administration du Personnel"; 
}
else if(etape === 7){
 return "Service Administration du Personnel"; 
}
else{
let uniteOrganisationnelle =  this.uniteOrganisationnelle;

 return this.uniteOrganisationnelle.description; 
}

}


getUniteOrganisationnelleSuperieure() {
  let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];
  if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
    this.uniteSuperieureAgent = this.uniteOrganisationnelle;
  
  } else {
    this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
      .subscribe(response => {
        uniteOrganisationnelleSuperieures = response.body;
        this.uniteOrganisationnelleSuperieures = uniteOrganisationnelleSuperieures;
        this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
      }, err => { },
        () => {  });
  }
}
ngOnDestroy() {}
}
