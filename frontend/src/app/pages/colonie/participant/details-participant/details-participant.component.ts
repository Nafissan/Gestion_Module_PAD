import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Participant } from '../../shared/model/participant-colonie.model';
import { MatAccordion } from '@angular/material/expansion';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'fury-details-participant',
  templateUrl: './details-participant.component.html',
  styleUrls: ['./details-participant.component.scss']
})
export class DetailsParticipantComponent implements OnInit {
  participant: Participant;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;
  photoUrl: SafeResourceUrl | null = null;


  constructor(@Inject(MAT_DIALOG_DATA) public defaults: Participant,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.participant = this.defaults;
    if (this.isValidBase64(this.participant.photo)) {
      const fileUrl = this.createFileUrl(this.participant.photo);
      this.photoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
    }

  }
  isValidBase64(fileBase64: string): boolean {
    try {
      atob(fileBase64);
      return true;
    } catch (e) {
      return false;
    }
  }

  createFileUrl(base64Data: string): string {
    const mimeType = this.getMimeType(base64Data);
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    return URL.createObjectURL(blob);
  }
  getMimeType(base64Data: string): string {
    if (base64Data.startsWith('/9j/')) {
      return 'image/jpeg';
    } else if (base64Data.startsWith('iVBORw0KGgo')) {
      return 'image/png';
    } 
  }
 
}
