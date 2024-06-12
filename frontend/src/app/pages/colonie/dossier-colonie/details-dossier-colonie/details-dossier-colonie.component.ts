import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DossierColonie } from '../../shared/model/dossier-colonie.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { AddDossierCongeComponent } from 'src/app/pages/gestion-conge/dossier-conge/add-dossier-conge/add-dossier-conge.component';
import { EtatDossierColonie } from '../../shared/util/util';
import { DossierColonieService } from '../../shared/service/dossier-colonie.service';

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
    private dossierColonieService: DossierColonieService
  ) { }

  ngOnInit(): void {
    this.loadDossierColonie();
  }

  loadDossierColonie(): void {
    this.dossierColonie = this.defaults;
  }

  base64ToBlob(base64: string, mime: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
  }

  getFileLink(base64: string, mime: string): string {
    const blob = this.base64ToBlob(base64, mime);
    return URL.createObjectURL(blob);
  }
}
