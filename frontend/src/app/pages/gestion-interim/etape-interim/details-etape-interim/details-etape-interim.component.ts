import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EtapeInterim } from '../../shared/model/etapeInterim.modele';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'fury-details-etape-interim',
  templateUrl: './details-etape-interim.component.html',
  styleUrls: ['./details-etape-interim.component.scss']
})
export class DetailsEtapeInterimComponent implements OnInit {

  static id = 100;
  etapeInterim: EtapeInterim;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Show icon
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<DetailsEtapeInterimComponent>,
  ) {}

  ngOnInit(): void {
    this.etapeInterim =this.defaults
  }
}
