import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { DossierPelerinage } from '../../shared/model/dossier-pelerinage.model';
import { EtatDossierPelerinage } from '../../shared/util/util';

@Component({
  selector: 'fury-details-historique-pelerinage',
  templateUrl: './details-historique-pelerinage.component.html',
  styleUrls: ['./details-historique-pelerinage.component.scss']
})
export class DetailsHistoriquePelerinageComponent implements OnInit {
  dossierPelerinage: DossierPelerinage;
  saisi: string = EtatDossierPelerinage.saisi;
  ouvrir: string = EtatDossierPelerinage.ouvert;
  fermer: string = EtatDossierPelerinage.fermer;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: DossierPelerinage,
  ) { }

  ngOnInit(): void {
    this.loadDossierColonie();
  }

  loadDossierColonie(): void {
    this.dossierPelerinage = this.defaults;
  }

}
