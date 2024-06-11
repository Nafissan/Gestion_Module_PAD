import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { Participant } from '../../shared/model/participant.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'fury-read-file-participant',
  templateUrl: './read-file-participant.component.html',
  styleUrls: ['./read-file-participant.component.scss'],
})
export class ReadFileParticipantComponent implements OnInit, OnDestroy {
  @Input() participant: Participant;
  @Input() fileType: 'ficheSocial' | 'document'; // New input to specify file type
  pdfDataUrl: SafeResourceUrl; // Safe URL for the PDF file
  showFrame: boolean = true; // Boolean to control the frame display

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.participant && this.fileType) {
      const file = this.participant[this.fileType];
      if (file instanceof Blob) {
        const objectUrl = URL.createObjectURL(file);
        this.pdfDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
      }
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
