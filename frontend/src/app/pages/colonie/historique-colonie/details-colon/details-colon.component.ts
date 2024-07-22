import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DossierColonie } from '../../shared/model/dossier-colonie.model';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Participant } from '../../shared/model/participant-colonie.model';
import { ParticipantService } from '../../shared/service/participant.service';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'fury-details-colon',
  templateUrl: './details-colon.component.html',
  styleUrls: ['./details-colon.component.scss']
})
export class DetailsColonComponent implements OnInit {
  setDataSourceAttributes() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }  }
  subject$: ReplaySubject<Participant[]> = new ReplaySubject<Participant[]>(1);
  data$: Observable<Participant[]> = this.subject$.asObservable();
  colons: Participant[] = [];        
  showProgressBar = false;
  private sort: MatSort;
  private paginator: MatPaginator;
  dataSource: MatTableDataSource<Participant> | null;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: DossierColonie ,
   private participantService: ParticipantService
) { }

ngOnInit(): void {
  this.loadColons();
  this.dataSource = new MatTableDataSource();
  this.data$.pipe(filter((data) => !!data)).subscribe((colon) => {
    this.colons = colon;
    this.dataSource.data = colon;
  });
}
@Input()
columns: ListColumn[] = [
  { name: "Code Dossier", property: "codeDossier", visible: true, isModelProperty: true },
  { name: "Matricule Parent", property: "matriculeParent", visible: true, isModelProperty: true },
  { name: "Nom Parent", property: "nomParent", visible: true, isModelProperty: true },
  { name: "Prenom Parent", property: "prenomParent", visible: true, isModelProperty: true },
 
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
   { name: "Date de Naissance", property: "dateNaissance", visible: true, isModelProperty: true,},
  { name: "Groupe Sanguin", property: "groupeSanguin", visible: true, isModelProperty: true, },
  { name: "Lieu de Naissance", property: "lieuNaissance", visible: true, isModelProperty: true,},

] as ListColumn[];
get visibleColumns() {
  return this.columns.filter((column) => column.visible).map((column) => column.property);
}
loadColons(): void {
  const annee = this.defaults.annee;
  this.participantService.getParticipantsByAnnee(annee).subscribe(
    (response) => {
      this.colons = response.body as Participant[];
      console.log(this.colons);
    },
    error => {
      console.error('Erreur lors de la récupération des colons :', error);
    },()=>{
      this.subject$.next(this.colons);
      this.showProgressBar = true;
    }
  );
}
}