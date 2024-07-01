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
  selectedColons: Colon[] = [];
  filteredDossierColonies: DossierColonie[]=[];
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
  @Input()
  columns: ListColumn[] = [
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

  constructor(
    private dossierColonieService: DossierColonieService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private mailService: MailService,
    private participantService: ParticipantService
  ) { }

  ngOnInit() {
    this.getDossierColonies();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((dossierColonies) => {
      this.dossierColonies = dossierColonies;
      this.dataSource.data = dossierColonies;
      console.log('Dossier Colonies in ngOnInit:', this.dossierColonies); // Debugging output
    });
  }

  ngAfterViewInit() {
    this.setDataSourceAttributes();
  }
  yearSelected(params) {
    this.dateV.setValue(params);
    this.anneeSelected = params.year().toString();
    this.picker.close();
    this.getDossierColonies();
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
    this.dataSource.filterPredicate = (data: any, value) => {
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
              new Date(dossier.createdAt).getFullYear() === parseInt(this.anneeSelected)
            ) 
          : this.dossierColonies.filter(dossier => dossier.etat === EtatDossierColonie.fermer);
        console.log('Filtered Dossier Colonies:', this.filteredDossierColonies); 
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
  
  afficherListe(dossier: DossierColonie) {
    this.selectedDossierColonie = dossier;
  }
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  ngOnDestroy() { }
  loadFile(file: File) {
    this.fileToLoad = file;
  }
 
}
