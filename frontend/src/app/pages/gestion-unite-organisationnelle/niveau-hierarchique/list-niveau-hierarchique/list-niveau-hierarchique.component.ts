import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { ReplaySubject, Observable, from } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog } from "@angular/material/dialog";
import {NiveauHierarchique} from '../../shared/model/niveau-hierarchique.model';
import {NiveauHierarchiqueService} from '../../shared/services/niveau-hierarchique.service';
import { AddNiveauHierarchiqueComponent } from '../add-niveau-hierarchique/add-niveau-hierarchique.component';
import { DetailsNiveauHierarchiqueComponent } from '../details-niveau-hierarchique/details-niveau-hierarchique.component';
import { DialogUtil } from '../../../../shared/util/util';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'fury-list-niveau-hierarchique',
  templateUrl: './list-niveau-hierarchique.component.html',
  styleUrls: ['./list-niveau-hierarchique.component.scss',"../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListNiveauHierarchiqueComponent implements OnInit, AfterViewInit, OnDestroy {
  showProgressBar: boolean = false;
  dialogUtil: DialogUtil = new DialogUtil();
  niveauHierarchiques: NiveauHierarchique[];
  subject$: ReplaySubject<NiveauHierarchique[]> = new ReplaySubject<NiveauHierarchique[]>(
    1
  );
  data$: Observable<NiveauHierarchique[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<NiveauHierarchique> | null;

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
    {
      name: "Libellé",
      property: "libelle",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Position",
      property: "position",
      visible: true,
      isModelProperty: true,
    },
    { name: "Actions", property: "actions", visible: true },
  ]as ListColumn[];
  constructor(
    private niveauHierarchiqueService: NiveauHierarchiqueService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(){
    this.getNiveauHierarchiques();
    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter((data) => !!data)).subscribe((niveauHierarchiques) => {
      this.niveauHierarchiques = niveauHierarchiques;
      this.dataSource.data = niveauHierarchiques;
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
  }

  getNiveauHierarchiques() {
    this.niveauHierarchiqueService.getAll().subscribe(
      (response) => {
        this.niveauHierarchiques = response.body;
      },
      (err) => {        
        this.showProgressBar = true;
      },
      () => {
        this.showProgressBar = true;
        this.subject$.next(this.niveauHierarchiques);
      }
    );
  }

  createNiveauHierarchique() {
    this.dialog
      .open(AddNiveauHierarchiqueComponent)
      .afterClosed()
      .subscribe((niveauHierarchique: any) => {
        /**
         * Fonction is the updated fonction (if the user pressed Save - otherwise it's null)
         */ if (niveauHierarchique) {
          /**
           * Here we are updating our local array.
           */
          this.niveauHierarchiques.unshift(new NiveauHierarchique(niveauHierarchique));
          this.subject$.next(this.niveauHierarchiques);
        }
      });
  }
  
  updateNiveauHierarchique(niveauHierarchique: NiveauHierarchique) {
    this.dialog
    .open(AddNiveauHierarchiqueComponent, {
      data: niveauHierarchique,
    })
    .afterClosed()
    .subscribe((niveauHierarchique) => {
      /**
       * NiveauHierarchiqe is the updated fonction (if the user pressed Save - otherwise it's null)
       */
      if (niveauHierarchique) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        const index = this.niveauHierarchiques.findIndex(
          (existingFonction) =>
            existingFonction.id === niveauHierarchique.id
        );
        this.niveauHierarchiques[index] = new NiveauHierarchique(niveauHierarchique);
        this.subject$.next(this.niveauHierarchiques);
      }
    });
  }

  deleteNiveauHierarchique(niveauHierarchique: NiveauHierarchique) {
    
    this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
      if(action === DialogUtil.confirmer){
        this.niveauHierarchiqueService.delete(niveauHierarchique).subscribe((response) => {
          this.niveauHierarchiques.splice(
            this.niveauHierarchiques.findIndex(
              (existingnivHierarchique) => existingnivHierarchique.id === niveauHierarchique.id),1
          );
          this.subject$.next(this.niveauHierarchiques);
        },(error) => {
          if(error.status === 404) {
           this.notificationService.warn('Ce niveau ne peut être supprimé car il est rattaché à une Unité Organisationnelle !')
          }
        });
        this.notificationService.success("Suppression réussie avec succès !")
    }

      })
  }

  detailsNiveauHierarchique(niveauHierarchique: NiveauHierarchique) {
    this.dialog
      .open(DetailsNiveauHierarchiqueComponent, {
        data: niveauHierarchique,
      })
      .afterClosed()
      .subscribe((niveauHierarchique) => {
 
        if (niveauHierarchique) {

          const index = this.niveauHierarchiques.findIndex(
            (existingAbsence) =>
            existingAbsence.id === niveauHierarchique.id
          );
          this.niveauHierarchiques[index] = new NiveauHierarchique(niveauHierarchique);
          this.subject$.next(this.niveauHierarchiques);
        }
      });
  }

  ngOnDestroy() {}
}
