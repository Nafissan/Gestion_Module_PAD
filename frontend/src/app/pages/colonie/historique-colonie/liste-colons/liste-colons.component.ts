import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Colon } from '../../shared/model/colon.model';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'fury-liste-colons',
  templateUrl: './liste-colons.component.html',
  styleUrls: ['./liste-colons.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]

})
export class ListeColonsComponent implements OnInit {
  @Input() colons: Colon[] = [];
  @Input()
  columns: ListColumn[] = [
    { name: "Code Dossier", property: "codeDossier", visible: true, isModelProperty: true },
    { name: "Matricule Parent", property: "matriculeParent", visible: true, isModelProperty: true },
    { name: "Nom Parent", property: "nomParent", visible: true, isModelProperty: true },
    { name: "Prenom Parent", property: "prenomParent", visible: true, isModelProperty: true },
   
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
    { name: "Ajoute par", property: "ajoutePar", visible: true },
     { name: "Date de Naissance", property: "dateNaissance", visible: true, isModelProperty: true,},
    { name: "Groupe Sanguin", property: "groupeSanguin", visible: false, isModelProperty: true, },
    { name: "Lieu de Naissance", property: "lieuNaissance", visible: false, isModelProperty: true,},
    { name: "Fiche Sociale", property: "ficheSocial", visible: true,  isModelProperty: true,},
    { name: "Document Supplementaire", property: "document", visible: false,  isModelProperty: true,},
    { name: "Status", property: "status", visible: false,  isModelProperty: true,},

  ] as ListColumn[];  
  subject$: ReplaySubject<Colon[]> = new ReplaySubject<Colon[]>(1);
  data$: Observable<Colon[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<Colon> | null;
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
 showProgressBar: boolean = false;
  pageSize = 4;
  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim().toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (data: any, value) => { const dataStr =JSON.stringify(data).toLowerCase(); return dataStr.indexOf(value) != -1; }
  }
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(filter((data) => !!data)).subscribe((participant) => {
      this.dataSource.data = participant;
      this.subject$.next(this.colons);
        this.showProgressBar = true;
    });
  }

}
