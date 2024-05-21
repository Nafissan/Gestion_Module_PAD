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



// tslint:disable-next-line:no-duplicate-imports

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';

import * as _moment from "moment";
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from "moment";
import { FormControl } from '@angular/forms';
import { formatDateEnMois } from 'src/app/shared/util/formatageDate';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: "YYYY",
  },
  display: {
    dateInput: "YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
const MOIS: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
@Component({
  selector: 'fury-valider-attribution-lait',
  templateUrl: './valider-attribution-lait.component.html',
  styleUrls: ['./valider-attribution-lait.component.scss', '../../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class ValiderAttributionLaitComponent implements OnInit {


  @ViewChild(MatDatepicker) picker;


  anneeSelected = new Date().getFullYear();
  mois = formatDateEnMois(new Date());
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
  pageSize = 10;
  dataSource: MatTableDataSource<SuiviDotation> | null;

  filteredMois: string[];

  dateV = new FormControl(moment());
  moisCourantCtl: FormControl = new FormControl();
  annee = new Date().getFullYear();

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
    { name: "Etat", property: "etat", visible: true, isModelProperty: true },
    { name: "Mois", property: "mois", visible: false, isModelProperty: true },
    { name: "Date Attribution", property: "dateAttribution", visible: true, isModelProperty: true },
    { name: "Dernière Modification", property: "updatedAt", visible: false, isModelProperty: true },
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
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.filteredMois = MOIS;
    this.getSuiviDotationsByAnneAndMois(this.annee, this.mois);

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((suiviDotations) => {
      this.suiviDotations = suiviDotations;
      this.dataSource.data = suiviDotations;
    });

    this.moisCourantCtl.setValue(formatDateEnMois(new Date()));

    //Recupère l'id du stock selectionnéee
    this.route.paramMap.subscribe((params) => {
      this.idDotation = parseInt(params.get("id"));
    });

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  setMois(mois) {
    this.getSuiviDotationsByAnneAndMois(this.anneeSelected, this.moisCourantCtl.value)
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
  getSuiviDotationsByAnneAndMois(annee, mois) {
    this.suiviDotationService.getByAnneeAndMois(annee, mois).subscribe(
      (response) => {
        this.suiviDotations = response.body;
        this.suiviDotations = this.suiviDotations.sort((a, b) => (a.id > b.id ? -1 : 1));
      },
      (err) => {
      },
      () => {
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

  validerDotation(suiviDotation: SuiviDotation) {

    // suiviDotation.mois = this.mois;
    this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
      if (action === DialogUtil.confirmer) {
        suiviDotation.etat = "VALIDER";
        this.suiviDotationService.create(suiviDotation).subscribe(
          (response) => {
            this.notificationService.success(NotificationUtil.ajout);
            // this.dialogRef.close(response.body);
          },
          (error) => {
            this.notificationService.warn(error.error.message);
          },
          () => {
          }
        );
      } else {
        // this.dialogRef.close();
      }
    });
  }

  yearSelected(params) {
    this.dateV.setValue(params);
    this.anneeSelected = params.year();
    this.picker.close();
    this.getSuiviDotationsByAnneAndMois(this.anneeSelected, this.moisCourantCtl.value)
  }
  voirAcquistion() {

    this.router.navigate(['/dotation/suivi-SuiviDemande-lait']);
  }

  ngOnDestroy() { }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }


  annulerAttribution(suiviDotation: SuiviDotation) {

    suiviDotation.etat = "ANNULER";
    // suiviDotation.mois = this.mois;
    this.dialogConfirmationService.confirmationDialog().subscribe((action) => {
      if (action === DialogUtil.confirmer) {
        this.suiviDotationService.create(suiviDotation).subscribe(
          (response) => {
            this.notificationService.success(NotificationUtil.ajout);
            // this.dialogRef.close(response.body);
          },
          (error) => {
            this.notificationService.warn(error.error.message);
          },
          () => {
          }
        );
      } else {
        // this.dialogRef.close();
      }
    });
  }
}
