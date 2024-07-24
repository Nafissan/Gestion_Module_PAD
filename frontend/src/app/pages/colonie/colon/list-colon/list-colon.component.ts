import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { filter } from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { DetailsColonComponent } from '../details-colon/details-colon.component';
import { ReadFileColonComponent } from '../read-file-colon/read-file-colon.component';
import { Participant } from '../../shared/model/participant-colonie.model';
import { ParticipantService } from '../../shared/service/participant.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'fury-list-colon',
  templateUrl: './list-colon.component.html',
  styleUrls: ['./list-colon.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation]

})
export class ListColonComponent implements OnInit {
  dataSource: MatTableDataSource<Participant> | null;
  private paginator: MatPaginator;
  colon: Participant[]=[];
  subject$: ReplaySubject<Participant[]> = new ReplaySubject<Participant[]>(1);
  data$: Observable<Participant[]> = this.subject$.asObservable();
  pageSize = 4;
  selection = new SelectionModel<Participant>(true, []);
  private sort: MatSort;
  showProgressBar: boolean=false;
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
     { name: "Ajoute par", property: "ajoutePar", visible: false },
      { name: "Date de Naissance", property: "dateNaissance", visible: true, isModelProperty: true,},
     { name: "Groupe Sanguin", property: "groupeSanguin", visible: false, isModelProperty: true, },
     { name: "Lieu de Naissance", property: "lieuNaissance", visible: false, isModelProperty: true,},
     { name: "Fiche Sociale", property: "ficheSocial", visible: true,  isModelProperty: true,},
     { name: "Document Supplementaire", property: "document", visible: false,  isModelProperty: true,},
     { name: "Status", property: "status", visible: true,  isModelProperty: true,},
     { name: "Actions", property: "actions", visible: true },

   ] as ListColumn[];
  constructor(
    private dialog: MatDialog,
    private authentificationService: AuthenticationService,
    private participantService: ParticipantService,    
    private notificationService: NotificationService,

  ) { }

  ngOnInit() {
    this.getColons();
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((colon) => {
      this.colon = colon;
      this.dataSource.data = colon;
    });
  }
  getColons() {
      this.participantService.getParticipantsValide().subscribe(response => {
        this.colon = response.body as Participant[];
      console.log(this.colon.length);
      }, err => {
        console.error('Error loading participant colonies:', err);
      },()=>{
        this.subject$.next(this.colon);
        this.showProgressBar = true;
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
  sendMessages() {
    this.participantService.sendMessages().subscribe(
      (response) => {
        this.notificationService.success('Messages envoyés avec succès');
      },
      (error) => {
        if (error.status === 500) {
          this.notificationService.warn('Échec de l\'envoi des messages');
        } else {
          this.notificationService.warn('Une erreur s\'est produite: ' + error.message);
        }
      }
    );
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
  detailsColon(colon: Participant){
    this.dialog
    .open(DetailsColonComponent, {data: colon})
    .afterClosed()
    .subscribe((colon)=>{
      if(colon){
        const index = this.colon.findIndex(
          (existingcolon) => existingcolon.id === colon.id
          );
          this.colon[index] = new Participant(colon);
          this.subject$.next(this.colon);
      }
    });
  }
  onCellClick(property: string, row: Participant) {
    const dialogRef = this.dialog.open(ReadFileColonComponent, {
      data: { colon: row, property: property },
      width: '80%',
      height: '80%',
      maxWidth: '100vw', 
      maxHeight: '100vh', 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      const index = this.colon.findIndex(
        (existingParticipant) => existingParticipant.id === row.id
      );
      this.colon[index] = new Participant(row);
      this.subject$.next(this.colon);
    }); 
  }
  
  hasAnyRole(roles: string[]) {
    return this.authentificationService.hasAnyRole(roles);
  }
 
}
