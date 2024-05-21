import { Component, OnInit, ViewChild, Input, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { Absence } from '../../shared/model/absence.model';
import { ReplaySubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { AbsenceService } from '../../shared/service/absence.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { Agent } from '../../../../shared/model/agent.model';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { EtatAbsence } from '../../shared/util/etat';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { DialogUtil, NotificationUtil } from '../../../../shared/util/util';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { DetailsAbsenceComponent } from '../../absence/details-absence/details-absence.component';
import { HistoriqueAbsenceComponent } from '../../etapeabsence/historique-absence/historique-absence.component';
import { CloseAbsenceComponent } from '../../absence/close-absence/close-absence.component';
import { ValidationAbsenceComponent } from '../../absence/validation-absence/validation-absence.component';

@Component({
  selector: 'fury-list-absence',
  templateUrl: './list-absence.component.html',
  styleUrls: ['./list-absence.component.scss',"../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListAbsenceComponent implements OnInit, AfterViewInit, OnDestroy {

  date: Date = new Date();
  showProgressBar: boolean = false;
  dialogUtil: DialogUtil = new DialogUtil();
  absences: Absence[]=[];
  agent: Agent;
  agents:Agent[];
  uniteOrganisationnelle: UniteOrganisationnelle;
  compte: Compte;
  niveau: number;
  username: string;
  uniteSuperieureAgent: UniteOrganisationnelle;
  idPlanningAbsence:number;
  idUniteOrganisationnelleInferieures: number[] = [];
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  uniteOrganisationnelleSuperieures: UniteOrganisationnelle[] = [];
  subject$: ReplaySubject<Absence[]> = new ReplaySubject<Absence[]>(
    1
  );
  data$: Observable<Absence[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Absence> | null;
  etatAbsence: EtatAbsence = new EtatAbsence()

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
     visible: true, 
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
    visible: true,
    isModelProperty: true,
  },
   { name: "Mois", property: "mois", visible: false, isModelProperty: true },
  { name: "Annee", property: "annee", visible: false, isModelProperty: true },
  {
    name: "jours absence",
    property: "jours",
    visible: false,
    isModelProperty: true,
  },
    { name: "Profil",
     property: "profil",
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
    // { name: "Niveau", 
    // property: "etape_validation",
    //  visible: false, 
    //  isModelProperty: true,
    // },
    { name: "commentaire",
    property: "commentaire",
    visible: true,
    isModelProperty: true,
   },
   { name: "Etat", 
   property: "etat",
    visible: true, 
    isModelProperty: true,
   },
    { name: "Actions", property: "actions", visible: true },


  ] as ListColumn[];
  constructor(
    private absenceService: AbsenceService,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService
  ) {}
  ngOnInit() {

    this.idPlanningAbsence  = this.defaults.planningAbsence.id;;
    this.getAbsencesByIPlanningAbsence(this.idPlanningAbsence);
   // this.getAbsences()
  // this.getAgents();
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
     this.compte = response.body;
     this.agent = this.compte.agent;
     this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
     this.niveau = this.uniteOrganisationnelle.niveauHierarchique.position;
    // this.getUniteOrganisationnellesInferieures();
 });
 this.dataSource = new MatTableDataSource();
 this.data$.pipe(filter((data) => !!data)).subscribe((absences) => {
   this.absences = absences;
   this.dataSource.data = absences;
   this.showProgressBar = true;

 });
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
  getNombtreJour(dateRetourEffectif: Date, dateRetourPrev: Date, dateDepart: Date){
    let date: number;
    if(dateRetourEffectif === null){
      date = new Date(dateRetourPrev).getTime() - new Date(dateDepart).getTime();
    }else{
      date = new Date(dateRetourEffectif).getTime() - new Date(dateDepart).getTime();
    }
    return date/(1000*3600*24);
   }
  
  getAbsencesByIPlanningAbsence(idPlanningAbsence:number){
    this.absenceService.getAbsencesByPlanningAbsence(idPlanningAbsence).
    subscribe(response => {
      this.absences = response.body;

     // this.absences =  this.absences.filter(n=>n.etat === "En COURS");
    }, err => {},
      () => {
        this.subject$.next(this.absences);
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
  // getUniteOrganisationnellesInferieures() {
  //   if (this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
  //     this.idUniteOrganisationnelleInferieures.unshift(this.uniteOrganisationnelle.id);
  //     this.getAllAbsenceByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);
  //   } else {
  //     this.uniteOrganisationnelleService.getAllInferieures(this.uniteOrganisationnelle.id)
  //       .subscribe(response => {
  //         this.uniteOrganisationnelleInferieures = response.body;
  //         this.uniteOrganisationnelleInferieures.unshift(this.uniteOrganisationnelle);

  //         this.uniteOrganisationnelleInferieures.forEach(unite => {
  //           this.idUniteOrganisationnelleInferieures.push(unite.id);
  //         })
  //         //this.getAllAbsenceByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);
  //       }, err => { },
  //         () => {
  //           this.getAllAbsenceByUniteOrganisationnelles(this.idUniteOrganisationnelleInferieures);
  //         });
  //   }

  // }
  // getAllAbsenceByUniteOrganisationnelles(
  //   idUniteOrganisationnelles: number[]
  // ) {   
  //       this.absenceService.getAllByAbsencesUniteOrganisationnelles(idUniteOrganisationnelles)
  //       .subscribe(
  //       (response) => {
  //         this.absences = response.body;
  //       }, err => {},
  //       () => {
  //         this.subject$.next(this.absences);
  //         //this.isPlanningDirectionValide();
  //         // this.dataSource = new MatTableDataSource();
  //         // this.data$.pipe(filter((data) => !!data)).subscribe((absences) => {
  //         //   this.absences = absences;
      
  //         //   this.dataSource.data = absences;
  //         // });
  //       });
  // }

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
  closeAbsence(absence: Absence) {
    this.dialog.open(CloseAbsenceComponent, {
      data: absence
    }).afterClosed().subscribe((absence: any) => {
    /**
     * Dossier congé is the updated dossierConge (if the user pressed Save - otherwise it's null)
     */ if (absence) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
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
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
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

  ngOnDestroy() {}
}

