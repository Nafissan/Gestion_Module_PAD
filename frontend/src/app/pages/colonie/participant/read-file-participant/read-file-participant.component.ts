import { Component, Inject, Input, OnInit } from '@angular/core';
import { Participant } from '../../shared/model/participant.model';
import { ParticipantService } from '../../shared/service/participant.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'fury-read-file-participant',
  templateUrl: './read-file-participant.component.html',
  styleUrls: ['./read-file-participant.component.scss'],
})
export class ReadFileParticipantComponent implements OnInit {
  @Input() participant: Participant;
  pdfDataUrl: SafeResourceUrl; // Safe URL for the PDF file
  showFrame: boolean = true; // Boolean to control the frame display

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.participant && this.participant.ficheSocial instanceof Blob) {
      const objectUrl = URL.createObjectURL(this.participant.ficheSocial);
      this.pdfDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
    }
  }

  ngOnDestroy(): void {
    if (this.pdfDataUrl) {
      const objectUrl = this.pdfDataUrl as string;
      URL.revokeObjectURL(objectUrl);
    }
  }

  closeFrame(): void {
    this.showFrame = false;
  }
}