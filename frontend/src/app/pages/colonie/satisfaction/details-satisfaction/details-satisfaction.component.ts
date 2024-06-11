import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Satisfaction } from '../../shared/model/satisfaction.model'; 
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'fury-details-satisfaction',
  templateUrl: './details-satisfaction.component.html',
  styleUrls: ['./details-satisfaction.component.scss', "../../../../shared/util/bootstrap4.css"],
})
export class DetailsSatisfactionComponent implements OnInit {
  satisfaction: Satisfaction; 
@ViewChild(MatAccordion) accordion: MatAccordion;
showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Satisfaction,
  ) { }

  ngOnInit(): void {

      this.satisfaction = this.data;
  }
}
