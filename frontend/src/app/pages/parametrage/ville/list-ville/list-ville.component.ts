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
import { Ville } from "../../../../shared/model/ville.model";
import { VilleService } from "../../../../shared/services/ville.service";
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { AddVilleComponent } from '../add-ville/add-ville.component';
import { DetailsVilleComponent } from '../details-ville/details-ville.component';
@Component({
  selector: 'fury-list-ville',
  templateUrl: './list-ville.component.html',
  styleUrls: ['./list-ville.component.scss' ,'../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListVilleComponent implements OnInit {

  showProgressBar: boolean = false;
  date: Date = new Date();
  ville: Ville[] = [];
  subject$: ReplaySubject<Ville[]> = new ReplaySubject<Ville[]>(
    1
  );
  data$: Observable<Ville[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Ville> | null;

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
    { name: "Nom",property: "nom",visible: true,isModelProperty: true},
    { name: "Active",property: "active",visible: true, isModelProperty: true},
    { name: "Pays",property: "pays",visible: true, isModelProperty: true},
    { name: "creer le",property: "createdAt",visible: false,isModelProperty: true,},
    { name: "mise a jour le", property: "updatedAt",visible: false,isModelProperty: true, },
    { name: "Actions", property: "actions", visible: true },


  ] as ListColumn[];
  constructor(
    private villeService: VilleService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private agentService: AgentService
  ) { }

  ngOnInit() {
    this.getVille();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((ville) => {
      this.ville = ville;
      this.dataSource.data = ville;
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
  getVille() {
    this.villeService.getAll().subscribe(
      (response) => {
        this.ville = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.ville);
        this.showProgressBar = true;
      });
  }

  createVille() {
    this.dialog
      .open(AddVilleComponent)
      .afterClosed()
      .subscribe((ville: any) => {
        /**
         * Ville is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */ if (ville) {
          /**
           * Here we are updating our local array.
           */
          this.ville.unshift(new Ville(ville));
          this.subject$.next(this.ville);
        }
      });
  }
  updateVille(ville: Ville) {
    this.dialog
      .open(AddVilleComponent, {
        data: ville,
      })
      .afterClosed()
      .subscribe((ville) => {
        /**
         * Ville is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (ville) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.ville.findIndex(
            (existingVille) =>
            existingVille.id === ville.id
          );
          this.ville[index] = new Ville(ville);
          this.subject$.next(this.ville);
        }
      });
  }
  detailsVille(ville: Ville) {
    this.dialog
      .open(DetailsVilleComponent, {
        data: ville,
      })
      .afterClosed()
      .subscribe((ville) => {
        /**
         * Ville is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (ville) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.ville.findIndex(
            (existingVille) =>
            existingVille.id === ville.id
          );
          this.ville[index] = new Ville(ville);
          this.subject$.next(this.ville);
        }
      });
  }
  deleteVille(ville: Ville) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.villeService.delete(ville).subscribe((response) => {
          this.ville.splice(
            this.ville.findIndex(
              (existingVille) => existingVille.id === ville.id
            ), 1);
          this.subject$.next(this.ville);
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
