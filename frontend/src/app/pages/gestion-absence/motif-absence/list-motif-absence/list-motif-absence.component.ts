import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Motif} from '../../shared/model/motif.model';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { MatDialog } from '@angular/material/dialog';
import { MotifService } from '../../shared/service/motif.service';
import { filter } from 'rxjs/operators';
import { AddMotifAbsenceComponent } from '../add-motif-absence/add-motif-absence.component';
import { DetailsMotifAbsenceComponent } from '../details-motif-absence/details-motif-absence.component';
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, NotificationUtil } from '../../../../shared/util/util';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'fury-list-motif-absence',
  templateUrl: './list-motif-absence.component.html',
  styleUrls: ['./list-motif-absence.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListMotifAbsenceComponent implements OnInit, AfterViewInit, OnDestroy {
  dialogUtil: DialogUtil = new DialogUtil();
  motifs: Motif[];
  motif: Motif;
  subject$: ReplaySubject<Motif[]> = new ReplaySubject<Motif[]>(
    1
  );
  data$: Observable<Motif[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Motif> | null;


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

     { name: "Description", 
     property: "description",
      visible: true, 
      isModelProperty: true,
      },
  
     { name: "jour",
      property: "jours",
      visible: true,
      isModelProperty: true,
     },
   
    { name: "Actions", property: "actions", visible: true },


  ] as ListColumn[];
  constructor(
    private motifService:  MotifService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.getMotifs();

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter((data) => !!data)).subscribe((motifs) => {
      this.motifs = motifs;
      this.dataSource.data = motifs;
    });
  
  }
  
  getMotifs() {
    this.motifService.getAll().subscribe(
      (response) => {
        this.motifs = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.motifs);
      }
    );
  }
  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
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
  ngOnDestroy() {}
  createMotif() {
    this.dialog
      .open(AddMotifAbsenceComponent)
      .afterClosed()
      .subscribe((motif: any) => {
        /**
         * Dossier congé is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */ if (motif) {

          this.motifs.unshift(new Motif(motif));
          this.subject$.next(this.motifs);
        }
      });
  }
  updateMotif(motif: Motif) {
    this.dialog
      .open(AddMotifAbsenceComponent, {
        data: motif,
      })
      .afterClosed()
      .subscribe((customer) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (motif) {
          const index = this.motifs.findIndex(
            (existingMotif) =>
            existingMotif.id === motif.id
          );
          this.motifs[index] = new Motif(customer);
          this.subject$.next(this.motifs);
        }
      });
  }

  deleteMotif(motif: Motif) {

    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer){
    this.motifService.delete(motif).subscribe((response) => {

      this.notificationService.success(NotificationUtil.suppression)
      this.motifs.splice(
        this.motifs.findIndex(
          (existingMotif) => existingMotif.id === motif.id
        ),
        1
      );
      this.subject$.next(this.motifs);
      })
    }
  })
  }
  detailsMotif(motif: Motif) {
    this.dialog
      .open(DetailsMotifAbsenceComponent, {
        data: motif,
      })
      .afterClosed()
      .subscribe((motif) => {
 
        if (motif) {

          const index = this.motifs.findIndex(
            (existingMotif) =>
            existingMotif.id === motif.id
          );
          this.motifs[index] = new Motif(motif);
          this.subject$.next(this.motifs);
        }
      });
  }

}
