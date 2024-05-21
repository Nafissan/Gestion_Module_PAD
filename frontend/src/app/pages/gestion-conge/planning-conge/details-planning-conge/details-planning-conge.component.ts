import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { PlanningConge } from "../../shared/model/planning-conge.model";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'fury-details-planning-conge',
  templateUrl: './details-planning-conge.component.html',
  styleUrls: ['./details-planning-conge.component.scss']
})
export class DetailsPlanningCongeComponent implements OnInit {
  planningConge: PlanningConge;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Show icon
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PlanningConge,
    private dialogRef: MatDialogRef<DetailsPlanningCongeComponent>,
  ) { }

  ngOnInit(): void {
    this.planningConge = this.data;
  }

}
