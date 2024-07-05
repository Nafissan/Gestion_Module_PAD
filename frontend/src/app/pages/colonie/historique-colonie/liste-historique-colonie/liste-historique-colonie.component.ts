import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from "rxjs/operators";
import { ReplaySubject, Observable } from 'rxjs';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { Mail } from 'src/app/shared/model/mail.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { MailService } from 'src/app/shared/services/mail.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DialogUtil, NotificationUtil, MailDossierColonie } from 'src/app/shared/util/util';
import { DossierColonie } from '../../shared/model/dossier-colonie.model';
import { DossierColonieService } from '../../shared/service/dossier-colonie.service';
import { ParticipantService } from '../../shared/service/participant.service';
import { EtatDossierColonie } from '../../shared/util/util';
import { Agent } from 'src/app/shared/model/agent.model';
import { Colon } from '../../shared/model/colon.model';
import { FormControl } from '@angular/forms';
import moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { ColonService } from '../../shared/service/colon.service';
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
   colon: Colon[]=[];

  saisi: string = EtatDossierColonie.saisi;
  ouvert: string = EtatDossierColonie.ouvert;
  fermer: string = EtatDossierColonie.fermer;
  date: Date = new Date();
  currentDossierColonie: DossierColonie = undefined;
  dossierColonies: DossierColonie[] = [];
  subject$: ReplaySubject<DossierColonie[]> = new ReplaySubject<DossierColonie[]>(1);
  data$: Observable<DossierColonie[]> = this.subject$.asObservable();
  colonSubject$: ReplaySubject<Colon[]> = new ReplaySubject<Colon[]>(1);
  colonData$: Observable<Colon[]> = this.colonSubject$.asObservable();
  pageSize = 4;
  colonPageSize = 4;
  dataSource: MatTableDataSource<DossierColonie> | null;
  colonDataSource: MatTableDataSource<Colon> | null;
  selectedDossierColonie: DossierColonie | null = null;
  selectedColons: Colon[] = [];
  filteredDossierColonies: DossierColonie[]=[];
  fileToLoad: File | null = null;
  anneeSelected: string = "";
  dateV = new FormControl(moment());
  @ViewChild(MatDatepicker) picker;
  private colonPaginator: MatPaginator;
  private colonSort: MatSort;
  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms; this.colonSort = ms;
    this.setDataSourceAttributes();
  }
  
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.colonPaginator = mp;
    this.setDataSourceAttributes();
  }
  setDataSourceAttributes() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    if(this.colonDataSource){
      this.colonDataSource.paginator = this.colonPaginator;
      this.colonDataSource.sort = this.colonSort;
    }
  }
  @Input()
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

    { name: "Actions", property: "actions", visible: true },
  ] as ListColumn[];
  @Input()
  colonColums: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Code Dossier", property: "codeDossier", visible: true, isModelProperty: true },
    { name: "Matricule Parent", property: "matriculeParent", visible: false, isModelProperty: true },
    { name: "Nom Parent", property: "nomParent", visible: false, isModelProperty: true },
    { name: "Prenom Parent", property: "prenomParent", visible: false, isModelProperty: true },
   
    {
      name: "Nom Enfant",
      property: "nomEnfant", 
      visible: true,   
      isModelProperty: true,
    },
    {
      name: "Prenom Enfant",
      property: "prenomEnfant", 
      visible: true,   
      isModelProperty: true,
    },
    { name: "Ajoute par", property: "ajoutePar", visible: true },
     { name: "Date de Naissance", property: "dateNaissance", visible: true, isModelProperty: true,},
    { name: "Groupe Sanguin", property: "groupeSanguin", visible: false, isModelProperty: true, },
    { name: "Lieu de Naissance", property: "lieuNaissance", visible: false, isModelProperty: true,},
    { name: "Fiche Sociale", property: "ficheSocial", visible: true,  isModelProperty: true,},
    { name: "Document Supplementaire", property: "document", visible: false,  isModelProperty: true,},
    { name: "Status", property: "status", visible: false,  isModelProperty: true,},
    { name: "Actions", property: "actions", visible: true },

  ] as ListColumn[];
  constructor(
    private dossierColonieService: DossierColonieService,
    private dialog: MatDialog,private dialogConfirmationService: DialogConfirmationService,
    private notificationService: NotificationService,
    private mailService: MailService,
    private authentificationService: AuthenticationService,
       private colonService: ColonService,

  ) { }

  ngOnInit() {
    this.getDossierColonies();
    this.dataSource = new MatTableDataSource();
    this.colonDataSource= new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((dossierColonies) => {
      this.dossierColonies = dossierColonies;
      this.dataSource.data = dossierColonies;
      console.log('Dossier Colonies in ngOnInit:', this.dossierColonies); // Debugging output
    });
    this.colonData$.pipe(filter((data) => !!data)).subscribe((colons) => {
      this.colon = colons;
      this.colonDataSource.data = colons;
      console.log('Dossier Colonies in ngOnInit:', this.colon); // Debugging output
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
  
  get visibleColonColumns() {
    return this.colonColums.filter((column) => column.visible).map((column) => column.property);
  }
  
  onFilterChange(value) {
    if (!this.dataSource || !this.colonDataSource) {
      return;
    }
    value = value.trim().toLowerCase();
    this.dataSource.filter = value;
    this.colonDataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(value) != -1;
    };
    this.colonDataSource.filterPredicate = (data: any, value) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(value) != -1;
      };
  }

  getDossierColonies() {
    this.dossierColonieService.getAll().subscribe(
      (response) => {
        this.dossierColonies = response.body;
        console.log('Dossier Colonies:', this.dossierColonies); 
        this.filteredDossierColonies = this.anneeSelected 
          ? this.dossierColonies.filter(dossier => 
              dossier.etat === EtatDossierColonie.fermer && 
              dossier.annee === this.anneeSelected
            ) 
          : this.dossierColonies.filter(dossier => dossier.etat === EtatDossierColonie.fermer);
        console.log('Filtered Dossier Colonies:', this.filteredDossierColonies); 
        this.colonService.getAll().subscribe(response=>{
          this.colon = response.body as Colon[];
          this.selectedColons = this.filteredDossierColonies.length > 0 
            ? this.colon.filter(colon => this.filteredDossierColonies.some(dossier => dossier.id === colon.codeDossier.id)) 
            : [];
            console.log("colon"+this.selectedColons);
        }, err => {
          console.error('Error loading colon colonies:', err);
        },()=>{
          this.colonSubject$.next(this.selectedColons);    
          this.showProgressBar = true;
        });
      },
      (err) => {
        console.error('Error loading dossier colonies:', err); 
        this.showProgressBar = false;
      },()=>{
        this.showProgressBar = true;
        this.subject$.next(this.filteredDossierColonies);
      }
    );
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
  onSeeFile(property: string, row: Colon): void {
    const dialogRef = this.dialog.open(ReadHistoriqueColonieComponent, {
      data: { colon: row, property: property},
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
      this.colon[index] = new Colon(row);
      this.colonSubject$.next(this.colon);
      this.subject$.next(this.dossierColonies);
    });
  }
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  detailsColon(colon: Colon){
    this.dialog
    .open(DetailsColonComponent, {data: colon})
    .afterClosed()
    .subscribe((colon)=>{
      if(colon){
        const index = this.colon.findIndex(
          (existingcolon) => existingcolon.id === colon.id
          );
          this.colon[index] = new Colon(colon);
          this.colonSubject$.next(this.colon);
          this.subject$.next(this.dossierColonies);     
         }
    });
  }
  ngOnDestroy() { }
  
}
