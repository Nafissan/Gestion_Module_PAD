import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'lodash-es';
import { ReplaySubject, Observable } from 'rxjs';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { DialogConfirmationService } from 'src/app/shared/services/dialog-confirmation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Participant } from '../../shared/model/participant.model';
import { ParticipantService } from '../../shared/service/participant.service';

@Component({
  selector: 'fury-validation-participant',
  templateUrl: './validation-participant.component.html',
  styleUrls: ['./validation-participant.component.scss']
})
export class ValidationParticipantComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchMatriculeControl: FormControl = new FormControl();

  participants: Participant[] = [];
  subject$: ReplaySubject<Participant[]> = new ReplaySubject<Participant[]>(1);
  data$: Observable<Participant[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<Participant> | null;

  @Input()
  columns: ListColumn[] = [
    { name: 'Checkbox', property: 'checkbox', visible: false },
    { name: 'Nom', property: 'nom', visible: true, isModelProperty: true },
    { name: 'Prénom', property: 'prenom', visible: true, isModelProperty: true },
    { name: 'Date de Naissance', property: 'dateNaissance', visible: true, isModelProperty: true },
    { name: 'Lieu de Naissance', property: 'lieuNaissance', visible: true, isModelProperty: true },
    { name: 'Groupe Sanguin', property: 'groupeSanguin', visible: true, isModelProperty: true },
    { name: 'Status', property: 'status', visible: false, isModelProperty: true },
    { name: 'Traité par', property: 'agent', visible: false, isModelProperty: true },
    { name: 'Actions', property: 'action', visible: true },
  ] as ListColumn[];

  constructor(
    private participantService: ParticipantService,
    private dialog: MatDialog,
    private dialogConfirmationService: DialogConfirmationService,
    private authentificationService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.participantService.getAllParticipants().subscribe(participants => {
      this.participants = participants;
      this.subject$.next(this.participants);
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim().toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: Participant, filter: string) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
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
  

  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
}
