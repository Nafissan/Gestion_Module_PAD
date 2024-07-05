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
  satisfactions: Satisfaction[] = [];
  subject$: ReplaySubject<Satisfaction[]> = new ReplaySubject<Satisfaction[]>(1);
  data$: Observable<Satisfaction[]> = this.subject$.asObservable();
  pageSize = 10;
  dataSource: MatTableDataSource<Satisfaction> | null;
  showProgressBar: boolean = false;
  selection = new SelectionModel<Satisfaction>(true, []);
  satisfactionSelected: Satisfaction;
  canAdd: boolean = false;
  dossierColonies: DossierColonie;
  filteredSatisfaction: Satisfaction[] = [];
  questions: Question[] = [];
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
    this.getQuestions();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((satisfaction) => {
      this.satisfactions = satisfaction;
      this.dataSource.data = satisfaction;
    });
  }

  ngAfterViewInit() {
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  get visibleColumns() {
    return this.columns.filter((column) => column.visible).map((column) => column.property);
  }

  

  getSatisfactions() {
    this.dossierColonieService.getDossier().subscribe(dossiers => {
      this.dossierColonies = dossiers.body as DossierColonie;  
      this.satisfactionService.getAllSatisfactions().subscribe(response => {
        this.satisfactions = response.body;
  
        this.filteredSatisfaction = this.satisfactions.filter(participant => this.dossierColonies &&
           this.dossierColonies.id === participant.codeDossier.id)
  
        if (this.dossierColonies && this.filteredSatisfaction.length === 0) {
          this.canAdd = true;
        }

      }, err => {
        console.error('Error loading participant colonies:', err);
      }, () => {
        this.subject$.next(this.filteredSatisfaction);
        this.showProgressBar = true;
      });
    });
  }
  

  getQuestions() {
    this.questionService.getAllQuestions().subscribe(questions => {
      this.questions = questions.body;
    });
  }

  refresh() { this.getSatisfactions();
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim().toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(value) != -1;
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Satisfaction): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  createSatisfaction() {
    this.dialog
      .open(AddOrUpdateSatisfactionComponent)
      .afterClosed().subscribe((satisfaction: Satisfaction) => {
        if (satisfaction) {
          this.satisfactions.unshift(satisfaction);
          this.subject$.next(this.satisfactions);
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
          const index = this.satisfactions.findIndex(
            (existingsatisfaction) =>
              existingsatisfaction.id === satisfaction.id
          );
          this.satisfactions[index] = new Satisfaction(satisfaction);
          this.subject$.next(this.satisfactions);
          this.refresh();
        }
      })
  }

  deleteSatisfaction(satisfaction: Satisfaction) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.satisfactionService.deleteSatisfaction(satisfaction).subscribe((response) => {
          this.satisfactions.splice(
            this.satisfactions.findIndex(
              (existingsatisfaction) => existingsatisfaction.id === satisfaction.id
            ),
            1
          );
          this.notificationService.success(NotificationUtil.suppression);
          this.refresh();
          this.subject$.next(this.satisfactions);
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
          const index = this.satisfactions.findIndex(
            (existing) => existing.id === satisfaction.id
          );
          this.satisfactions[index] = new Satisfaction(satisfaction);
          this.subject$.next(this.satisfactions);
        }
      })
  }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
}
