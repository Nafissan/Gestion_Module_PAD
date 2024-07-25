import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from "rxjs/operators";
import { ReplaySubject, Observable } from 'rxjs';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { MailService } from 'src/app/shared/services/mail.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DossierColonie } from '../../shared/model/dossier-colonie.model';
import { DossierColonieService } from '../../shared/service/dossier-colonie.service';
import { EtatDossierColonie } from '../../shared/util/util';
import { FormControl } from '@angular/forms';
import moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ReadHistoriqueColonieComponent } from '../read-historique-colonie/read-historique-colonie.component';
import { DetailsColonComponent } from '../details-colon/details-colon.component';

@Component({
  selector: 'fury-liste-historique-colonie',
  templateUrl: './liste-historique-colonie.component.html',
  styleUrls: ['./liste-historique-colonie.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]

})
export class ListeHistoriqueColonieComponent implements OnInit {

  showProgressBar: boolean = false; 
  saisi: string = EtatDossierColonie.saisi;
  ouvert: string = EtatDossierColonie.ouvert;
  fermer: string = EtatDossierColonie.fermer;
  date: Date = new Date();
  currentDossierColonie: DossierColonie = undefined;
  dossierColonies: DossierColonie[] = [];
  subject$: ReplaySubject<DossierColonie[]> = new ReplaySubject<DossierColonie[]>(1);
  data$: Observable<DossierColonie[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<DossierColonie> | null;
  selectedDossierColonie: DossierColonie | null = null;
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

    { name: "Note du Ministere", property: "noteMinistere", visible: true, isModelProperty: true },
    { name: "Demande de Prospection", property: "demandeProspection", visible: false, isModelProperty: true },
    { name: "Note d'information", property: "noteInformation", visible: false, isModelProperty: true },
    { name: "Note d'instruction", property: "noteInstruction", visible: false, isModelProperty: true },
    { name: "Rapport prospection", property: "rapportProspection", visible: false, },
    { name: "Rapport de mission", property: "rapportMission", visible: false, isModelProperty: true },

    { name: "Date creation", property: "createAt", visible: false, isModelProperty: true },
    { name: "Commentaire", property: "commentaire", visible: false, isModelProperty: true },
    { name: "Type colonie", property: "type", visible: false, isModelProperty: true },

    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  constructor(
    private dossierColonieService: DossierColonieService,
    private dialog: MatDialog,private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private mailService: MailService,
    private authentificationService: AuthenticationService,

  ) { }

  ngOnInit() {
    this.getDossierColonies();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((dossierColonies) => {
         // Vérifiez si le résultat est un tableau ou un objet unique et traitez-le en conséquence
         if (!Array.isArray(dossierColonies)) {
          dossierColonies = [dossierColonies];
        }
      this.dossierColonies = dossierColonies;
      this.dataSource.data = dossierColonies;
      console.log('Dossier Colonies in ngOnInit:', this.dossierColonies); // Debugging output
    });
  }

  ngAfterViewInit() {
    this.setDataSourceAttributes();
  }
  yearSelected(params: Date) {
    this.dateV.setValue(params);
    this.anneeSelected = params.getFullYear().toString(); 
    this.picker.close();
    this.getDossierColonies();
  }
 
  get visibleDossierColumns() {
    return this.dossiercolumns.filter((column) => column.visible).map((column) => column.property);
  }
  
  
  
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

  getDossierColonies() {
    if (this.anneeSelected) {
      this.dossierColonieService.getByAnnee(this.anneeSelected).subscribe(
      (response) => {
        this.dossierColonies = response.body;
        if (!Array.isArray(this.dossierColonies)) {
          this.dossierColonies = [this.dossierColonies];
        }      },
      (err) => {
        console.error('Error loading dossier colonies:', err); 
        this.showProgressBar = false;
      },()=>{
        this.showProgressBar = true;
        this.subject$.next(this.dossierColonies);
      }
    );
  }else {
    this.dossierColonieService.getDossiersColoniesFerme().subscribe(
      (response) => {
        this.dossierColonies = response.body;
        console.log('Filtered Dossier Colonies:', this.dossierColonies); 
      },
      (err) => {
        console.error('Error loading dossier colonies:', err); 
        this.showProgressBar = false;
      },()=>{
        this.showProgressBar = true;
        this.subject$.next(this.dossierColonies);
      }
    );
  }
  }
  onCellClick(property: string, row: DossierColonie): void {
    const dialogRef = this.dialog.open(ReadHistoriqueColonieComponent, {
      data: { dossier: row, property: property },
      width: '80%',
      height: '80%',
      maxWidth: '100vw', 
      maxHeight: '100vh', 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Le dialogue a été fermé', result);
      const index = this.dossierColonies.findIndex(
        (existingDossierColonie) => existingDossierColonie.id === row.id
      );
      this.dossierColonies[index] = new DossierColonie(row);
      this.subject$.next(this.dossierColonies);
    });
  }
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  detailsColon(dossier: DossierColonie) {
    this.dialog
      .open(DetailsColonComponent, {
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
          const index = this.dossierColonies.findIndex(
            (existingParticipant) => existingParticipant.id === dossier.id
          );
          this.dossierColonies[index] = new DossierColonie(dossier);
          this.subject$.next(this.dossierColonies);
        }
      });
  }
  
  ngOnDestroy() { }
  
}
