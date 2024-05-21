import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { SuiviDotation } from '../../shared/models/suiviDotation.model';
import { SuiviDotationService } from '../../shared/services/suivi-dotation.service';
import { AddOrUpdateSuiviDemandeLaitComponent } from '../add-or-update-suivi-demande-lait/add-or-update-suivi-demande-lait.component';
import { CorrectionAttributionComponent } from '../correction-attribution/correction-attribution.component';


@Component({
  selector: 'fury-list-suivi-demande-lait',
  templateUrl: './list-suivi-demande-lait.component.html',
  styleUrls: ['./list-suivi-demande-lait.component.scss', '../../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListSuiviDemandeLaitComponent implements OnInit {

  idDotation: number;
  showProgressBar: boolean = false;
  date: Date = new Date();

  agentsChefStructureMail: string[] = [];
  currentSuiviDotation: SuiviDotation = undefined;
  suiviDotations: SuiviDotation[] = [];
  subject$: ReplaySubject<SuiviDotation[]> = new ReplaySubject<SuiviDotation[]>(
    1
  );
  data$: Observable<SuiviDotation[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<SuiviDotation> | null;

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
    { name: "Bénéficiaire", property: "beneficiaire", visible: true, isModelProperty: true },
    { name: "Nombre de pots", property: "nbreArticleAttribue", visible: true, isModelProperty: true },
    { name: "Catégorie", property: "categorie", visible: true, isModelProperty: true },
    { name: "Date Attribution", property: "dateAttribution", visible: true, isModelProperty: true },
    { name: "Traité par", property: "agent", visible: true, isModelProperty: true },
    { name: "Actions", property: "action", visible: true },

  ] as ListColumn[];
  constructor(
    private suiviDotationService: SuiviDotationService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((suiviDotations) => {
      this.suiviDotations = suiviDotations;
      this.dataSource.data = suiviDotations;
    });


    //Recupère l'id du stock selectionnéee
    this.route.paramMap.subscribe((params) => {
      this.idDotation = parseInt(params.get("id"));
    });

    this.getSuiviDotations();
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
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr = JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  }
  getSuiviDotations() {
    this.suiviDotationService.getAll(this.idDotation).subscribe(
      (response) => {
        this.suiviDotations = response.body;
        // this.suiviDotations = this.suiviDotations.filter(s => s.dotation.id === this.idDotation);
      },
      (err) => {
      },
      () => {
        console.log(this.suiviDotations);
        this.subject$.next(this.suiviDotations);
        this.showProgressBar = true;
      }
    );
  }

  createSuiviDotation() {
    this.dialog
      .open(AddOrUpdateSuiviDemandeLaitComponent)
      .afterClosed()
      .subscribe((suiviDotation: any) => {
        /**
         * SuiviDotation is the updated continent (if the user pressed Save - otherwise it's null)
         */ if (suiviDotation) {
          /**
           * Here we are updating our local array.
           */
          this.suiviDotations.unshift(new SuiviDotation(suiviDotation));
          this.subject$.next(this.suiviDotations);
        }
      });
  }
  updateSuiviDotation(SuiviDotation: SuiviDotation) {
    this.dialog
      .open(AddOrUpdateSuiviDemandeLaitComponent, {
        data: SuiviDotation,
      })
      .afterClosed()
      .subscribe((SuiviDotation) => {
        /**
         * SuiviDotation is the updated continent (if the user pressed Save - otherwise it's null)
         */
        if (SuiviDotation) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.suiviDotations.findIndex(
            (existingSuiviStock) =>
              existingSuiviStock.id === SuiviDotation.id
          );
          this.suiviDotations[index] = new SuiviDotation(SuiviDotation);
          this.subject$.next(this.suiviDotations);
        }
      });
  }


  corrigerAttribution(row) {
    this.dialog
      .open(CorrectionAttributionComponent, {
        data: row,
      })
      .afterClosed()
      .subscribe((suiviDotation: any) => {
      /**
       * suiviDotation is the updated continent (if the user pressed Save - otherwise it's null)
       */ if (suiviDotation) {
        }
      });
  }
  deleteSuiviDotation(SuiviDotation: SuiviDotation) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.suiviDotationService.delete(SuiviDotation).subscribe((response) => {
          this.suiviDotations.splice(
            this.suiviDotations.findIndex(
              (existingSuiviDotation) => existingSuiviDotation.id === SuiviDotation.id
            ), 1);
          this.subject$.next(this.suiviDotations);
          this.notificationService.success(NotificationUtil.suppression);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        }, () => { })
      }
    })
  }

  voirAcquistion() {

    this.router.navigate(['/dotation/suivi-SuiviDemande-lait']);
  }

  ngOnDestroy() { }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }

}
