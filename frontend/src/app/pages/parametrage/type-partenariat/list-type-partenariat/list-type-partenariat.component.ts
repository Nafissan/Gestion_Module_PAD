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
import { TypePartenariat } from "../../shared/model/type-partenariat.model";
import { TypePartenariatService } from "../../shared/service/type-partenariat.service";
import { AddTypePartenariatComponent } from '../add-type-partenariat/add-type-partenariat.component';
import { DetailsTypePartenariatComponent } from '../details-type-partenariat/details-type-partenariat.component';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';


@Component({
  selector: 'fury-list-type-partenariat',
  templateUrl: './list-type-partenariat.component.html',
  styleUrls: ['./list-type-partenariat.component.scss','../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListTypePartenariatComponent implements OnInit {

  showProgressBar: boolean = false;
  date: Date = new Date();
  typePartenariat: TypePartenariat[] = [];
  subject$: ReplaySubject<TypePartenariat[]> = new ReplaySubject<TypePartenariat[]>(
    1
  );
  data$: Observable<TypePartenariat[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<TypePartenariat> | null;

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
    { name: "Code",property: "code",visible: true, isModelProperty: true},
    { name: "Libelle",property: "libelle",visible: true,isModelProperty: true},
    { name: "Active",property: "active",visible: true, isModelProperty: true},
    { name: "creer le",property: "createdAt",visible: false,isModelProperty: true,},
    { name: "mise a jour le", property: "updatedAt",visible: false,isModelProperty: true, },
    { name: "Actions", property: "actions", visible: true },


  ] as ListColumn[];
  constructor(
    private typePartenariatService: TypePartenariatService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private agentService: AgentService
  ) { }

  ngOnInit() {
    this.getTypePartenariat();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((typePartenariat) => {
      this.typePartenariat = typePartenariat;
      this.dataSource.data = typePartenariat;
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
  getTypePartenariat() {
    this.typePartenariatService.getAll().subscribe(
      (response) => {
        this.typePartenariat = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.typePartenariat);
        this.showProgressBar = true;
      });
  }

  createTypePartenariat() {
    this.dialog
      .open(AddTypePartenariatComponent)
      .afterClosed()
      .subscribe((typePartenariat: any) => {
        /**
         * TypePartenariat is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */ if (typePartenariat) {
          /**
           * Here we are updating our local array.
           */
          this.typePartenariat.unshift(new TypePartenariat(typePartenariat));
          this.subject$.next(this.typePartenariat);
        }
      });
  }
  updateTypePartenariat(typePartenariat: TypePartenariat) {
    this.dialog
      .open(AddTypePartenariatComponent, {
        data: typePartenariat,
      })
      .afterClosed()
      .subscribe((typePartenariat) => {
        /**
         * TypePartenariat is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (typePartenariat) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.typePartenariat.findIndex(
            (existingTypePartenariat) =>
            existingTypePartenariat.id === typePartenariat.id
          );
          this.typePartenariat[index] = new TypePartenariat(typePartenariat);
          this.subject$.next(this.typePartenariat);
        }
      });
  }
  detailsTypePartenariat(typePartenariat: TypePartenariat) {
    this.dialog
      .open(DetailsTypePartenariatComponent, {
        data: typePartenariat,
      })
      .afterClosed()
      .subscribe((typePartenariat) => {
        /**
         * TypePartenariat is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (typePartenariat) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.typePartenariat.findIndex(
            (existingTypePartenariat) =>
            existingTypePartenariat.id === typePartenariat.id
          );
          this.typePartenariat[index] = new TypePartenariat(typePartenariat);
          this.subject$.next(this.typePartenariat);
        }
      });
  }
  deleteTypePartenariat(typePartenariat: TypePartenariat) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.typePartenariatService.delete(typePartenariat).subscribe((response) => {
          this.typePartenariat.splice(
            this.typePartenariat.findIndex(
              (existingTypePartenariat) => existingTypePartenariat.id === typePartenariat.id
            ), 1);
          this.subject$.next(this.typePartenariat);
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
