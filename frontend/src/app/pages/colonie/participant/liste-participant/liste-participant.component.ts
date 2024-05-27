import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { Participant } from '../../shared/model/participant.model';
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
import { AgentService } from 'src/app/shared/services/agent.service';
import { AddOrUpdateParticipantComponent } from '../add-or-update-participant/add-or-update-participant.component';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationUtil } from 'src/app/shared/util/util';
import { filter } from 'rxjs/operators';
import { Route, Router } from '@angular/router';
import { ReadFileParticipantComponent } from '../read-file-participant/read-file-participant.component';

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
     { name: "Checkbox", property: "checkbox", visible: true },
     { name: "Matricule Parent", property: "agentParent.matricule", visible: true, isModelProperty: true },
     { name: "Nom Parent", property: "agentParent.nom", visible: true, isModelProperty: true },
     { name: "Prenom Parent", property: "agentParent.prenom", visible: true, isModelProperty: true },
    
     {
       name: "Nom Enfant",
       property: "nom", 
       visible: true,   
       isModelProperty: true,
     },
     {
       name: "Prenom Enfant",
       property: "prenom", 
       visible: true,   
       isModelProperty: true,
     },
     { name: "Date de Naissance", property: "dateNaissance", visible: true, isModelProperty: true,},
     { name: "Groupe Sanguin", property: "groupeSanguin", visible: false, isModelProperty: true, },
     { name: "Lieu de Naissance", property: "lieuNaissance", visible: false, isModelProperty: true,},
     { name: "Fiche Sociale", property: "ficheSocial.name", visible: true,  isModelProperty: true,},
     { name: "Status", property: "status", visible: false,  isModelProperty: true,},
     { name: "Actions", property: "actions", visible: true },
   ] as ListColumn[];
  constructor(
    private participantService: ParticipantService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private agentService: AgentService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.getParticipants();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((participant) => {
      this.participants = participant;
      this.dataSource.data = participant;
      console.log('Participants Colonies in ngOnInit:', this.participants); // Debugging output
    });
  }
  ngAfterViewInit() {
    this.setDataSourceAttributes();
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
    this.participantService.getAllParticipants()
      .subscribe((response) => {
        this.participants = response;
        console.log(this.participants);
      this.participantSelected = this.participants.find(e => e.id ===1);
        this.subject$.next(this.participants);
        this.showProgressBar = true;
      },(err) => {
        console.error('Error loading participant colonies:', err); // Debugging output
      }
    
    );
    
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
    this.participants.unshift(participant);
    this.subject$.next(this.participants);
  } 
  });
  }
  updateParticipant(participant: Participant){
    this.dialog.open(AddOrUpdateParticipantComponent, {
      data: participant,
    })
    .afterClosed()
    .subscribe((participant)=> {
      this.getParticipants();
      if(participant){
        const index = this.participants.findIndex(
          (existingParticipant) =>
            existingParticipant.id === participant.id
        );
        this.participants[index] = participant;
        this.subject$.next(this.participants);
        console.log(this.participants);
      }
    })
  }
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
  deleteParticipant(participant: Participant){
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === 'CONFIRMER') {
        this.participantService.delete(participant).subscribe((response) => {
          this.notificationService.success(NotificationUtil.suppression)
          this.participants.splice(
            this.participants.findIndex(
              (existingParticipant) => existingParticipant.id === participant.id
            ),
            1
          );
          this.subject$.next(this.participants);
        }
        ,err => {
          this.notificationService.warn(NotificationUtil.echec);
        });
      }
    })
  }
   validerParticipant(participant: Participant) {
    // Update the participant state to 'validated'
    participant.status = 'validee';
    this.participantService.updateParticipant(participant).subscribe(() => {
      this.notificationService.success('Participant validé avec succès');
    }, () => {
      this.notificationService.warn('Échec de la validation du participant');
    });
  }
  afficherFicheSocial(participant: Participant): void {
    this.participantSelectionne = participant;
    this.afficherFicheSociale = true;
}
telechargerFicheSocial(participant: Participant) {
  const ficheSocialBlob = new Blob([participant.ficheSocial], { type: 'application/pdf' });
  const ficheSocialUrl = window.URL.createObjectURL(ficheSocialBlob);
  const a = document.createElement('a');
  a.href = ficheSocialUrl;
  a.download = `Fiche_Sociale_${participant.nom}_${participant.prenom}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(ficheSocialUrl);
}
}
