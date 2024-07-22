import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Observable } from 'rxjs';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { SatisfactionService } from '../../shared/service/satisfaction.service';
import { Satisfaction } from '../../shared/model/satisfaction.model';
import { AddOrUpdateSatisfactionComponent } from '../add-or-update-satisfaction/add-or-update-satisfaction.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { filter, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DetailsSatisfactionComponent } from '../details-satisfaction/details-satisfaction.component';
import { DossierColonieService } from '../../shared/service/dossier-colonie.service';
import { EtatDossierColonie } from '../../shared/util/util';
import { DossierColonie } from '../../shared/model/dossier-colonie.model';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { QuestionService } from '../../shared/service/question.service';
import { Question } from '../../shared/model/question.model';
import { columnSelectionBegin } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'fury-liste-satisfaction',
  templateUrl: './liste-satisfaction.component.html',
  styleUrls: ['./liste-satisfaction.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListeSatisfactionComponent implements OnInit {
  satisfactions: Satisfaction;
  pageSize = 10;
  showProgressBar: boolean = false;
  selection = new SelectionModel<Satisfaction>(true, []);
  satisfactionSelected: Satisfaction;
  questions: Question[] = [];
  private paginator: MatPaginator;
  private sort: MatSort;
  dossierColonie: DossierColonie;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: true },
    { name: "Code Dossier Colonie", property: "codeDossier", visible: true, isModelProperty: true },
    { name: "Date de creation", property: "dateCreation", visible: true, isModelProperty: true },
    { name: "Ajoute par", property: "traitePar", visible: true },
    { name: "Actions", property: "actions", visible: true }
  ] as ListColumn[];

  constructor(
    private satisfactionService: SatisfactionService,
    private questionService: QuestionService,
    private dialog: MatDialog,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    private dossierColonieService: DossierColonieService
  ) {}

  ngOnInit(): void {
    this.getSatisfactions();
    this.getDossierColonie();
  }

  ngAfterViewInit() {
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
   
  }

  get visibleColumns() {
    return this.columns.filter((column) => column.visible).map((column) => column.property);
  }

  

  getSatisfactions() {
   
      this.satisfactionService.getFormulaireByDossierEtat().subscribe(response => {
        this.satisfactions = response.body as Satisfaction;
      }, err => {
        console.error('Error loading participant colonies:', err);
      }, () => {
        this.showProgressBar = true;
      });
  }
  
  getDossierColonie(){
    this.dossierColonieService.getDossier().subscribe(
      (response) => {
          this.dossierColonie = response.body as DossierColonie;
      },
      (err) => {
        console.error('Error loading dossier colonie:', err);
      })
  }
  refresh() { this.getSatisfactions();
  }

  

  createSatisfaction() {
    this.dialog
      .open(AddOrUpdateSatisfactionComponent)
      .afterClosed().subscribe((satisfaction: Satisfaction) => {
        if (satisfaction) {
          this.satisfactions=satisfaction;
        }
      });
      this.refresh();
  }

  updateSatisfaction(satisfaction: Satisfaction) {
    this.dialog
      .open(AddOrUpdateSatisfactionComponent, {
        data: satisfaction,
      })
      .afterClosed()
      .subscribe((satisfaction: Satisfaction) => {
        if (satisfaction) {
         this.satisfactions=satisfaction;
          this.refresh();
        }
      })
  }

  deleteSatisfaction(satisfaction: Satisfaction) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.satisfactionService.deleteSatisfaction(satisfaction).subscribe((response) => {
          this.satisfactions=null;
          this.notificationService.success(NotificationUtil.suppression);
          this.refresh();
        }
          , err => {
            this.notificationService.warn(NotificationUtil.echec);
          });
      }
    })
  }

  detailsSatisfaction(satisfaction: Satisfaction) {
    this.dialog
      .open(DetailsSatisfactionComponent, { data: satisfaction })
      .afterClosed()
      .subscribe((satisfaction: Satisfaction) => {
        if (satisfaction) {
         this.satisfactions=satisfaction;
         this.refresh();
        }
      })
  }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
}
