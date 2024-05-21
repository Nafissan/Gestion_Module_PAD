import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanningDirectionService } from '../../shared/services/planning-direction.service';
import { PlanningDirection } from '../../shared/model/planning-direction.model';
import { ReplaySubject, Observable } from 'rxjs';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { DialogUtil, NotificationUtil } from '../../../../shared/util/util';
import { AddOrUpdatePlanningDirectionComponent } from '../add-or-update-planning-direction/add-or-update-planning-direction.component';
import { DetailsPlanningDirectionComponent } from '../details-planning-direction/details-planning-direction.component';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { Agent } from '../../../../shared/model/agent.model';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { UniteOrganisationnelleService } from '../../../gestion-unite-organisationnelle/shared/services/unite-organisationnelle.service';
import { DossierConge } from '../../shared/model/dossier-conge.model';
import { DossierCongeService } from '../../shared/services/dossier-conge.service';
import { EtatPlanningDirection, EtatDossierConge } from '../../shared/util/util';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'fury-list-planning-direction',
  templateUrl: './list-planning-direction.component.html',
  styleUrls: ['./list-planning-direction.component.scss', '../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListPlanningDirectionComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  saisi: string    = EtatPlanningDirection.saisi;
  transmis: string = EtatPlanningDirection.transmis;
  imputer: string  = EtatPlanningDirection.imputer;
  encours: string  = EtatPlanningDirection.encours;
  valider: string  = EtatPlanningDirection.valider;
  cloturer: string = EtatPlanningDirection.cloturer;

  date: Date = new Date();
  // currentYear: number = new Date().getFullYear();
  username: string;
  agent: Agent;
  uniteOrganisationnelle: UniteOrganisationnelle;
  uniteSuperieureAgent: UniteOrganisationnelle;
  compte: Compte;

  currentDossierConge: DossierConge = undefined;
  currentDate: Date = new Date();
  dossierconges: DossierConge[] = [];

  // idDossierConge: number;
  planningDirections: PlanningDirection[] = [];
  subject$: ReplaySubject<PlanningDirection[]> = new ReplaySubject<PlanningDirection[]>(
    1
  );
  data$: Observable<PlanningDirection[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<PlanningDirection> | null;

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
    { name: "Etat ", property: "etat", visible: true, isModelProperty: true },
    { name: "Niveau", property: "niveau", visible: false, isModelProperty: true, },
    { name: "Etape", property: "etape", visible: false, isModelProperty: true, },
    
    { name: "Matricule ", property: "matricule", visible: false, isModelProperty: true },
    { name: "Prenom ", property: "prenom", visible: false, isModelProperty: true },
    { name: "Nom ", property: "nom", visible: false, isModelProperty: true },
    { name: "Fonction ", property: "fonction", visible: false, isModelProperty: true },

    { name: "CodeDirection ", property: "codeDirection", visible: false, isModelProperty: true },
    { name: "NomDirection ", property: "nomDirection", visible: false, isModelProperty: true },
    { name: "DescriptionDirection ", property: "descriptionDirection", visible: true, isModelProperty: true },

    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    private route: ActivatedRoute,
    private planningDirectionService: PlanningDirectionService,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private compteService: CompteService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private dialogConfirmationService: DialogConfirmationService,
    private dossierCongeService: DossierCongeService,
    private authentificationService: AuthenticationService,
    private notificationService:NotificationService,
  ) { }

  ngOnInit() {

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((planningDirections) => {
      this.planningDirections = planningDirections;
      this.dataSource.data = planningDirections;
    });
    this.getDossierConges();
  }
  getAgentConnecte(dossierConge: DossierConge) {
    this.username = this.authService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;
      this.uniteOrganisationnelle = this.agent.uniteOrganisationnelle;
    }, err => { },
      () => {
        this.getUniteOrganisationnelleSuperieure(dossierConge);
      });
  }
  // Get All DossierConge
  getDossierConges() {
    this.dossierCongeService.getAll().subscribe(
      (response) => {
        this.dossierconges = response.body;
        this.currentDossierConge = this.dossierconges.find(e => e.etat === EtatDossierConge.saisi || e.etat === EtatDossierConge.ouvert);
      },
      (err) => { },
      () => {
        if(this.currentDossierConge){
          this.getAgentConnecte(this.currentDossierConge);
        }else{
          this.showProgressBar = true;
        }
      });
  }
  getPlanningDirectionByDossierConge(dossierconge: DossierConge) {
    this.planningDirectionService.getByDossierConge(dossierconge.id)
      .subscribe(response => {
        this.planningDirections = response.body;
        this.planningDirections = this.planningDirections.filter(p => p.codeDirection === this.uniteSuperieureAgent.code);
      }, err => { },
        () => {
          this.subject$.next(this.planningDirections.filter(planningDirection => planningDirection.dossierConge.id === this.currentDossierConge.id));
          this.showProgressBar = true;
        });
  }
  getUniteOrganisationnelleSuperieure(dossierConge: DossierConge) {
    let uniteOrganisationnelleSuperieures: UniteOrganisationnelle[];
    if (this.uniteOrganisationnelle.niveauHierarchique.position === 1 || this.uniteOrganisationnelle.niveauHierarchique.position === 0) {
      this.uniteSuperieureAgent = this.uniteOrganisationnelle;
      this.getPlanningDirectionByDossierConge(dossierConge);
    } else {
      this.uniteOrganisationnelleService.getAllSuperieures(this.uniteOrganisationnelle.id)
        .subscribe(response => {
          uniteOrganisationnelleSuperieures = response.body;
          this.uniteSuperieureAgent = uniteOrganisationnelleSuperieures.find(e => e.niveauHierarchique.position === 1);
        }, err => { },
          () => { 
            this.getPlanningDirectionByDossierConge(dossierConge);
          });
    }
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

  createPlanningDirection() {
    this.dialog
      .open(AddOrUpdatePlanningDirectionComponent)
      .afterClosed()
      .subscribe((planningDirection: any) => {
        /**
         * Planning Direction is the updated planningDirection (if the user pressed Save - otherwise it's null)
         */ if (planningDirection) {
          /**
           * Here we are updating our local array.
           */
          this.planningDirections.unshift(new PlanningDirection(planningDirection));
          this.subject$.next(this.planningDirections);
        }
      });
  }
  updatePlanningDirection(planningDirection: PlanningDirection) {
    this.dialog
      .open(AddOrUpdatePlanningDirectionComponent, {
        data: planningDirection,
      })
      .afterClosed()
      .subscribe((planningDirection) => {
        /**
         * Planning Direction is the updated planningDirection (if the user pressed Save - otherwise it's null)
         */
        if (planningDirection) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.planningDirections.findIndex(
            (existingPlanningDirection) =>
              existingPlanningDirection.id === planningDirection.id
          );
          this.planningDirections[index] = new PlanningDirection(planningDirection);
          this.subject$.next(this.planningDirections);
        }
      });
  }
  detailsPlanningDirection(planningDirection: PlanningDirection) {
    this.dialog
      .open(DetailsPlanningDirectionComponent, {
        data: planningDirection,
      })
      .afterClosed()
      .subscribe((planningDirection) => {
        /**
         * Planning Direction is the updated planningDirection (if the user pressed Save - otherwise it's null)
         */
        if (planningDirection) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.planningDirections.findIndex(
            (existingPlanningDirection) =>
              existingPlanningDirection.id === planningDirection.id
          );
          this.planningDirections[index] = new PlanningDirection(planningDirection);
          this.subject$.next(this.planningDirections);
        }
      });
  }
  deletePlanningDirection(planningDirection: PlanningDirection) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.planningDirectionService.delete(planningDirection).subscribe((response) => {
          this.planningDirections.splice(
            this.planningDirections.findIndex(
              (existingPlanningDirection) => existingPlanningDirection.id === planningDirection.id
            ), 1);
          this.subject$.next(this.planningDirections); 
          this.notificationService.success(NotificationUtil.suppression);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
      },
      () => {})
      }
    })
  }
  ngOnDestroy() {}  
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
}
