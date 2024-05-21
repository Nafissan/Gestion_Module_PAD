import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Absence } from '../../shared/model/absence.model';
import { ReplaySubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { AbsenceService } from '../../shared/service/absence.service';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { AddAbsenceComponent } from '../add-absence/add-absence.component';
import { ValidationAbsenceComponent } from '../validation-absence/validation-absence.component';
import { Agent } from '../../../../shared/model/agent.model';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { DetailsAbsenceComponent } from '../details-absence/details-absence.component';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { DialogUtil, NotificationUtil } from '../../../../shared/util/util';
import { NotificationService } from '../../../../shared/services/notification.service';
import { CloseAbsenceComponent } from '../close-absence/close-absence.component';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { DossierAbsence } from '../../shared/model/dossier-absence.modele';
import { PlanningAbsence } from '../../shared/model/planning-absence.modele';
import { MotifRejetAbsenceComponent } from '../motif-rejet-absence/motif-rejet-absence.component';
import { HistoriqueAbsenceComponent } from '../../etapeabsence/historique-absence/historique-absence.component';
import { FormControl } from '@angular/forms';
import { MatDatepicker, MatMonthView } from '@angular/material/datepicker';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { formatDateEnMois } from 'src/app/shared/util/formatageDate';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/

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
const MOIS: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août","Septembre", "Octobre", "Novembre", "Décembre"];
@Component({
  selector: 'fury-list-absence',
  templateUrl: './list-absence.component.html',
  styleUrls: ['./list-absence.component.scss',"../../../../shared/util/bootstrap4.css"],
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
export class ListAbsenceComponent implements OnInit, AfterViewInit, OnDestroy {
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
  filteredMois: string[];
  dateV = new FormControl(moment());
  moisCourantCtl: FormControl =  new FormControl();
  anneeCourant = new Date().getFullYear();
  moisCourant = formatDateEnMois(new Date());
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
  pageSize = 4;
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
  { name: "Matricule",property: "matricule",visible: false, isModelProperty: true},
  { name: "prenom",  property: "prenom", visible: true, isModelProperty: true },
  { name: "nom", property: "nom",  visible: true, isModelProperty: true },
  { name: "Date Depart", property: "dateDepart",visible: true, isModelProperty: true},
  { name: "date Retour Previsionnelle", property: "dateRetourPrevisionnelle",visible: false, isModelProperty: true},
  { name: "date Retour Effectif",property: "dateRetourEffectif",visible: false, isModelProperty: true  },
  { name: "date de Saisie", property: "dateSaisie", visible: false, isModelProperty: true},
  { name: "motif",property: "motif",visible: false, isModelProperty: true},
  { name: "Mois", property: "mois", visible: true, isModelProperty: true },
  { name: "Annee", property: "annee", visible: false, isModelProperty: true },
  { name: "jours absence", property: "jours",visible: false, isModelProperty: true },
  { name: "creer le", property: "createdAt",visible: false, isModelProperty: true },
  { name: "mise a jour le", property: "updatedAt",visible: false, isModelProperty: true},
  { name: "Etat",property: "etat",visible: true, isModelProperty: true},
  { name: "Niveau",property: "etape_validation",visible: true, isModelProperty: true},
  { name: "Profil",property: "profil",visible: false, isModelProperty: true },
  { name: "commentaire", property: "commentaire", visible: false, isModelProperty: true },
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

     this.filteredMois = MOIS;
     this.moisCourantCtl.setValue(this.moisCourant)
     this.getAgents();
     this.username = this.authService.getUsername();
     this.compteService.getByUsername(this.username).subscribe((response) => {
     this.compte = response.body;
     this.agent = this.compte.agent;
     this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
     this.niveau = this.uniteOrganisationnelle.niveauHierarchique.position;
     this.getUniteOrganisationnellesInferieures();
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
    this.dateV.setValue(params);
    this.anneeSelected = params.year();
    this.picker.close();
    this.setAbsenceAnnee(this.anneeSelected);
  }

  setAbsenceAnnee(annee:number) {

    this.absenceService.getAll().subscribe(
      response=>{
       this.absences= response.body;
       this.absences =  this.absences.filter(a=> (a.annee===annee))
      }
  )}

  monthSelected(params) {
    this.dateM.setValue(params);
    this.moisSelected = params.month()+1;
    this.picker1.close();
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

  getUniteOrganisationnellesInferieures() {
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.idUniteOrganisationnelleInferieures.unshift(this.uniteOrganisationnelle.id);
      // this.getAllAbsenceByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);
      this.getAbsenceByUniteOrgInferieuresAndAnneeAndMois(this.idUniteOrganisationnelleInferieures, this.anneeCourant,this.moisCourant);
    } else {
      this.uniteOrganisationnelleService.getAllInferieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          this.uniteOrganisationnelleInferieures = response.body;
          this.uniteOrganisationnelleInferieures.unshift(this.uniteOrganisationnelle);

          this.uniteOrganisationnelleInferieures.forEach(unite => {
            this.idUniteOrganisationnelleInferieures.push(unite.id);
          })
          //this.getAllAbsenceByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);
        }, err => { },
          () => {
            // this.getAllAbsenceByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);
            this.getAbsenceByUniteOrgInferieuresAndAnneeAndMois(this.idUniteOrganisationnelleInferieures, this.anneeCourant,this.moisCourant);
          });
    }

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
      .open(AddAbsenceComponent)
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
      .open(AddAbsenceComponent, {
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
  getAgents() {
    this.absenceService.getAgents().subscribe(
      (response) => {
        this.agents = response.body;
      },
      (err) => {
      },
      () => {
       // this.subject$.next(this.agents);
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

  // getUniteOrganisationnelleSuperieure() {
  //   let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];
  //   if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
  //     this.uniteSuperieureAgent = this.uniteOrganisationnelle;
  //    // this.getPlanningDirection(this.uniteSuperieureAgent.code, this.dossierConge.id)
  //   } else {
  //     this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
  //       .subscribe(response => {
  //         uniteOrganisationnelleSuperieures = response.body;
  //         this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
  //       }, err => { },
  //         () => {
  //         //  this.getPlanningDirection(this.uniteSuperieureAgent.code, this.dossierConge.id)

  //         })
  //   }
  // }

  setMois(mois){
    this.getAbsenceByUniteOrgInferieuresAndAnneeAndMois(this.idUniteOrganisationnelleInferieures, this.anneeCourant,mois);
  }

  getAbsenceByUniteOrgInferieuresAndAnneeAndMois(idUniteOrganisationnelles: number[], annee, mois){
    this.absenceService.getAbsencesByUniteOrgInfAndAnneeAndMois(idUniteOrganisationnelles, annee, mois).subscribe(
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
