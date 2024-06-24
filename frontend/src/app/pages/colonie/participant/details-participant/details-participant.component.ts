import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Participant } from '../../shared/model/participant-colonie.model';
import { MatAccordion } from '@angular/material/expansion';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'fury-details-participant',
  templateUrl: './details-participant.component.html',
  styleUrls: ['./details-participant.component.scss']
})
export class DetailsParticipantComponent implements OnInit {
  participant: Participant;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;
  constructor( @Inject(MAT_DIALOG_DATA) public defaults: Participant,
) { }

  ngOnInit(): void {
    this.participant=this.defaults;
  }

}
