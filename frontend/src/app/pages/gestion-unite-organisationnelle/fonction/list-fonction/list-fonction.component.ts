import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { ReplaySubject, Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ListColumn } from "../../../../../@fury/shared/list/list-column.model";
import { filter } from "rxjs/operators";
import { fadeInRightAnimation } from "../../../../../@fury/animations/fade-in-right.animation";
import { fadeInUpAnimation } from "../../../../../@fury/animations/fade-in-up.animation";
import { MatDialog } from "@angular/material/dialog";
import { Fonction } from '../../shared/model/fonction.model';
import { FonctionService } from "../../shared/services/fonction.service";
import { AddFonctionComponent } from '../add-fonction/add-fonction.component';
// import { DetailsFonctionComponent } from '../details-fonction/details-fonction.component';
import { DialogConfirmationService } from "../../../../shared/services/dialog-confirmation.service";
import { DialogUtil } from "../../../../shared/util/util";
import { DetailsFonctionComponent } from '../details-fonction/details-fonction.component';
import { NotificationService } from '../../../../shared/services/notification.service';



@Component({
  selector: 'fury-list-fonction',
  templateUrl: './list-fonction.component.html',
  styleUrls: ['./list-fonction.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListFonctionComponent implements OnInit, AfterViewInit, OnDestroy   {
  showProgressBar: boolean = false;
  dialogUtil: DialogUtil = new DialogUtil();
  fonctions: Fonction[];
  subject$: ReplaySubject<Fonction[]> = new ReplaySubject<Fonction[]>(
    1
  );
  data$: Observable<Fonction[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Fonction> | null;

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
    { name: "Id", property: "id", visible: true, isModelProperty: true },
    {
      name: "Nom",
      property: "nom",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Unité Organisationnelle",
      property: "uniteOrganisationnelles",
      visible: false,
      isModelProperty: true,
    },
    { name: "Actions", property: "actions", visible: true },
  ]as ListColumn[];

  constructor(
    private fonctionService: FonctionService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,

  ){}

  ngOnInit(){
    this.getFonctions();
    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter((data) => !!data)).subscribe((fonctions) => {
      this.fonctions = fonctions;
      this.dataSource.data = fonctions;
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
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr =JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  
  }
  

  getFonctions() {
    this.fonctionService.getAll().subscribe(
      (response) => {
        this.fonctions = response.body;
      },
      (err) => {
        this.showProgressBar = true;
      },
      () => {
        this.showProgressBar = true;
        this.subject$.next(this.fonctions);
      }
    );       
  }


  /***CICATRICES */
  
  /*createFonction() {
    this.dialog
      .open(AddFonctionComponent)
      .afterClosed()
      .subscribe((FonctionsAjoute: any) => {
        /**
         * Fonction is the updated fonction (if the user pressed Save - otherwise it's null)
         *//* if (FonctionsAjoute) {
          let tabFonctionAjoute: Fonction[] = []
          tabFonctionAjoute=FonctionsAjoute  
          
          tabFonctionAjoute.forEach(fonction => {
          this.fonctions.unshift(new Fonction(fonction));
          this.subject$.next(this.fonctions);    
          });
        }
      });
  }*/

  createFonction() {
    this.dialog
      .open(AddFonctionComponent)
      .afterClosed()
      .subscribe((fonction: any) => {
        /**
         * Fonction is the updated fonction (if the user pressed Save - otherwise it's null)
         */ if (fonction) {
          /**
           * Here we are updating our local array.
           */
          this.fonctions.unshift(new Fonction(fonction));
          this.subject$.next(this.fonctions);
        }
      });
  }
  
  updateFonction(fonction: Fonction) {
    this.dialog
    .open(AddFonctionComponent, {
      data: fonction,
    })
    .afterClosed()
    .subscribe((fonction) => {
      /**
       * Fonction is the updated fonction (if the user pressed Save - otherwise it's null)
       */
      if (fonction) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        const index = this.fonctions.findIndex(
          (existingFonction) =>
            existingFonction.id === fonction.id
        );
        this.fonctions[index] = new Fonction(fonction);
        this.subject$.next(this.fonctions);
      }
    });
  }

  deleteFonction(fonction: Fonction) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.fonctionService.delete(fonction).subscribe((response) => {
          this.fonctions.splice(
            this.fonctions.findIndex(
              (existingFonction) => existingFonction.id === fonction.id
            ),1);
          this.subject$.next(this.fonctions);
        },(error) => {
          if(error.status === 404) {
           this.notificationService.warn('Cette fonction ne peut pas être supprimée')
          }
        })        
      } 
    })
  }




  detailsFonction(fonction: Fonction) {
    this.dialog
      .open(DetailsFonctionComponent, {
        data: fonction,
      })
      .afterClosed()
      .subscribe((fonction) => {
        /**
         * DossierConge is the updated dossierConge (if the user pressed Save - otherwise it's null)
         */
        if (fonction) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.fonctions.findIndex(
            (existingFonction) =>
            existingFonction.id === fonction.id
          );
          this.fonctions[index] = new Fonction(fonction);
          this.subject$.next(this.fonctions);
        }
      });
  }
  ngOnDestroy() {}
}
