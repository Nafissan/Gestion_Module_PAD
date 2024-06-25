import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { Participant } from '../../shared/model/participant-colonie.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Observable } from 'rxjs';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { ParticipantService } from '../../shared/service/participant.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { ColonService } from '../../shared/service/colon.service';
import { AddOrUpdateParticipantComponent } from '../add-or-update-participant/add-or-update-participant.component';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogUtil, NotificationUtil } from 'src/app/shared/util/util';
import { filter, map } from 'rxjs/operators';
import { Route, Router } from '@angular/router';
import { Colon } from '../../shared/model/colon.model';
import { DossierColonieService } from '../../shared/service/dossier-colonie.service';
import { DetailsParticipantComponent } from '../details-participant/details-participant.component';
import { EtatDossierColonie } from '../../shared/util/util';

@Component({
  selector: 'fury-liste-participant',
  templateUrl: './liste-participant.component.html',
  styleUrls: ['./liste-participant.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]

})
export class ListeParticipantComponent implements OnInit {
  showProgressBar: boolean = false;
  participantSelected: Participant;
  participants: Participant[]=[];
  subject$: ReplaySubject<Participant[]> = new ReplaySubject<Participant[]>(1);
  data$: Observable<Participant[]> = this.subject$.asObservable();
  pageSize = 4;
  dataSource: MatTableDataSource<Participant> | null;
  selection = new SelectionModel<Participant>(true, []);
  afficherFicheSociale: boolean = false;
  participantSelectionne: Participant;
  afficherDocument : boolean =false;
  fileType: 'ficheSocial' | 'document'; // New property to indicate file type
  
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
    private participantService: ParticipantService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private   colonService: ColonService,
    private dossierColonieService: DossierColonieService // Inject the service

  ) {}

  ngOnInit() {
    this.canAddParticipant();
    this.getParticipants();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((participant) => {
      this.participants = participant;
      this.dataSource.data = participant;
      console.log('Participants Colonies in ngOnInit:', this.participants); // Debugging output
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
  getParticipants(){
    this.participantService.getAll()
      .subscribe((response) => {
        this.participants = response.body;
        console.log(this.participants);
        
      },(err) => {
        console.error('Error loading participant colonies:', err); // Debugging output
      },
      () => {
        this.subject$.next(this.participants);
        this.showProgressBar = true;
      }
    
    );
    
  }
  refreshListe(){
    this.getParticipants();
  }
  getProperty(row: any, property: string) {
    return property.split('.').reduce((acc, part) => acc && acc[part], row);
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
  checkboxLabel(row?: Participant): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  createParticipant(){

    this.dialog.open(AddOrUpdateParticipantComponent)
    .afterClosed().subscribe((participant: any) => {
  if(participant) {
    this.participants.unshift(new Participant(participant));
    this.subject$.next(this.participants);
    this.refreshListe();
  } 
  });
  }
  updateParticipant(participant: Participant){
    this.dialog.open(AddOrUpdateParticipantComponent, {
      data: participant,
    })
    .afterClosed()
    .subscribe((participant)=> {
      if(participant){
        const index = this.participants.findIndex(
          (existingParticipant) =>
            existingParticipant.id === participant.id
        );
        this.participants[index] = new Participant(participant);
        this.subject$.next(this.participants);
        console.log("Apres update"+ this.participants);
        this.refreshListe();
      }
    })
  }
  canAddParticipant(): boolean {
     this.dossierColonieService.getAll().pipe(map(response => {
      const dossiers = response.body;
      const dossierToUpdate = dossiers.find(dossier => 
        dossier.etat === EtatDossierColonie.ouvert || dossier.etat === EtatDossierColonie.saisi
      );
      return !! dossierToUpdate;
    }));
    return false;
  }

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  detailsParticipant(participant: Participant){
    this.dialog
    .open(DetailsParticipantComponent, {data: participant})
    .afterClosed()
    .subscribe((participant)=>{
      if(participant){
        const index = this.participants.findIndex(
          (existingParticipant) => existingParticipant.id === participant.id
          );
          this.participants[index] = new Participant(participant);
          this.subject$.next(this.participants);
          this.refreshListe();
      }
    });
  }
  deleteParticipant(participant: Participant){
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
        this.participantService.deleteParticipant(participant).subscribe((response) => {
          this.participants.splice(
            this.participants.findIndex(
              (existingParticipant) => existingParticipant.id === participant.id
            ),
            1
          );
          this.notificationService.success(NotificationUtil.suppression)
          this.subject$.next(this.participants);
          this.refreshListe();
        }
        ,err => {
          this.notificationService.warn(NotificationUtil.echec);
        });
      }
    })
  }
  validerParticipant(participant: Participant) {
    participant.status = 'VALIDER';
    this.participantService.updateParticipant(participant).subscribe(() => {
      this.notificationService.success('Participant validé avec succès');
      
      const colon: Colon = {
        nomEnfant: participant.nomEnfant,
        prenomEnfant: participant.prenomEnfant,
        dateNaissance: participant.dateNaissance,
        ficheSocial: participant.ficheSocial,
        document: participant.document,
        lieuNaissance: participant.lieuNaissance,
        groupeSanguin: participant.groupeSanguin,
        sexe: participant.sexe,
        matriculeParent: participant.matriculeParent,
        nomParent: participant.nomParent,
        prenomParent: participant.prenomParent,
        status: participant.status,
        matriculeAgent: participant.matriculeAgent,
        nomAgent: participant.nomAgent,
        prenomAgent: participant.prenomAgent,
        id: 0
      };
  
      this.colonService.create(colon).subscribe((response) => {
        this.notificationService.success('Colon créé avec succès'); 
        this.refreshListe();      
      }, () => {
        this.notificationService.warn('Échec de la création du colon');
      });
  
    }, () => {
      this.notificationService.warn('Échec de la validation du participant');
    });
  }
  
  rejeterParticipant(participant: Participant) {
    participant.status = 'REJETER';
    this.participantService.updateParticipant(participant).subscribe(() => {
      this.notificationService.success('Participant rejeté avec succès');
      this.refreshListe();
    }, () => {
      this.notificationService.warn('Échec de rejection du participant');
    });
  }
  afficherFicheSocial(participant: Participant): void {
    this.participantSelectionne = participant;
    this.afficherFicheSociale = true;
    this.afficherDocument = false; 
    this.fileType = 'ficheSocial'; 
  }

  afficherDoc(participant: Participant): void {
    this.participantSelectionne = participant;
    this.afficherFicheSociale = false;
    this.afficherDocument = true;
    this.fileType = 'document'; 
  }

onCellClick(property: string, row: Participant) {
  this.participantSelectionne = row;
  if (property === 'ficheSocial') {
    this.afficherFicheSociale = true;
    this.afficherDocument = false; 
    this.fileType = 'ficheSocial';  
   } else if (property === 'document') {
    this.afficherFicheSociale = false;
    this.afficherDocument = true;
    this.fileType = 'document';   
  }
  console.log(row);
}
 
}
