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
  photoUrl: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: Participant) { }

  ngOnInit(): void {
    this.participant = this.defaults;
    this.convertPhotoToFile(this.participant.photo);
  }

  convertPhotoToFile(base64Photo: string) {
    if (base64Photo) {
      const byteCharacters = atob(base64Photo);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });
      this.photoUrl = URL.createObjectURL(blob);
    }
  }
}
