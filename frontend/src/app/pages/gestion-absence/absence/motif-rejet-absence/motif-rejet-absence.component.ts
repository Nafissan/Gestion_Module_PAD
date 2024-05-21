import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Absence } from '../../shared/model/absence.model';
import { AddAbsenceComponent } from '../add-absence/add-absence.component';
import { EtapeAbsence } from '../../shared/model/etape-absence.model';

@Component({
  selector: 'fury-motif-rejet-absence',
  templateUrl: './motif-rejet-absence.component.html',
  styleUrls: ['./motif-rejet-absence.component.scss']
})
export class MotifRejetAbsenceComponent implements OnInit {

  etapeAbsence : EtapeAbsence;
  absence : Absence;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Show icon
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<MotifRejetAbsenceComponent>,
  ) { }

  ngOnInit(): void {
    this.etapeAbsence = this.defaults;
    this.absence = this.defaults;
  }
}
