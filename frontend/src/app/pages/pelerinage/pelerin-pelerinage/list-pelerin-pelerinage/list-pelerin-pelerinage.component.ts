import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Pelerin } from '../../shared/model/pelerin-pelerinage.model';
import { DossierPelerinage } from '../../shared/model/dossier-pelerinage.model';
import { PelerinsService } from '../../shared/services/pelerin-pelerinage.service';
import { DossierPelerinageService } from '../../shared/services/dossier-pelerinage.service';
import { AddOrUpdatePelerinPelerinageComponent } from '../add-or-update-pelerin-pelerinage/add-or-update-pelerin-pelerinage.component';
import { DetailsPelerinPelerinageComponent } from '../details-pelerin-pelerinage/details-pelerin-pelerinage.component';
import { ReadFilePelerinPelerinageComponent } from '../read-file-pelerin-pelerinage/read-file-pelerin-pelerinage.component';
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
  selector: 'fury-list-pelerin-pelerinage',
  templateUrl: './list-pelerin-pelerinage.component.html',
  styleUrls: ['./list-pelerin-pelerinage.component.scss', "../../../../shared/util/bootstrap4.css"]
})
export class ListPelerinPelerinageComponent implements OnInit {
  showProgressBar: boolean = false;
  pelerinSelected: Pelerin;
  pelerins: Pelerin[]=[];
  subject$: ReplaySubject<Pelerin[]> = new ReplaySubject<Pelerin[]>(1);
  data$: Observable<Pelerin[]> = this.subject$.asObservable();
  pageSize = 4;
  openOrSaisiDossier:DossierPelerinage;
  dataSource: MatTableDataSource<Pelerin> | null;
  selection = new SelectionModel<Pelerin>(true, []);
  dossierPelerinage : DossierPelerinage;
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
   // -------------------------------------------------------------
   @Input()
   columns: ListColumn[] = [
     { name: "Checkbox", property: "checkbox", visible: false },
     { name: "Code Dossier", property: "dossierPelerinage", visible: true, isModelProperty: true },
     { name: "Pelerin ", property: "pelerin", visible: true,},
      { name: "Ajoute par", property: "ajoutePar", visible: true },
      { name: "Fiche Medicale", property: "ficheMedical", visible: true,  isModelProperty: true,},
      { name: "Passport", property: "passport", visible: true,  isModelProperty: true,},
     { name: "Document Supplementaire", property: "document", visible: false,  isModelProperty: true,},
     { name: "Aptitude", property: "status", visible: true,  isModelProperty: true,},
     { name: "Actions", property: "actions", visible: true },

   ] as ListColumn[];
  constructor( private pelerinService: PelerinsService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private dossierPelerinageService: DossierPelerinageService) { }


    ngOnInit() {
      this.fetchPelerins();
      this.getDossierPelerinage();
      this.dataSource = new MatTableDataSource();
      this.data$.pipe(filter((data) => !!data)).subscribe((pelerin) => {
        this.pelerins = pelerin;
        this.dataSource.data = pelerin;
      });
    }
    ngAfterViewInit() {
    }
  
    get visibleColumns() {
      return this.columns.filter((column) => column.visible).map((column) => column.property);
    }
  
