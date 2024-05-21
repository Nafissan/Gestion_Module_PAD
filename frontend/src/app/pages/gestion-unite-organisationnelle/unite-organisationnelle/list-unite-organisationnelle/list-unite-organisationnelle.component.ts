import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { ReplaySubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { UniteOrganisationnelleService } from '../../shared/services/unite-organisationnelle.service';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import {AddUniteOrganisationnelleComponent} from '../add-unite-organisationnelle/add-unite-organisationnelle.component'
import { DetailsUniteOrganisationnelleComponent } from '../details-unite-organisationnelle/details-unite-organisationnelle.component';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { DialogUtil } from '../../../../shared/util/util';

@Component({
  selector: 'fury-list-unite-organisationnelle',
  templateUrl: './list-unite-organisationnelle.component.html',
  styleUrls: ['./list-unite-organisationnelle.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class ListUniteOrganisationnelleComponent implements OnInit {
  dialogUtil: DialogUtil = new DialogUtil();
  uniteOrganisationnelles: UniteOrganisationnelle[];
  subject$: ReplaySubject<UniteOrganisationnelle[]> = new ReplaySubject<UniteOrganisationnelle[]>(
    1
  );

  data$: Observable<UniteOrganisationnelle[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<UniteOrganisationnelle> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    {
      name: "Nom",
      property: "nom",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Code",
      property: "code",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Description",
      property: "description",
      visible: true,
      isModelProperty: true,
    },
    {
      name: "Supérieur",
      property: "code_sup",
      visible: true,
      isModelProperty: true,
    },
    { name: "Actions", property: "actions", visible: true },
  ]as ListColumn[];

  constructor(
    private dialogConfirmationService: DialogConfirmationService,
    private uniteOrganisationnelleService: UniteOrganisationnelleService,
    private dialog: MatDialog  ) { }

  ngOnInit(){
    this.getUniteOrganisationnelles();

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter((data) => !!data)).subscribe(( uniteOrganisationnelles) => {
      this. uniteOrganisationnelles =  uniteOrganisationnelles;
      this.dataSource.data =  uniteOrganisationnelles;
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
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr =JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  
  }

  getUniteOrganisationnelles() {
    this.uniteOrganisationnelleService.getAll().subscribe(
      (response) => {
        this.uniteOrganisationnelles = response.body;
      },
      (err) => {
      },
      () => {
        this.subject$.next(this.uniteOrganisationnelles);
      }
    );
  }

  createUniteOrganisationnelle() {
    this.dialog
      .open(AddUniteOrganisationnelleComponent)
      .afterClosed()
      .subscribe((uniteOrganisationnelle: any) => {
        /**
         * Fonction is the updated fonction (if the user pressed Save - otherwise it's null)
         */ if (uniteOrganisationnelle) {
          /**
           * Here we are updating our local array.
           */
          this.uniteOrganisationnelles.unshift(new UniteOrganisationnelle(uniteOrganisationnelle));
          this.subject$.next(this.uniteOrganisationnelles);
        }
      });
  }

  updateUniteOrganisationnelle(uniteOrganisationnelle: UniteOrganisationnelle) {
    this.dialog
    .open(AddUniteOrganisationnelleComponent, {
      data: uniteOrganisationnelle,
    })
    .afterClosed()
    .subscribe((uniteOrganisationnelle) => {
      /**
       * Unite Organisationnelle is the updated fonction (if the user pressed Save - otherwise it's null)
       */
      if (uniteOrganisationnelle) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        const index = this.uniteOrganisationnelles.findIndex(
          (existingUniteOrg) =>
          existingUniteOrg.id === uniteOrganisationnelle.id
        );
        this.uniteOrganisationnelles[index] = new UniteOrganisationnelle(uniteOrganisationnelle);
        this.subject$.next(this.uniteOrganisationnelles);
      }
    });
  }

  deleteUniteOrganisationnelle(uniteOrganisationnelle: UniteOrganisationnelle) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
      if (action === DialogUtil.confirmer){
    this.uniteOrganisationnelleService.delete(uniteOrganisationnelle).subscribe((response) => {

      this.uniteOrganisationnelles.splice(
        this.uniteOrganisationnelles.findIndex(
          (existingDossierConge) => existingDossierConge.id === uniteOrganisationnelle.id
        ),
      );
      this.subject$.next(this.uniteOrganisationnelles);
    });
  }
})
  }
  
  detailsUniteOrganisationnelle(uniteOrganisationnelle: UniteOrganisationnelle) {
    this.dialog
      .open(DetailsUniteOrganisationnelleComponent, {
        data: uniteOrganisationnelle,
      })
      .afterClosed()
      .subscribe((uniteOrganisationnelle) => {
 
        if (uniteOrganisationnelle) {

          const index = this.uniteOrganisationnelles.findIndex(
            (existingAbsence) =>
            existingAbsence.id === uniteOrganisationnelle.id
          );
          this.uniteOrganisationnelles[index] = new UniteOrganisationnelle(uniteOrganisationnelle);
          this.subject$.next(this.uniteOrganisationnelles);
        }
      });
  }
}
