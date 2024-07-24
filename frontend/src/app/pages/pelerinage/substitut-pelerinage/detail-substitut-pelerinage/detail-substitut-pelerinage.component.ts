import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Substitut } from '../../shared/model/substitut-pelerinage.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'fury-detail-substitut-pelerinage',
  templateUrl: './detail-substitut-pelerinage.component.html',
  styleUrls: ['./detail-substitut-pelerinage.component.scss']
})
export class DetailSubstitutPelerinageComponent implements OnInit {

  substitut: Substitut;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;


  constructor(@Inject(MAT_DIALOG_DATA) public defaults: Substitut) { }

  ngOnInit(): void {
    this.substitut = this.defaults;

  }
}
