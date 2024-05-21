import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from "@angular/core";
import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil, NotificationUtil } from "../../../../shared/util/util";
import { AuthenticationService } from "../../../../shared/services/authentification.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { Agent } from "src/app/shared/model/agent.model";
import { Partenaire } from '../../shared/model/partenaire.model'
import { PartenaireService } from '../../shared/service/partenaire.service'
import { AddOrUpdatePartenariatComponent } from "../add-or-update-partenariat/add-or-update-partenariat.component";
import { DetailsPartenariatComponent } from "../details-partenariat/details-partenariat.component";

@Component({
  selector: 'fury-list-partenariat',
  templateUrl: './list-partenariat.component.html',
  styleUrls: ['./list-partenariat.component.scss' ,'../../../../shared/util/bootstrap4.css'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ListPartenariatComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  date: Date = new Date();
  
  agentsChefStructure: Agent[] = [];
  agentsChefStructureMail: string[] = [];
  currentPartenaire: Partenaire = undefined;
  partenaires: Partenaire[] = [];
  subject$: ReplaySubject<Partenaire[]> = new ReplaySubject<Partenaire[]>(
    1
  );
  data$: Observable<Partenaire[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Partenaire> | null;

  // -----Utliser pour la pagination et le tri des listes--------
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  private paginator: MatPaginator;
  private sort: MatSort;
  displayList: boolean = true;
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
    { name: "Nom ", property: "nom", visible: true, isModelProperty: true },
    { name: "Email", property: "email", visible: true, isModelProperty: true },
    { name: "Telephone", property: "telephone", visible: false, isModelProperty: true },
    { name: "Adresse", property: "adresse", visible: true, isModelProperty: true },
    { name: "Fax", property: "fax", visible: false, isModelProperty: true },
    { name: "SiteWeb", property: "siteWeb", visible: false, isModelProperty: true },
    { name: "Prenom Representant", property: "representantPrenom", visible: false, isModelProperty: true },
    { name: "Nom Representant", property: "representantNom", visible: false, isModelProperty: true },
    { name: "Email Representant", property: "representantEmail", visible: false, isModelProperty: true },
    { name: "Telephone Representant", property: "representantTelephone", visible: false, isModelProperty: true },
    { name: "Statut", property: "statut", visible: false, isModelProperty: true },
    { name: "Ville", property: "ville", visible: false, isModelProperty: true },
    { name: "Active", property: "active", visible: false, isModelProperty: true },
    { name: "Statut", property: "partenaire", visible: true, isModelProperty: true },
    { name: "Actions", property: "action", visible: true },
    

  ] as ListColumn[];
  constructor(
    private partenaireService: PartenaireService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.getPartenaires();

    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((partenaires) => {
      this.partenaires = partenaires;
      this.dataSource.data = partenaires;
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
  
  getPartenaires() {
    this.partenaireService.getAll().subscribe(
      (response) => {
        this.partenaires = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.partenaires);
        this.showProgressBar = true;
      });
  }

  createPartenaire() {
    this.dialog
      .open(AddOrUpdatePartenariatComponent)
      .afterClosed()
      .subscribe((partenaire: any) => {
        /**
         * partenaire is the updated continent (if the user pressed Save - otherwise it's null)
         */ if (partenaire) {
          /**
           * Here we are updating our local array.
           */
          this.partenaires.unshift(new Partenaire(partenaire));
          this.subject$.next(this.partenaires);
        }
      });
  }
  updatePartenaire(partenaire: Partenaire) {
    this.dialog
      .open(AddOrUpdatePartenariatComponent, {
        data: partenaire,
      })
      .afterClosed()
      .subscribe((partenaire) => {
        /**
         * Partenaire is the updated continent (if the user pressed Save - otherwise it's null)
         */
        if (partenaire) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.partenaires.findIndex(
            (existingPartenaire) =>
            existingPartenaire.id === partenaire.id
          );
          this.partenaires[index] = new Partenaire(partenaire);
          this.subject$.next(this.partenaires);
        }
      });
  }
  detailsPartenaire(partenaire: Partenaire) {
    this.dialog
      .open(DetailsPartenariatComponent, {
        data: partenaire,
      })
      .afterClosed()
      .subscribe((partenaire) => {
        /**
         * Partenaire is the updated continent (if the user pressed Save - otherwise it's null)
         */
        if (partenaire) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.partenaires.findIndex(
            (existingPartenaire) =>
            existingPartenaire.id === partenaire.id
          );
          this.partenaires[index] = new Partenaire(partenaire);
          this.subject$.next(this.partenaires);
        }
      });
  }
  deletePartenaire(partenaire: Partenaire) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.partenaireService.delete(partenaire).subscribe((response) => {
          this.partenaires.splice(
            this.partenaires.findIndex(
              (existingPartenaire) => existingPartenaire.id === partenaire.id
            ), 1);
          this.subject$.next(this.partenaires);
          this.notificationService.success(NotificationUtil.suppression);
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        }, () => { })
      }
    })
  }

  toggleList(){
    this.displayList = !this.displayList
  }

  ngOnDestroy() { }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
}
