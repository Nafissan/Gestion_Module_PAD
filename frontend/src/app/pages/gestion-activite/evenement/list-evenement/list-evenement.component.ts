import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { Agent } from 'src/app/shared/model/agent.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { Evenement} from '../../shared/model/evenement.model';
import { EvenementService} from '../../shared/service/evenement.service';
import { AddOrUpdateEvenementComponent } from '../add-or-update-evenement/add-or-update-evenement.component';
import { DetailsEvenementComponent } from '../details-evenement/details-evenement.component';

@Component({
  selector: 'fury-list-evenement',
  templateUrl: './list-evenement.component.html',
  styleUrls: ['./list-evenement.component.scss','../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListEvenementComponent implements OnInit {
  showProgressBar: boolean = false;
  liste: boolean = true;
  date: Date = new Date();
  agentsChefStructure: Agent[] = [];
  agentsChefStructureMail: string[] = [];
  currentEvenement: Evenement = undefined;
  current: Evenement = undefined;
  evenements: Evenement[] = [];
  subject$: ReplaySubject<Evenement[]> = new ReplaySubject<Evenement[]>(
    1
  );
  data$: Observable<Evenement[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Evenement> | null;

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
    { name: "Code ", property: "code", visible: false, isModelProperty: true },
    { name: "Libelle ", property: "libelle", visible: true, isModelProperty: true },
    
    { name: "Date Debut", property: "datedebut", visible: true, isModelProperty: true },
    { name: "Date Fin ", property: "datefin", visible: true, isModelProperty: true },
    { name: "Statut",property: "statut",visible: true, isModelProperty: true},
    { name: "Active", property: "active", visible: false, isModelProperty: true },
    { name: "Actions", property: "action", visible: true },

  ] as ListColumn[];
  constructor(
    private evenementService: EvenementService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.getEvenements();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((evenements) => {
      this.evenements = evenements;
      this.dataSource.data = evenements;
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

  getEvenements() {
    this.evenementService.getAll().subscribe(
      (response) => {
        this.evenements = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.evenements);
        this.showProgressBar = true;
      });
  }

  createEvenement() {
    this.dialog
      .open(AddOrUpdateEvenementComponent)
      .afterClosed()
      .subscribe((evenement: any) => {
        /**
         * evenement is the updated continent (if the user pressed Save - otherwise it's null)
         */ if (evenement) {
          /**
           * Here we are updating our local array.
           */
          this.evenements.unshift(new Evenement(evenement));
          this.subject$.next(this.evenements);
        }
      });
  }
  updateEvenement(evenement: Evenement) {
    this.dialog
      .open(AddOrUpdateEvenementComponent, {
        data: evenement,
      })
      .afterClosed()
      .subscribe((evenement) => {
    
        if (evenement) {
          
          const index = this.evenements.findIndex(
            (existingEvenement) =>
            existingEvenement.id === evenement.id
          );
          this.evenements[index] = new Evenement(evenement);
          this.subject$.next(this.evenements);
        }
      });
  }
  
  detailsEvenement(evenement: Evenement) {
    this.dialog
      .open(DetailsEvenementComponent, {
        data: evenement,
      })
      .afterClosed()
      .subscribe((evenement) => {
        /**
         * evenement is the updated continent (if the user pressed Save - otherwise it's null)
         */
        if (evenement) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.evenements.findIndex(
            (existingEvenement) =>
            existingEvenement.id === evenement.id
          );
          this.evenements[index] = new Evenement(evenement);
          this.subject$.next(this.evenements);
        }
      });
  }
  deleteEvenement(evenement: Evenement) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.evenementService.delete(evenement).subscribe((response) => {
          this.evenements.splice(
            this.evenements.findIndex(
              (existingEvenement) => existingEvenement.id === evenement.id
            ), 1);
          this.subject$.next(this.evenements);
          this.notificationService.success(NotificationUtil.suppression);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        }, () => { })
      }
    })
  }
  affichage(){
    this.liste=!this.liste
  }
  ngOnDestroy() { }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }

}
