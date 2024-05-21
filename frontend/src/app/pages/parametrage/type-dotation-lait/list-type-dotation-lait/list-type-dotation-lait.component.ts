import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AgentService } from 'src/app/shared/services/agent.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { TypeDotation } from "../../shared/model/type-dotation.model";
import { AddOrUpdateTypeDotationLaitComponent } from '../add-or-update-type-dotation-lait/add-or-update-type-dotation-lait.component';
import { DetailsTypeDotationLaitComponent } from '../details-type-dotation-lait/details-type-dotation-lait.component';
import { TypeDotationService } from '../../shared/service/type-dotation.service';


@Component({
  selector: 'fury-list-type-dotation-lait',
  templateUrl: './list-type-dotation-lait.component.html',
  styleUrls: ['./list-type-dotation-lait.component.scss','../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListTypeDotationLaitComponent implements OnInit {

  showProgressBar: boolean = false;
  date: Date = new Date();
  typeDotationLait: TypeDotation[] = [];
  subject$: ReplaySubject<TypeDotation[]> = new ReplaySubject<TypeDotation[]>(
    1
  );
  data$: Observable<TypeDotation[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<TypeDotation> | null;

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
    { name: "Checkbox", property: "checkbox", visible: true },
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    { name: "Libelle",property: "libelle",visible: true,isModelProperty: true},
    { name: "Nombre Article",property: "nbreArticle",visible: true, isModelProperty: true},
    { name: "Nombre Mois",property: "nbreMois",visible: true, isModelProperty: true},
    { name: "creer le",property: "createdAt",visible: false,isModelProperty: true,},
    { name: "mise a jour le", property: "updatedAt",visible: false,isModelProperty: true, },
    { name: "Actions", property: "actions", visible: true },


  ] as ListColumn[];
  constructor(
    private typeDotationService: TypeDotationService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private agentService: AgentService
  ) { }

  ngOnInit() {
    this.getTypeDotationLait();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((typeDotationLait) => {
      this.typeDotationLait = typeDotationLait;
      this.dataSource.data = typeDotationLait;
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
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr = JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  }
  getTypeDotationLait() {
    this.typeDotationService.getAll().subscribe(
      (response) => {
        this.typeDotationLait = response.body;
      },
      (err) => {
      },
      () => {
        console.log(this.typeDotationLait);
        
        this.subject$.next(this.typeDotationLait);
        this.showProgressBar = true;
      });
  }

  createTypeDotationLait() {
    this.dialog
      .open(AddOrUpdateTypeDotationLaitComponent)
      .afterClosed()
      .subscribe((typeDotationLait: any) => {
        /**
         * TypeDotationLait is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */ if (typeDotationLait) {
          /**
           * Here we are updating our local array.
           */
          this.typeDotationLait.unshift(new TypeDotation(typeDotationLait));
          this.subject$.next(this.typeDotationLait);
        }
      });
  }
  updateTypeDotationLait(typeDotationLait: TypeDotation) {
    this.dialog
      .open(AddOrUpdateTypeDotationLaitComponent, {
        data: typeDotationLait,
      })
      .afterClosed()
      .subscribe((typeDotationLait) => {
        /**
         * TypeDotationLait is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (typeDotationLait) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.typeDotationLait.findIndex(
            (existingTypeDotationLait) =>
            existingTypeDotationLait.id === typeDotationLait.id
          );
          this.typeDotationLait[index] = new TypeDotation(typeDotationLait);
          this.subject$.next(this.typeDotationLait);
        }
      });
  }
  detailsTypeDotationLait(typeDotationLait: TypeDotation) {
    this.dialog
      .open(DetailsTypeDotationLaitComponent, {
        data: typeDotationLait,
      })
      .afterClosed()
      .subscribe((typeDotationLait) => {
        /**
         * TypeDotationLait is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (typeDotationLait) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.typeDotationLait.findIndex(
            (existingTypeDotationLait) =>
            existingTypeDotationLait.id === typeDotationLait.id
          );
          this.typeDotationLait[index] = new TypeDotation(typeDotationLait);
          this.subject$.next(this.typeDotationLait);
        }
      });
  }
  deleteTypeDotationLait(typeDotationLait: TypeDotation) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.typeDotationService.delete(typeDotationLait).subscribe((response) => {
          this.typeDotationLait.splice(
            this.typeDotationLait.findIndex(
              (existingTypeDotationLait) => existingTypeDotationLait.id === typeDotationLait.id
            ), 1);
          this.subject$.next(this.typeDotationLait);
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
}
