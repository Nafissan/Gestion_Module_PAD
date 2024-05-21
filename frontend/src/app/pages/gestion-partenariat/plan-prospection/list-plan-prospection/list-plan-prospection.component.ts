import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { Agent } from "src/app/shared/model/agent.model";
import { PlanProspectionService } from '../../shared/service/plan-prospection.service'
import { AddOrUpdatePlanProspectionComponent } from "../add-or-update-plan-prospection/add-or-update-plan-prospection.component";
import { DetailsPlanProspectionComponent } from "../details-plan-prospection/details-plan-prospection.component";
import { PlanProspection } from "../../shared/model/plan-prospection.model";
import { ListBesoinComponent } from "../suivi-plan-prospection/list-besoin/list-besoin.component";
import { genererPDF } from "src/app/shared/util/templates/edition_plan_prospection";
import { Prospect } from "../../shared/model/partenaire.model";
import { Besoin } from "../../shared/model/besoin.model";
import { BesoinService } from "../../shared/service/besoin.service";
import { PartenaireService } from "../../shared/service/partenaire.service";

@Component({
  selector: 'fury-list-plan-prospection',
  templateUrl: './list-plan-prospection.component.html',
  styleUrls: ['./list-plan-prospection.component.scss', '../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListPlanProspectionComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  date: Date = new Date();
  // currentYear: number = new Date().getFullYear();
  agentsChefStructure: Agent[] = [];
  agentsChefStructureMail: string[] = [];
  currentPlanprospection: PlanProspection = undefined;
  planprospections: PlanProspection[] = [];
  prospects: Prospect[];
  besoins: Besoin[];
  subject$: ReplaySubject<PlanProspection[]> = new ReplaySubject<PlanProspection[]>(
    1
  );
  data$: Observable<PlanProspection[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<PlanProspection> | null;


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
    { name: "Code ", property: "code", visible: true, isModelProperty: true },
    { name: "Libelle", property: "libelle", visible: true, isModelProperty: true },
    { name: "Annee", property: "annee", visible: true, isModelProperty: true },
    { name: "Active", property: "active", visible: true, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
     
   

  ] as ListColumn[];
  constructor(
    private planprospectionService: PlanProspectionService,
    private besoinService: BesoinService,
    private partenaireService: PartenaireService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.getPlanProspections();
    this.dataSource = new MatTableDataSource();
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
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr = JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  }

  getPlanProspections() {
    this.planprospectionService.getAll().subscribe(
      (response) => {
        this.planprospections = response.body;
      },
      (err) => {
      },
      () => {
        this.showProgressBar = true;
        this.data$.pipe(filter((data) => !!data)).subscribe((planprospections) => {
          this.planprospections = planprospections;
          this.dataSource.data = planprospections;
        });

        this.subject$.next(this.planprospections);

      });
  }

  createPlanProspection() {
    this.dialog
      .open(AddOrUpdatePlanProspectionComponent)
      .afterClosed()
      .subscribe((planprospection: any) => {
        if (planprospection) {

          this.planprospections.unshift(new PlanProspection(planprospection));
          this.subject$.next(this.planprospections);
        }
      });
  }
  updatePlanProspection(planprospection: PlanProspection) {
    this.dialog
      .open(AddOrUpdatePlanProspectionComponent, {
        data: planprospection,
      })
      .afterClosed()
      .subscribe((planprospection) => {
       
        if (planprospection) {
      
          const index = this.planprospections.findIndex(
            (existingPlanProspection) =>
            existingPlanProspection.id === planprospection.id
          );
          this.planprospections[index] = new PlanProspection(planprospection);
          this.subject$.next(this.planprospections);
        }
      });
  }
  
   detailsPlanProspection(planprospection: PlanProspection) {
    this.dialog
      .open(DetailsPlanProspectionComponent, {
        data: planprospection,
      })
      .afterClosed()
      .subscribe((planprospection) => {

        if (planprospection) {

          const index = this.planprospections.findIndex(
            (existingPlanprospection) =>
              existingPlanprospection.id === planprospection.id
          );
          this.planprospections[index] = new PlanProspection(planprospection);
          this.subject$.next(this.planprospections);
        }
      });
  }

  suiviPlanProspection(planprospection: PlanProspection) {
    this.dialog
      .open(ListBesoinComponent, {
        data: planprospection,
      })
      .afterClosed()
      .subscribe((planprospection) => {

        if (planprospection) {

          const index = this.planprospections.findIndex(
            (existingPlanprospection) =>
              existingPlanprospection.id === planprospection.id
          );
          this.planprospections[index] = new PlanProspection(planprospection);
          this.subject$.next(this.planprospections);
        }
      });
  }

  deletePlanProspection(planprospection: PlanProspection) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.planprospectionService.delete(planprospection).subscribe((response) => {
          this.planprospections.splice(
            this.planprospections.findIndex(
              (existingPlanProspection) => existingPlanProspection.id === planprospection.id
            ), 1);
          this.subject$.next(this.planprospections);
          this.notificationService.success(NotificationUtil.suppression);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        }, () => { })
      }
    })
  }

  ngOnDestroy() { }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }

  voirPlanProspection(plan): void{
    let prospects = [];
    let besoins = [];

    this.partenaireService.getProspectsByPlanProspectionId(plan.id).subscribe({
      next: (response) => {
        prospects = response.body;        
      },
      complete: () => {
        if(prospects?.length > 0){
          this.besoinService.getBesoinsByPlan(plan.id).subscribe({
            next: (response) => {
              besoins = response.body;
            },
            complete: () => {
              const lignesProspection = []
              const tableauProspection = [['Identification du Prospect', 'Profil du prospect', 'Nature du Prospect', 'Objectif d\'Accord', 'Durée d\'Accord', 'IDENTIFICATION DES BESOINS DU PROSPECT', 'INTERETS GLOBAL DU PROSPECT','INTERETS DU PAD' ],];
              prospects.forEach(prospect => {
                lignesProspection.push({
                  prospect: prospect,
                  besoins: besoins.filter(besoin => besoin?.partenaires?.find(pBesoin => pBesoin.id == prospect.id))
                })
                let besoinStr = '';
                besoins.filter(besoin => besoin?.partenaires?.find(pBesoin => pBesoin.id == prospect.id)).forEach(item => {
                  besoinStr += item?.libelle + '\n'|| '';
                });

                tableauProspection.push([prospect?.nom ||  ' - ', prospect.profil ||  ' - ', prospect.nature ||  ' - ', prospect.objectifAccord ||  ' - ', prospect.dureeAccord ||  ' - ', besoinStr || ' - ',  prospect.interetGobalProspect ||  ' - ',  prospect.interetPAD ||  ' - '],);
              });
              console.log(tableauProspection);
              
            genererPDF(plan, tableauProspection);
            }
          });
        } else{
          this.notificationService.warn(NotificationUtil.vide);
        }
      }
    });
  }
}
