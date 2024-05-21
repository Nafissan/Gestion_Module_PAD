import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { ContinentService } from "../../shared/service/continent.service";
import { Continent } from "../../shared/model/continent.model";
import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog } from "@angular/material/dialog";
import { AddContinentComponent } from "../add-continent/add-continent.component";
import { DetailsContinentComponent } from "../details-continent/details-continent.component";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { Agent } from "../../../../shared/model/agent.model";

@Component({
  selector: "fury-list-continent",
  templateUrl: "./list-continent.component.html",
  styleUrls: ["./list-continent.component.scss", "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListContinentComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  date: Date = new Date();
  // currentYear: number = new Date().getFullYear();
  agentsChefStructure: Agent[] = [];
  agentsChefStructureMail: string[] = [];
  currentContinent: Continent = undefined;
  continents: Continent[] = [];
  subject$: ReplaySubject<Continent[]> = new ReplaySubject<Continent[]>(
    1
  );
  data$: Observable<Continent[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Continent> | null;

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
    { name: "Code", property: "code", visible: true, isModelProperty: true },
    { name: "Nom", property: "nom", visible: true, isModelProperty: true },
    { name: "Active", property: "active", visible: true, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },

  ] as ListColumn[];
  constructor(
    private continentService: ContinentService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.getContinents();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((continents) => {
      this.continents = continents;
      this.dataSource.data = continents;
    });
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
  getContinents() {
    this.continentService.getAll().subscribe(
      (response) => {
        this.continents = response.body;
        this.currentContinent = this.continents.find(e => e.active === true);
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.continents.filter(continent => continent.active === true));
        this.showProgressBar = true;
      }
    );
  }

  createContinent() {
    this.dialog
      .open(AddContinentComponent)
      .afterClosed()
      .subscribe((continent: any) => {
        /**
         * Dossier congé is the updated continent (if the user pressed Save - otherwise it's null)
         */ if (continent) {
          /**
           * Here we are updating our local array.
           */
          this.continents.unshift(new Continent(continent));
          this.subject$.next(this.continents);
        }
      });
  }
  updateContinent(continent: Continent) {
    this.dialog
      .open(AddContinentComponent, {
        data: continent,
      })
      .afterClosed()
      .subscribe((continent) => {
        /**
         * Continent is the updated continent (if the user pressed Save - otherwise it's null)
         */
        if (continent) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.continents.findIndex(
            (existingContinent) =>
              existingContinent.id === continent.id
          );
          this.continents[index] = new Continent(continent);
          this.subject$.next(this.continents);
        }
      });
  }
  detailsContinent(continent: Continent) {
    this.dialog
      .open(DetailsContinentComponent, {
        data: continent,
      })
      .afterClosed()
      .subscribe((continent) => {
        /**
         * Continent is the updated continent (if the user pressed Save - otherwise it's null)
         */
        if (continent) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.continents.findIndex(
            (existingContinent) =>
              existingContinent.id === continent.id
          );
          this.continents[index] = new Continent(continent);
          this.subject$.next(this.continents);
        }
      });
  }
  deleteContinent(continent: Continent) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.continentService.delete(continent).subscribe((response) => {
          this.continents.splice(
            this.continents.findIndex(
              (existingContinent) => existingContinent.id === continent.id
            ), 1);
          this.subject$.next(this.continents);
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
