import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Motif } from '../../shared/model/motif.model';
import { MatAccordion } from '@angular/material/expansion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddMotifAbsenceComponent } from '../add-motif-absence/add-motif-absence.component';

@Component({
  selector: 'fury-details-motif-absence',
  templateUrl: './details-motif-absence.component.html',
  styleUrls: ['./details-motif-absence.component.scss']
})
export class DetailsMotifAbsenceComponent implements OnInit {

  motif: Motif;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Show icon
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddMotifAbsenceComponent>,
  ) { }

  ngOnInit(): void {
    this.motif = this.defaults;
  }
}
