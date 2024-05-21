import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddEtapeabsenceComponent } from '../add-etapeabsence/add-etapeabsence.component';
import { AddAbsenceComponent } from '../../absence/add-absence/add-absence.component';
import { EtapeAbsence } from '../../shared/model/etape-absence.model';
import { Absence } from '../../shared/model/absence.model';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';


@Component({
  selector: 'fury-details-etapeabsence',
  templateUrl: './details-etapeabsence.component.html',
  styleUrls: ['./details-etapeabsence.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class DetailsEtapeabsenceComponent implements OnInit {
  etapeAbsence: EtapeAbsence;
  absence: Absence;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Show icon
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddEtapeabsenceComponent, AddAbsenceComponent>,
    
  ) { }

  ngOnInit(): void {
    this.etapeAbsence = this.defaults;
    this.absence = this.defaults;
  }
}
