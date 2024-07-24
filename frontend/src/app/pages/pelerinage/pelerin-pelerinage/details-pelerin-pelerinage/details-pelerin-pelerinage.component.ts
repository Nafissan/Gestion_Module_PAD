import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Pelerin } from '../../shared/model/pelerin-pelerinage.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'fury-details-pelerin-pelerinage',
  templateUrl: './details-pelerin-pelerinage.component.html',
  styleUrls: ['./details-pelerin-pelerinage.component.scss']
})
export class DetailsPelerinPelerinageComponent implements OnInit {

  pelerin: Pelerin;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;


  constructor(@Inject(MAT_DIALOG_DATA) public defaults: Pelerin) { }

  ngOnInit(): void {
    this.pelerin = this.defaults;

  }
  
 
}

