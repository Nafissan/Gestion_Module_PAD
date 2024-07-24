import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DossierPelerinage } from '../../shared/model/dossier-pelerinage.model';
import { EtatDossierPelerinage } from '../../shared/util/util';
import { MatAccordion } from '@angular/material/expansion';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'fury-details-dossier-pelerinage',
  templateUrl: './details-dossier-pelerinage.component.html',
  styleUrls: ['./details-dossier-pelerinage.component.scss']
})
export class DetailsDossierPelerinageComponent implements OnInit {
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
