import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Colon } from '../../shared/model/colon.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DossierColonie } from '../../shared/model/dossier-colonie.model';
import { ColonService } from '../../shared/service/colon.service';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'fury-details-colon',
  templateUrl: './details-colon.component.html',
  styleUrls: ['./details-colon.component.scss']
})
export class DetailsColonComponent implements OnInit {
  setDataSourceAttributes() {
    throw new Error('Method not implemented.');
  }
  colons: Colon[] = [];        
  showProgressBar = false;
  private sort: MatSort;
  private paginator: MatPaginator;
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
   private colonService: ColonService
) { }

ngOnInit(): void {
  this.loadColons();
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
  this.colonService.getColonsByAnnee(annee).subscribe(
    (response) => {
      this.colons = response.body;
    },
    error => {
      console.error('Erreur lors de la récupération des colons :', error);
    },()=>{
      this.showProgressBar = true;
    }
  );
}
}