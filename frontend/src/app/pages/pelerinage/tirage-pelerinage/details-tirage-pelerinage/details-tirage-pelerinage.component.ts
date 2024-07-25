import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { TirageAgent } from '../../shared/model/tirage-pelerinage.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'fury-details-tirage-pelerinage',
  templateUrl: './details-tirage-pelerinage.component.html',
  styleUrls: ['./details-tirage-pelerinage.component.scss']
})
export class DetailsTiragePelerinageComponent implements OnInit {
  tirage: TirageAgent;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;


  constructor(@Inject(MAT_DIALOG_DATA) public defaults: TirageAgent) { }

  ngOnInit(): void {
    this.tirage = this.defaults;

  }
}
