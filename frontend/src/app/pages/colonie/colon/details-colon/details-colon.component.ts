import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Colon } from '../../shared/model/colon.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'fury-details-colon',
  templateUrl: './details-colon.component.html',
  styleUrls: ['./details-colon.component.scss']
})
export class DetailsColonComponent implements OnInit {
  colon:Colon;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;  photoUrl: string | null = null;
  fileDataUrl: SafeResourceUrl | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: Colon,    private sanitizer: DomSanitizer,
) { }

  ngOnInit(): void {
    this.colon=this.defaults;    
     if (this.isValidBase64(this.colon.photo)) {
      const fileUrl = this.createFileUrl(this.colon.photo);
      this.fileDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
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
