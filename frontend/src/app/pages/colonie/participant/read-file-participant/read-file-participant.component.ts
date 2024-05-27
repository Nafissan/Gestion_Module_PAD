import { Component, Inject, Input, OnInit } from '@angular/core';
import { Participant } from '../../shared/model/participant.model';
import { ParticipantService } from '../../shared/service/participant.service';

@Component({
  selector: 'fury-read-file-participant',
  templateUrl: './read-file-participant.component.html',
  styleUrls: ['./read-file-participant.component.scss'],
})
export class ReadFileParticipantComponent implements OnInit {
  @Input() participant: Participant;
  pdfDataUrl: string; // URL du fichier PDF
  showFrame: boolean = true; // Booléen pour contrôler l'affichage du frame

  constructor() { }

  ngOnInit(): void {
    if (this.participant && this.participant.ficheSocial instanceof Blob) {
      this.pdfDataUrl = URL.createObjectURL(this.participant.ficheSocial);
    }
  }

  ngOnDestroy(): void {
    if (this.pdfDataUrl) {
      URL.revokeObjectURL(this.pdfDataUrl);
    }
  }
  closeFrame(): void {
    this.showFrame = false;
  }
}