    onFilterChange(value) {
      if (!this.dataSource) {
        return;
      }
      value = value.trim().toLowerCase();
      this.dataSource.filter = value;
      this.dataSource.filterPredicate = (data: any, value) => { const dataStr =JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
    }
  fetchPelerins() {
    this.pelerinService.getPelerinsByDossierEtat()
    .subscribe(response => {
        this.pelerins = response.body as Pelerin[];
        
      }, err => {
        console.error('Error loading pelerin colonies:', err);
      },()=>{
        this.subject$.next(this.pelerins);
        this.showProgressBar = true;
      });  }
  refreshListe(){ this.fetchPelerins();}

  getDossierPelerinage() {
    this.dossierPelerinageService.getDossier().subscribe(
      (response) => {
        if (response.body !== null) {
          this.dossierPelerinage = response.body as DossierPelerinage;
          console.log('Dossier pelerinage:', this.dossierPelerinage);
        }
      },
      (err) => {
        console.error('Error loading dossier pelerinage:', err);
      })  
    }
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }
    checkboxLabel(row?: Pelerin): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }
    createPelerin(){

      this.dialog.open(AddOrUpdatePelerinPelerinageComponent)
      .afterClosed().subscribe((pelerin: Pelerin) => {
    if(pelerin) {
      this.pelerins.unshift(new Pelerin(pelerin));
      this.subject$.next(this.pelerins);
      this.refreshListe();
    } 
    });
    }
    updatePelerin(pelerin: Pelerin){
      this.dialog.open(AddOrUpdatePelerinPelerinageComponent, {
        data: pelerin,
      })
      .afterClosed()
      .subscribe((pelerin: Pelerin)=> {
        if(pelerin){
          const index = this.pelerins.findIndex(
            (existingPelerin) =>
              existingPelerin.id === pelerin.id
          );
          this.pelerins[index] = new Pelerin(pelerin);
          this.subject$.next(this.pelerins);
          this.refreshListe();
        }
      })
    }
  
    hasAnyRole(roles: string[]) {
      return this.authentificationService.hasAnyRole(roles);
    }
    detailsPelerin(pelerin: Pelerin){
      this.dialog
      .open(DetailsPelerinPelerinageComponent, {data: pelerin})
      .afterClosed()
      .subscribe((pelerin:Pelerin)=>{
        if(pelerin){
          const index = this.pelerins.findIndex(
            (existingPelerin) => existingPelerin.id === pelerin.id
            );
            this.pelerins[index] = new Pelerin(pelerin);
            this.subject$.next(this.pelerins);
            this.refreshListe();
        }
      });
    }
    deletePelerin(pelerin: Pelerin){
      this.dialogConfirmationService.confirmationDialog().subscribe(action => {
        if (action === DialogUtil.confirmer) {
          this.pelerinService.deletePelerin(pelerin).subscribe((response) => {
            this.pelerins.splice(
              this.pelerins.findIndex(
                (existingPelerin) => existingPelerin.id === pelerin.id
              ),
              1
            );
            this.notificationService.success(NotificationUtil.suppression)
            this.subject$.next(this.pelerins);
            this.refreshListe();
          }
          ,err => {
            this.notificationService.warn(NotificationUtil.echec);
          });
        }
      })
    }
    validerPelerin(pelerin: Pelerin) {
      pelerin.status = 'APTE';
      this.pelerinService.updatePelerin(pelerin).subscribe(
          (response) => {
              this.notificationService.success('Pelerin validé avec succès');
              if(response.body as Pelerin){
                  const index = this.pelerins.findIndex(
                      (existingPelerin) =>
                      existingPelerin.id === response.body.id
                  );
                  this.pelerins[index] = new Pelerin(response.body);
                  this.subject$.next(this.pelerins);
                  this.refreshListe();
              }
          },
          (err:HttpErrorResponse ) => {
              if (err.status === 409) {
                  this.notificationService.warn('Ce pelerin existe déjà');
              } else {
                  this.notificationService.warn('Échec de la validation du pelerin' );
              }
              this.refreshListe();
          }
      );
  }
  
    rejeterPelerin(pelerin: Pelerin) {
      pelerin.status = 'NON APTE';
      this.pelerinService.updatePelerin(pelerin).subscribe((response) => {
        this.notificationService.success('Pelerin rejeté avec succès');
        if(response.body as Pelerin){
          const index = this.pelerins.findIndex(
            (existingPelerin) =>
              existingPelerin.id === response.body.id
          );
          this.pelerins[index] = new Pelerin(response.body);
          this.subject$.next(this.pelerins);
        this.refreshListe();
      }    }, () => {
        this.notificationService.warn('Échec de rejection du pelerin');
        this.refreshListe()
      });
    }
    annulerValidationPelerin(pelerin: Pelerin) {
      pelerin.status = 'A VERIFIER';
      this.pelerinService.updatePelerin(pelerin).subscribe((response) => {
        this.notificationService.success('Pelerin aptitude réinitialisé avec succès');
        if(response.body as Pelerin){
          const index = this.pelerins.findIndex(
            (existingPelerin) =>
              existingPelerin.id === response.body.id
          );
          this.pelerins[index] = new Pelerin(response.body);
          this.subject$.next(this.pelerins);
        this.refreshListe();
      }    }, () => {
        this.notificationService.warn('Échec de reinitialisation du pelerin');
      });
    }
  
  onCellClick(property: string, row: Pelerin) {
    const dialogRef = this.dialog.open(ReadFilePelerinPelerinageComponent, {
      data: { pelerin: row, property: property },
      width: '80%',
      height: '80%',
      maxWidth: '100vw', 
      maxHeight: '100vh', 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      const index = this.pelerins.findIndex(
        (existingPelerin) => existingPelerin.id === row.id
      );
      this.pelerins[index] = new Pelerin(row);
      this.subject$.next(this.pelerins);
    }); 
  }
   
  }
  

