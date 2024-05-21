import { Component, OnInit ,ViewChild ,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { PlanProspection } from '../../shared/model/plan-prospection.model';

@Component({
  selector: 'fury-details-plan-prospection',
  templateUrl: './details-plan-prospection.component.html',
  styleUrls: ['./details-plan-prospection.component.scss']
})
export class DetailsPlanProspectionComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  planprospection: PlanProspection;
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: PlanProspection,
    private dialogRef: MatDialogRef<DetailsPlanProspectionComponent>,
  ) { }

  ngOnInit(): void {
    this.planprospection = this.defaults;
  }

}
