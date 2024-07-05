import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Colon } from '../../shared/model/colon.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'fury-details-colon',
  templateUrl: './details-colon.component.html',
  styleUrls: ['./details-colon.component.scss']
})
export class DetailsColonComponent implements OnInit {
  colon:Colon;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: Colon) { }

  ngOnInit(): void {
    this.colon=this.defaults;
  }

}
