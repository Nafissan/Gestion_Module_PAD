import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DossierColonie } from '../../shared/model/dossier-colonie.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { AddDossierCongeComponent } from 'src/app/pages/gestion-conge/dossier-conge/add-dossier-conge/add-dossier-conge.component';
import { EtatDossierColonie } from '../../shared/util/util';

@Component({
  selector: 'fury-details-dossier-colonie',
  templateUrl: './details-dossier-colonie.component.html',
  styleUrls: ['./details-dossier-colonie.component.scss']
})
export class DetailsDossierColonieComponent implements OnInit {
  dossierColonie: DossierColonie;
  saisi: string = EtatDossierColonie.saisi;
  ouvrir: string = EtatDossierColonie.ouvert;
  fermer: string = EtatDossierColonie.fermer;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: DossierColonie,
    private dialogRef: MatDialogRef<AddDossierCongeComponent>,
  ) { }

  ngOnInit(): void {
    this.loadDossierColonie();
  }

  loadDossierColonie(): void {
    this.dossierColonie = this.defaults;
  }

}
