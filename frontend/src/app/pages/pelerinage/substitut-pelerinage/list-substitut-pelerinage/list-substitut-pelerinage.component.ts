import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Substitut } from '../../shared/model/substitut-pelerinage.model';
import { DossierPelerinage } from '../../shared/model/dossier-pelerinage.model';
import { SubstitutsService } from '../../shared/services/substitut.service';
import { DossierPelerinageService } from '../../shared/services/dossier-pelerinage.service';
import { DetailsSubstitutComponent } from '../detail-substitut/detail-substitut-pelerinage.component';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Observable } from 'rxjs';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'fury-list-substitut-pelerinage',
  templateUrl: './list-substitut-pelerinage.component.html',
  styleUrls: ['./list-substitut-pelerinage.component.scss', "../../../../shared/util/bootstrap4.css"]
})
export class ListSubstitutPelerinageComponent implements OnInit {
  showProgressBar: boolean = false;
  substitutSelected: Substitut;
  substituts: Substitut[] = [];
  subject$: ReplaySubject<Substitut[]> = new ReplaySubject<Substitut[]>(1);
  data$: Observable<Substitut[]> = this.subject$.asObservable();
  pageSize = 4;
  openOrSaisiDossier:DossierPelerinage;
  dataSource: MatTableDataSource<Substitut> | null;
  selection = new SelectionModel<Substitut>(true, []);
  dossierDossierPelerinage:DossierPelerinage;
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
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  
  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Code Dossier", property: "dossierDossierPelerinage", visible: true, isModelProperty: true },
    { name: "Substitut", property: "substitut", visible: true, },
    { name: "Ajoute par", property: "ajoutePar", visible: true },
    { name: "Fiche Medicale", property: "ficheMedical", visible: true, isModelProperty: true, },
    { name: "Passport", property: "passport", visible: true, isModelProperty: true, },
    { name: "Document Supplementaire", property: "document", visible: false, isModelProperty: true, },
    { name: "Aptitude", property: "status", visible: true, isModelProperty: true, },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];

  constructor(
    private substitutService: SubstitutsService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private dossierDossierPelerinageService:DossierPelerinageService
  ) { }

  ngOnInit() {
    this.fetchSubstituts();
    this.getDossierDossierPelerinage();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((substitut) => {
      this.substituts = substitut;
      this.dataSource.data = substitut;
    });
  }
  
  ngAfterViewInit() { }
  
  get visibleColumns() {
    return this.columns.filter((column) => column.visible).map((column) => column.property);
  }
  
  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim().toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(value) != -1;
    }
  }
  
  fetchSubstituts() {
    this.substitutService.getSubstitutsByDossierEtat().subscribe(response => {
      this.substituts = response.body as Substitut[];
    }, err => {
      console.error('Error loading substitut:', err);
    }, () => {
      this.subject$.next(this.substituts);
      this.showProgressBar = true;
    });
  }
  
  refreshListe() { this.fetchSubstituts(); }
  
  getDossierDossierPelerinage() {
    this.dossierDossierPelerinageService.getDossier().subscribe(
      (response) => {
        if (response.body !== null) {
          this.dossierDossierPelerinage = response.body asDossierPelerinage;
          console.log('Dossier substitut:', this.dossierDossierPelerinage);
        }
      },
      (err) => {
        console.error('Error loading dossier substitut:', err);
      }
    );
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  checkboxLabel(row?: Substitut): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  
  createSubstitut() {
    this.dialog.open(AddOrUpdateSubstitutComponent)
      .afterClosed().subscribe((substitut: Substitut) => {
        if (substitut) {
          this.substituts.unshift(new Substitut(substitut));
          this.subject$.next(this.substituts);
          this.refreshListe();
        }
      });
  }
  
  updateSubstitut(substitut: Substitut) {
    this.dialog.open(AddOrUpdateSubstitutComponent, {
      data: substitut,
    })
      .afterClosed()
      .subscribe((substitut: Substitut) => {
        if (substitut) {
          const index = this.substituts.findIndex(
            (existingSubstitut) => existingSubstitut.id === substitut.id
          );
          this.substituts[index] = new Substitut(substitut);
          this.subject$.next(this.substituts);
          this.refreshListe();
        }
      });
  }
  
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  
  detailsSubstitut(substitut: Substitut) {
    this.dialog.open(DetailsSubstitutComponent, { data: substitut })
      .afterClosed()
      .subscribe((substitut: Substitut) => {
        if (substitut) {
          const index = this.substituts.findIndex(
            (existingSubstitut) => existingSubstitut.id === substitut.id
          );
          this.substituts[index] = new Substitut(substitut);
          this.subject$.next(this.substituts);
          this.refreshListe();
        }
      });
  }
  
  deleteSubstitut(substitut: Substitut) {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.substitutService.deleteSubstitut(substitut).subscribe((response) => {
          this.substituts.splice(
            this.substituts.findIndex(
              (existingSubstitut) => existingSubstitut.id === substitut.id
            ),
            1
          );
          this.notificationService.success(NotificationUtil.suppression)
          this.subject$.next(this.substituts);
          this.refreshListe();
        }, err => {
          this.notificationService.warn(NotificationUtil.echec);
        });
      }
    })
  }
  
  validerSubstitut(substitut: Substitut) {
    substitut.status = 'APTE';
    this.substitutService.updateSubstitut(substitut).subscribe(
      (response) => {
        this.notificationService.success('Substitut validé avec succès');
        if (response.body as Substitut) {
          const index = this.substituts.findIndex(
            (existingSubstitut) =>
              existingSubstitut.id === response.body.id
          );
          this.substituts[index] = new Substitut(response.body);
          this.subject$.next(this.substituts);
          this.refreshListe();
        }
      },
      (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.notificationService.warn('Ce substitut existe déjà');
        } else {
          this.notificationService.warn('Échec de la validation du substitut');
        }
        this.refreshListe();
      }
    );
  }
  
  rejeterSubstitut(substitut: Substitut) {
    substitut.status = 'NON APTE';
    this.substitutService.updateSubstitut(substitut).subscribe((response) => {
      this.notificationService.success('Substitut rejeté avec succès');
      if (response.body as Substitut) {
        const index = this.substituts.findIndex(
          (existingSubstitut) =>
            existingSubstitut.id === response.body.id
        );
        this.substituts[index] = new Substitut(response.body);
        this.subject$.next(this.substituts);
        this.refreshListe();
      }
    }, () => {
      this.notificationService.warn('Échec de rejection du substitut');
      this.refreshListe()
    });
  }
  
  annulerValidationSubstitut(substitut: Substitut) {
    substitut.status = 'A VERIFIER';
    this.substitutService.updateSubstitut(substitut).subscribe((response) => {
      this.notificationService.success('Aptitude du substitut réinitialisée avec succès');
      if (response.body as Substitut) {
        const index = this.substituts.findIndex(
          (existingSubstitut) =>
            existingSubstitut.id === response.body.id
        );
        this.substituts[index] = new Substitut(response.body);
        this.subject$.next(this.substituts);
        this.refreshListe();
      }
    }, () => {
      this.notificationService.warn('Échec de reinitialisation du substitut');
    });
  }
  
  onCellClick(property: string, row: Substitut) {
    const dialogRef = this.dialog.open(ReadFileSubstitutComponent, {
      data: { substitut: row, property: property },
      width: '80%',
      height: '80%',
      maxWidth: '100vw', 
      maxHeight: '100vh', 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      const index = this.substituts.findIndex(
        (existingSubstitut) => existingSubstitut.id === row.id
      );
      this.substituts[index] = new Substitut(row);
      this.subject$.next(this.substituts);
    }); 
  }
}
