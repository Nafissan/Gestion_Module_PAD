import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddContinentComponent } from '../add-continent/add-continent.component';
import { MatAccordion } from '@angular/material/expansion';
import { Continent } from '../../shared/model/continent.model';

@Component({
  selector: 'fury-details-continent',
  templateUrl: './details-continent.component.html',
  styleUrls: ['./details-continent.component.scss', "../../../../shared/util/bootstrap4.css" ]
})
export class DetailsContinentComponent implements OnInit {
  continent: Continent;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Show icon
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Continent,
    private dialogRef: MatDialogRef<DetailsContinentComponent>,
  ) { }

  ngOnInit(): void {
    this.continent = this.defaults;
  }

}
