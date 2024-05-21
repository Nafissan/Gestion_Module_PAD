import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddDossierCongeComponent } from '../add-dossier-conge/add-dossier-conge.component';
import { DossierConge } from '../../shared/model/dossier-conge.model';
import { MatAccordion } from '@angular/material/expansion';
import { EtatDossierConge } from '../../shared/util/util';

@Component({
  selector: 'fury-details-dossier-conge',
  templateUrl: './details-dossier-conge.component.html',
  styleUrls: ['./details-dossier-conge.component.scss', "../../../../shared/util/bootstrap4.css" ]
})
export class DetailsDossierCongeComponent implements OnInit {
  dossierConge: DossierConge;
  saisi: string = EtatDossierConge.saisi;
  ouvrir: string = EtatDossierConge.ouvert;
  fermer: string = EtatDossierConge.fermer;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Show icon
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: DossierConge,
    private dialogRef: MatDialogRef<AddDossierCongeComponent>,
  ) { }

  ngOnInit(): void {
    this.dossierConge = this.defaults;
  }

}
