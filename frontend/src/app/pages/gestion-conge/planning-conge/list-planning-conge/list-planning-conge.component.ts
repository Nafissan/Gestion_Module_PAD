import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { PlanningConge } from "../../shared/model/planning-conge.model";
import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { PlanningCongeService } from "../../shared/services/planning-conge.service";
import { MatDialog } from "@angular/material/dialog";
import { DetailsPlanningCongeComponent } from "../details-planning-conge/details-planning-conge.component";
import { AddOrUpdatePlanningCongeComponent } from "../add-or-update-planning-conge/add-or-update-planning-conge.component";
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
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import { EtatPlanningConge } from "../../shared/util/util";
import { NotificationService } from "../../../../shared/services/notification.service";

@Component({
  selector: "fury-list-planning-conge",
  templateUrl: "./list-planning-conge.component.html",
  styleUrls: ["./list-planning-conge.component.scss", "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListPlanningCongeComponent implements OnInit, AfterViewInit, OnDestroy {
  saisi: string   = EtatPlanningConge.saisi;
  encours: string = EtatPlanningConge.encours;
  valide: string  = EtatPlanningConge.valider;
  
  date: Date = new Date();
  // currentYear: number = new Date().getFullYear();
  username: string;
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  compte: Compte;

  idPlanningDirection: number;
  planningConges: PlanningConge[] = [];
  subject$: ReplaySubject<PlanningConge[]> = new ReplaySubject<PlanningConge[]>(
    1
  );
  data$: Observable<PlanningConge[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<PlanningConge> | null;

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
    { name: "Code", property: "code", visible: false, isModelProperty: true },
    { name: "Description", property: "description", visible: true, isModelProperty: true, },
    {
      name: "Date creation",
      property: "dateCreation",
      visible: false,
      isModelProperty: true,
    },

    { name: "Structure ", property: "structure", visible: true, isModelProperty: true },
    { name: "Etat ", property: "etat", visible: true, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    private planningService: PlanningCongeService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService:NotificationService,
  ) {}
  ngOnInit() {
    //Recupère contenant l'id du PlanningDirectione selectionné
    this.route.paramMap.subscribe((params) => {
      this.idPlanningDirection = parseInt(params.get("id"));
    });

    //
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
      // Recuperer tous les plannings conges en fonction du dossier conge et de l'agent
      this.getAllByDossierCongeAndUniteOrganisationnelle();
    });

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((planningConges) => {
      this.planningConges = planningConges;
      this.dataSource.data = planningConges;
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
  getAllByDossierCongeAndUniteOrganisationnelle() {
    this.planningService
      .getAllByPlanningDirectionAndUniteOrganisationnelle(this.idPlanningDirection, this.uniteOrganisationnelle.id)
      .subscribe(
        (response) => {
          this.planningConges = response.body;
        },
        (err) => {
        },
        () => {
          this.subject$.next(this.planningConges);
        }
      );
  }
  createPlanningConge() {
    this.dialog
      .open(AddOrUpdatePlanningCongeComponent)
      .afterClosed()
      .subscribe((planningConge: any) => {
        /**
         * Planning congé is the updated planningConge (if the user pressed Save - otherwise it's null)
         */ if (planningConge) {
          /**
           * Here we are updating our local array.
           */
          
          this.planningConges.unshift(new PlanningConge(planningConge));
          this.subject$.next(this.planningConges);
        }
      });
  }
  updatePlanningConge(planningConge: PlanningConge) {
    this.dialog
      .open(AddOrUpdatePlanningCongeComponent, {
        data: planningConge,
      })
      .afterClosed()
      .subscribe((planningConge: any) => {
        /**
         * PlanningConge is the updated planningConge (if the user pressed Save - otherwise it's null)
         */
        if (planningConge) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.planningConges.findIndex(
            (existingPlanningConge) =>
              existingPlanningConge.id === planningConge.id
          );
          this.planningConges[index] = new PlanningConge(planningConge);
          this.subject$.next(this.planningConges);
        }
      });
  }
  detailsPlanningConge(planningConge: PlanningConge) {
    this.dialog
      .open(DetailsPlanningCongeComponent, {
        data: planningConge,
      })
      .afterClosed()
      .subscribe((planningConge) => {
        /**
         * PlanningConge is the updated planningConge (if the user pressed Save - otherwise it's null)
         */
        if (planningConge) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.planningConges.findIndex(
            (existingDossierConge) =>
              existingDossierConge.id === planningConge.id
          );
          this.planningConges[index] = new PlanningConge(planningConge);
          this.subject$.next(this.planningConges);
        }
      });
  }
  deletePlanningConge(planningConge: PlanningConge) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
    this.planningService.delete(planningConge).subscribe((response) => {
      this.planningConges.splice(
        this.planningConges.findIndex(
          (existingDossierConge) => existingDossierConge.id === planningConge.id
        ),1);
        this.notificationService.success(NotificationUtil.suppression);
        this.subject$.next(this.planningConges);
    }, err => {
      this.notificationService.warn(NotificationUtil.echec);
  },
  () => {});
  }
})
  }
  ngOnDestroy() {}  
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
}
