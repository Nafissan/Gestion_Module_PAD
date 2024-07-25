import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SatisfactionPelerinage } from '../../shared/model/satisfaction-pelerinage.model';
import { QuestionPelerinage } from '../../shared/model/question-pelerinage.model';
import { SatisfactionPelerinageService } from '../../shared/services/satisfaction-pelerinage.service';
import { QuestionPelerinageService } from '../../shared/services/question.service';
import { DossierPelerinageService } from '../../shared/services/dossier-pelerinage.service';
import { DossierPelerinage } from '../../shared/model/dossier-pelerinage.model';
import { AddOrUpdateSatisfactionPelerinageComponent } from '../add-or-update-satisfaction-pelerinage/add-or-update-satisfaction-pelerinage.component';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { DetailsSatisfactionPelerinageComponent } from '../details-satisfaction-pelerinage/details-satisfaction-pelerinage.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Observable } from 'rxjs';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { filter } from 'rxjs/operators';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-list-satisfaction-pelerinage',
  templateUrl: './list-satisfaction-pelerinage.component.html',
  styleUrls: ['./list-satisfaction-pelerinage.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]

})
export class ListSatisfactionPelerinageComponent implements OnInit {
  satisfactions: SatisfactionPelerinage[]=[];
  subject$: ReplaySubject<SatisfactionPelerinage[]> = new ReplaySubject<SatisfactionPelerinage[]>(1);
  data$: Observable<SatisfactionPelerinage[]> = this.subject$.asObservable();
  pageSize = 4;  showProgressBar: boolean = false;
  selection = new SelectionModel<SatisfactionPelerinage>(true, []);
  satisfactionSelected: SatisfactionPelerinage;
  questions: QuestionPelerinage[] = [];
  private paginator: MatPaginator;
  private sort: MatSort;
  dossiersPelerinage: DossierPelerinage;
  dataSource: MatTableDataSource<SatisfactionPelerinage> | null;

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
    { name: "Code Dossier Pèlerinage", property: "dossierPelerinage", visible: true, isModelProperty: true },
    { name: "Date de creation", property: "dateCreation", visible: true, isModelProperty: true },
    { name: "Ajoute par", property: "traitePar", visible: true },
    { name: "Actions", property: "actions", visible: true }
  ] as ListColumn[];

  constructor(
    private satisfactionService: SatisfactionPelerinageService,
    private questionService: QuestionPelerinageService,
    private dialog: MatDialog,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    private dossierPelerinageService: DossierPelerinageService
  ) {}

  ngOnInit(): void {
    this.getDossierPelerinage();
    this.getSatisfactions();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((satisfaction) => {
      this.satisfactions = satisfaction;
      this.dataSource.data = satisfaction;
    });
  }

  ngAfterViewInit() {
    this.setDataSourceAttributes();
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
  checkboxLabel(row?: SatisfactionPelerinage): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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
    this.satisfactionService.getFormulaireByDossierEtat().subscribe(response => {
      this.satisfactions = response.body as SatisfactionPelerinage[];
    }, err => {
      console.error('Error loading satisfactions:', err);
    }, () => {
      this.subject$.next(this.satisfactions);
      this.showProgressBar = true;
    });
  }
  
  getDossierPelerinage() {
    this.dossierPelerinageService.getDossier().subscribe(
      (response) => {
          this.dossiersPelerinage = response.body as DossierPelerinage;
      },
      (err) => {
        console.error('Error loading dossier pèlerinage:', err);
      });
  }

  refresh() { 
    this.getSatisfactions();
  }

  createSatisfaction() {
    this.dialog
      .open(AddOrUpdateSatisfactionPelerinageComponent)
      .afterClosed().subscribe((satisfaction: SatisfactionPelerinage) => {
        if (satisfaction) {
          this.satisfactions.unshift(new SatisfactionPelerinage(satisfaction));
          this.subject$.next(this.satisfactions);         
           this.refresh();
        }
      });
  }

  updateSatisfaction(satisfaction: SatisfactionPelerinage) {
    this.dialog
      .open(AddOrUpdateSatisfactionPelerinageComponent, {
        data: satisfaction,
      })
      .afterClosed()
      .subscribe((satisfaction: SatisfactionPelerinage) => {
        if (satisfaction) {
          const index = this.satisfactions.findIndex(
            (existingSatisfactionPelerinage) =>
              existingSatisfactionPelerinage.id === satisfaction.id
          );
          this.satisfactions[index] = new SatisfactionPelerinage(satisfaction);
          this.subject$.next(this.satisfactions);
            this.refresh();
          }
      });
  }

  deleteSatisfaction(satisfaction: SatisfactionPelerinage) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.satisfactionService.deleteSatisfaction(satisfaction).subscribe((response) => {
          this.satisfactions.splice(
            this.satisfactions.findIndex(
              (existingParticipant) => existingParticipant.id === satisfaction.id
            ),
            1
          );
          this.notificationService.success(NotificationUtil.suppression)
          this.subject$.next(this.satisfactions);
          this.refresh();
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        });
      }
    });
  }

  detailsSatisfaction(satisfaction: SatisfactionPelerinage) {
    this.dialog
      .open(DetailsSatisfactionPelerinageComponent, { data: satisfaction })
      .afterClosed()
      .subscribe((satisfaction: SatisfactionPelerinage) => {
        if (satisfaction) {
          const index = this.satisfactions.findIndex((s) => s.id === satisfaction.id);
          if (index !== -1) {
            this.satisfactions[index] = new SatisfactionPelerinage(satisfaction);
            this.subject$.next(this.satisfactions);        
                this.refresh();
          }
        }
      });
  }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
}