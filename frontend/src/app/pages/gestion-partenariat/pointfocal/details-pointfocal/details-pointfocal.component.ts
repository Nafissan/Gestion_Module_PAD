import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Pointfocal } from '../../shared/model/pointfocal.model';

@Component({
  selector: 'fury-details-pointfocal',
  templateUrl: './details-pointfocal.component.html',
  styleUrls: ['./details-pointfocal.component.scss']
})
export class DetailsPointfocalComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  pointfocal: Pointfocal;
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Pointfocal,
    private dialogRef: MatDialogRef<DetailsPointfocalComponent>,
  ) { }

  ngOnInit(): void {
    this.pointfocal = this.defaults;
  }

}
