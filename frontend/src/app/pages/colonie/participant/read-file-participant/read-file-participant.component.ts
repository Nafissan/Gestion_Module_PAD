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
      const fileBase64 = this.participant[this.fileType];
      if (fileBase64) {
        const byteCharacters = atob(fileBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const objectUrl = URL.createObjectURL(blob);
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
