import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { PlanningConge } from "../../shared/model/planning-conge.model";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlanningDirection } from '../../shared/model/planning-direction.model';
import { EtatPlanningDirection } from "../../shared/util/util";

@Component({
  selector: 'fury-details-planning-direction',
  templateUrl: './details-planning-direction.component.html',
  styleUrls: ['./details-planning-direction.component.scss', "../../../../shared/util/bootstrap4.css" ]
})
export class DetailsPlanningDirectionComponent implements OnInit {
  planningDirection: PlanningDirection;
  saisi: string = EtatPlanningDirection.saisi;
  encours: string = EtatPlanningDirection.encours;
  valide: string = EtatPlanningDirection.valider;
  transmis: string = EtatPlanningDirection.transmis;
  impute: string = EtatPlanningDirection.imputer;
  cloture: string = EtatPlanningDirection.cloturer;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Show icon
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: PlanningDirection,
    private dialogRef: MatDialogRef<DetailsPlanningDirectionComponent>,
  ) { }

  ngOnInit(): void {
    this.planningDirection = this.defaults;
  }

}
