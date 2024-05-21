import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { MatDialog } from "@angular/material/dialog";

import { filter } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { CompteService } from "../../../gestion-utilisateurs/shared/services/compte.service";
import { Agent } from "../../../../shared/model/agent.model";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";
import { Compte } from "../../../gestion-utilisateurs/shared/model/compte.model";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil } from "../../../../shared/util/util";
import { PlanningAbsence } from "../../shared/model/planning-absence.modele";
import { AddPlanningAbsenceComponent } from "../add-planning-absence/add-planning-absence.component";
import { PlanningAbsenceService } from "../../shared/service/planning-absence.service";
import { DossierAbsence } from "../../shared/model/dossier-absence.modele";
import { UniteOrganisationnelleService } from "../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service";
import { DossierAbsenceService } from "../../shared/service/dossier-absence.service";

@Component({
  selector: 'fury-list-planning-absence',
  templateUrl: './list-planning-absence.component.html',
  styleUrls: ['./list-planning-absence.component.scss',"../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListPlanningAbsenceComponent implements OnInit {

  showProgressBar: boolean = false;

  date: Date = new Date();
  currentYear: number = new Date().getFullYear();
  dialogUtil: DialogUtil = new DialogUtil();
  username: string;
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  compte: Compte;
  uniteSuperieureAgent:UniteOrganisationnelle;
  dossierAbsence: DossierAbsence;
  dossierAbsences:DossierAbsence[];
  idDossierAbsence: number;
  planningAbsences: PlanningAbsence[] = [];
  idUniteOrganisationnelleInferieures: number[] = [];
  uniteOrganisationnelleInferieures: UniteOrganisationnelle[] = [];
  subject$: ReplaySubject<PlanningAbsence[]> = new ReplaySubject<PlanningAbsence[]>(
    1
  );
  data$: Observable<PlanningAbsence[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<PlanningAbsence> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    { name: "Code", property: "code", visible: true, isModelProperty: true },
    { name: "Description", property: "description", visible: true, isModelProperty: true, },
    {
      name: "Date creation",
      property: "dateCreation",
      visible: false,
      isModelProperty: true,
    },

    { name: "Structure ", property: "structure", visible: true, isModelProperty: true },
    // { name: "Etat ", property: "etat", visible: true, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    private planningAbsenceService: PlanningAbsenceService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dialogConfirmationService: DialogConfirmationService,
    private uniteOrganisationnelleService:UniteOrganisationnelleService,
    private dossierAbsenceService: DossierAbsenceService
  ) {}
  ngOnInit() {
    //
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
      // Recuperer tous les plannings planning en fonction du dossier conge et de l'agent
      this.getUniteOrganisationnellesInferieures();
    });

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((planningAbsences) => {
      this.planningAbsences = planningAbsences;
      this.dataSource.data = planningAbsences;
      this.showProgressBar=true
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      this.getDossierAbsence();
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
            this.getDossierAbsence();
          });
    }

  }
  // getAllAbsenceByUniteOrganisationnelles(
  //   idUniteOrganisationnelles: number[]
  // ) {   
  //       this.planningAbsenceService.getAllByDossierAbsenceAndUniteOrganisationnelles(idUniteOrganisationnelles)
  //       .subscribe(
  //       (response) => {
  //         this.planningAbsences = response.body;
  //       }, err => {},
  //       () => {
  //         this.subject$.next(this.planningAbsences);
  //         //this.isPlanningDirectionValide();
  //         // this.dataSource = new MatTableDataSource();
  //         // this.data$.pipe(filter((data) => !!data)).subscribe((absences) => {
  //         //   this.absences = absences;
      
  //         //   this.dataSource.data = absences;
  //         // });
  //       });
  // }
  
  // getUniteOrganisationnelleSuperieure() {
  //   let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];

  //   if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
  //     this.uniteSuperieureAgent = this.uniteOrganisationnelle;
  //     this.getDossierAbsence();
  //   }
  //    else {
  //     this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
  //       .subscribe(response => {
  //         uniteOrganisationnelleSuperieures = response.body;
  //         this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
  //       }, err => {},
  //         () => {
  //           this.getDossierAbsence();
  //         });
  //   }
  // }
  getDossierAbsence(){
    this.dossierAbsenceService.getAll()
            .subscribe(response => {
               this.dossierAbsences = response.body;
               //this.dossierAbsences = this.dossierAbsences.filter(d => d.codeDirection === this.uniteSuperieureAgent.code);
              // this.dossierAbsence = this.dossierAbsences
               this.dossierAbsences.forEach(element => {
                 this.dossierAbsence = element;
               });
            }, err => {},
            () => {
            // this.subject$.next(this.dossierAbsences);
            this.getAllByDossierAbsenceAndUniteOrganisationnelle();
            });
  }
  getAllByDossierAbsenceAndUniteOrganisationnelle() {
    this.planningAbsenceService.getAllByDossierAbsenceAndUniteOrganisationnelles(this.dossierAbsence.id, this.idUniteOrganisationnelleInferieures)
      .subscribe(
        (response) => {
          this.planningAbsences = response.body;
        },
        (err) => {
        },
        () => {
          this.subject$.next(this.planningAbsences);
        }
      );
  }
  createPlanningAbsence() {
    this.dialog
      .open(AddPlanningAbsenceComponent)
      .afterClosed()
      .subscribe((planningAbsence: any) => {
        /**
         * Planning congé is the updated planningConge (if the user pressed Save - otherwise it's null)
         */ if (planningAbsence) {
          /**
           * Here we are updating our local array.
           */
          
          this.planningAbsences.unshift(new PlanningAbsence(planningAbsence));
          this.subject$.next(this.planningAbsences);
        }
      });
  }
  updatePlanningAbsence(planningAbsence: PlanningAbsence) {
    this.dialog
      .open(AddPlanningAbsenceComponent, {
        data: planningAbsence,
      })
      .afterClosed()
      .subscribe((planningConge: any) => {
      
        if (planningAbsence) {
        
          const index = this.planningAbsences.findIndex(
            (existingPlanningAbsence) =>
            existingPlanningAbsence.id === planningAbsence.id
          );
          this.planningAbsences[index] = new PlanningAbsence(planningAbsence);
          this.subject$.next(this.planningAbsences);
        }
      });
  }
//   detailsPlanningConge(planningConge: PlanningConge) {
//     this.dialog
//       .open(DetailsPlanningCongeComponent, {
//         data: planningConge,
//       })
//       .afterClosed()
//       .subscribe((planningConge) => {
//         /**
//          * PlanningConge is the updated planningConge (if the user pressed Save - otherwise it's null)
//          */
//         if (planningConge) {
//           /**
//            * Here we are updating our local array.
//            * You would probably make an HTTP request here.
//            */
//           const index = this.planningConges.findIndex(
//             (existingDossierConge) =>
//               existingDossierConge.id === planningConge.id
//           );
//           this.planningConges[index] = new PlanningConge(planningConge);
//           this.subject$.next(this.planningConges);
//         }
//       });
//   }
  deletePlanningAbsence(planningAbsence: PlanningAbsence) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    this.planningAbsenceService.delete(planningAbsence).subscribe((response) => {
      this.planningAbsences.splice(
        this.planningAbsences.findIndex(
          (existingDossierAbsence) => existingDossierAbsence.id === planningAbsence.id
        ),1);
      this.subject$.next(this.planningAbsences);
    });
  }
})
 }
  ngOnDestroy() {}
}
