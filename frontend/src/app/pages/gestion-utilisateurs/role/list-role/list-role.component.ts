import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { Role } from '../../shared/model/role.model';
import { ReplaySubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { RoleService } from '../../shared/services/role.service';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { CreateUpdateRoleComponent } from '../create-update-role/create-update-role.component';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { NotificationUtil } from '../../../../shared/util/util';
import { AuthenticationService } from '../../../../shared/services/authentification.service';


@Component({
  selector: 'fury-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListRoleComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  roles: Role[];
  subject$: ReplaySubject<Role[]> = new ReplaySubject<Role[]>(1);
  data$: Observable<Role[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Role> | null;

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
    {
      name: "ID",
      property: "id",
      visible: false,
      isModelProperty: true,
    },
    {
      name: "Nom",
      property: "nomRole",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Description",
      property: "description",
      visible: true,
      isModelProperty: true,
    },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    private roleService: RoleService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private authentificationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getRoles();
    this.dataSource = new MatTableDataSource();
  }
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getRoles() {
    this.roleService.getAll().subscribe(
      (response) => {
        this.roles = response.body;
      },
      (err) => {
        this.showProgressBar = true;
      },
      () => {
        
        this.showProgressBar = true;
        this.data$.pipe(filter((data) => !!data)).subscribe((roles) => {
          this.roles = roles;
          this.dataSource.data = roles;
        });
        this.subject$.next(this.roles);
      }
    );
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

  ngOnDestroy() { }
  createRole() {
    this.dialog
      .open(CreateUpdateRoleComponent)
      .afterClosed()
      .subscribe((role: any) => {
        /**
         * Dossier congé is the updated role (if the user pressed Save - otherwise it's null)
         */ if (role) {
          /**
           * Here we are updating our local array.
           */
          this.roles.unshift(role);
          this.subject$.next(this.roles);
        }
      });
  }
  updateRole(role: Role) {
    this.dialog
      .open(CreateUpdateRoleComponent, {
        data: role,
      })
      .afterClosed()
      .subscribe((role) => {
        /**
         * Customer is the updated role (if the user pressed Save - otherwise it's null)
         */
        if (role) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.roles.findIndex(
            (existingRole) =>
              existingRole.id === role.id
          );
          this.roles[index] = role;
          this.subject$.next(this.roles);
        }
      });
  }
  deleteRole(role: Role) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === 'CONFIRMER') {
        this.roleService.delete(role).subscribe((response) => {
          this.notificationService.success(NotificationUtil.suppression)
          this.roles.splice(
            this.roles.findIndex((existingRole) => existingRole.id === role.id), 1);
          this.subject$.next(this.roles);
        });
      } 
    })
  }
}
