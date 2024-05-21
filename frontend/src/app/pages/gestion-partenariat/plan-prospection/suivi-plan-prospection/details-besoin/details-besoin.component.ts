import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Besoin } from '../../../shared/model/besoin.model';
import { Partenaire } from '../../../shared/model/partenaire.model';

@Component({
  selector: 'fury-details-besoin',
  templateUrl: './details-besoin.component.html',
  styleUrls: ['./details-besoin.component.scss']
})
export class DetailsBesoinComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true

  partenaires: Partenaire[];
  prospects: Partenaire[];
  
  constructor(@Inject(MAT_DIALOG_DATA) public besoin: Besoin,) { }

  ngOnInit(): void {
    this.partenaires = this.besoin.partenaires.filter((partenaire) => partenaire.partenaire)
    this.prospects = this.besoin.partenaires.filter((partenaire) => !partenaire.partenaire)

  }

}
