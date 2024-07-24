import { Component, OnInit, ViewChild } from '@angular/core';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { EtatDossierPelerinage } from '../../shared/util/util';
import { DossierPelerinage } from '../../shared/model/dossier-pelerinage.model';
import { DossierPelerinageService } from '../../shared/services/dossier-pelerinage.service';
import { filter } from 'rxjs/operators';
import { ReadFileHistoriquePelerinageComponent } from '../read-file-historique-pelerinage/read-file-historique-pelerinage.component';
import { DetailsHistoriquePelerinageComponent } from '../details-historique-pelerinage/details-historique-pelerinage.component';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { ReplaySubject, Observable } from 'rxjs';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { MailService } from 'src/app/shared/services/mail.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'fury-list-historique-pelerinage',
  templateUrl: './list-historique-pelerinage.component.html',
  styleUrls: ['./list-historique-pelerinage.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]

})
export class ListHistoriquePelerinageComponent implements OnInit {
  showProgressBar: boolean = false; 
  saisi: string = EtatDossierPelerinage.saisi;
  ouvert: string = EtatDossierPelerinage.ouvert;
  fermer: string = EtatDossierPelerinage.fermer;
  date: Date = new Date();
  currentDossierPelerinage: DossierPelerinage = undefined;
  dossierPelerinages: DossierPelerinage[] = [];
  subject$: ReplaySubject<DossierPelerinage[]> = new ReplaySubject<DossierPelerinage[]>(1);
  data$: Observable<DossierPelerinage[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<DossierPelerinage> | null;
  selectedDossierPelerinage: DossierPelerinage | null = null;
  fileToLoad: File | null = null;
  anneeSelected: string = "";
  dateV = new FormControl(moment());
  @ViewChild(MatDatepicker) picker;

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
  dossiercolumns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Id", property: "id", visible: false, isModelProperty: true },
    { name: "Code", property: "code", visible: true, isModelProperty: true },
    { name: "Annee", property: "annee", visible: true, isModelProperty: true },
    { name: "Description", property: "description", visible: true, isModelProperty: true },
    { name: "Etat", property: "etat", visible: true, isModelProperty: true },
    { name: "Ajoute par", property: "ajoutePar", visible: true }, // New combined column

    { name: "Note d'information", property: "noteInformation", visible: false, isModelProperty: true },
    { name: "Rapport de Pelerinage", property: "rapportPelerinage", visible: false, isModelProperty: true },

    { name: "Date creation", property: "createAt", visible: false, isModelProperty: true },
    { name: "Commentaire", property: "commentaire", visible: false, isModelProperty: true },
    { name: "Lieu Pelerinage", property: "lieuPelerinage", visible: false, isModelProperty: true },
    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor( private dossierPelerinageService: DossierPelerinageService,
    private dialog: MatDialog,private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private mailService: MailService,
    private authentificationService: AuthenticationService,) { }

  ngOnInit(): void { this.getDossierPelerinages();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((dossierPelerinages) => {
      this.dossierPelerinages = dossierPelerinages;
      this.dataSource.data = dossierPelerinages;
      console.log('Dossier Pelerinages in ngOnInit:', this.dossierPelerinages); // Debugging output
    });
  }
  getDossierPelerinages() {
    if (this.anneeSelected) {
      this.dossierPelerinageService.getByAnnee(this.anneeSelected).subscribe(
      (response) => {
        this.dossierPelerinages = response.body;
        console.log('Filtered Dossier Pelerinages:', this.dossierPelerinages); 
      },
      (err) => {
        console.error('Error loading dossier Pelerinages:', err); 
        this.showProgressBar = false;
      },()=>{
        this.showProgressBar = true;
        this.subject$.next(this.dossierPelerinages);
      }
    );
  }else {
    this.dossierPelerinageService.getDossiersPelerinageFerme().subscribe(
      (response) => {
        this.dossierPelerinages = response.body;
        console.log('Filtered Dossier Pelerinages:', this.dossierPelerinages); 
      },
      (err) => {
        console.error('Error loading dossier Pelerinages:', err); 
        this.showProgressBar = false;
      },()=>{
        this.showProgressBar = true;
        this.subject$.next(this.dossierPelerinages);
      }
    );
  }  }
  get visibleDossierColumns() {
    return this.dossiercolumns.filter((column) => column.visible).map((column) => column.property);
  }
  yearSelected(params: Date) {
    this.dateV.setValue(params);
    this.anneeSelected = params.getFullYear().toString(); 
    this.picker.close();
    this.getDossierPelerinages();
  }
  onCellClick(property: string, row: DossierPelerinage): void {
    const dialogRef = this.dialog.open(ReadFileHistoriquePelerinageComponent, {
      data: { dossier: row, property: property },
      width: '80%',
      height: '80%',
      maxWidth: '100vw', 
      maxHeight: '100vh', 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Le dialogue a été fermé', result);
      const index = this.dossierPelerinages.findIndex(
        (existingDossierPelerinage) => existingDossierPelerinage.id === row.id
      );
      this.dossierPelerinages[index] = new DossierPelerinage(row);
      this.subject$.next(this.dossierPelerinages);
    });
  }
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  detailsDossier(dossier: DossierPelerinage) {
    this.dialog
      .open(DetailsHistoriquePelerinageComponent, {
        data: dossier,
        width: '80vw',  
        height: '40vh', 
        maxWidth: '90vw', 
        maxHeight: '90vh', 
        panelClass: 'custom-dialog-container' 
      })
      .afterClosed()
      .subscribe((dossier) => {
        if (dossier) {
          const index = this.dossierPelerinages.findIndex(
            (existingDossierPelerinage) => existingDossierPelerinage.id === dossier.id
          );
          this.dossierPelerinages[index] = new DossierPelerinage(dossier);
          this.subject$.next(this.dossierPelerinages);
        }
      });
  }
  
  ngOnDestroy() { }
  onFilterChange(value) {
    if (!this.dataSource ) {
      return;
    }
    value = value.trim().toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(value) != -1;
    };
  }
}
