import { Component, Inject, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Participant } from '../../shared/model/participant-colonie.model';

@Component({
  selector: 'fury-read-file-colon',
  templateUrl: './read-file-colon.component.html',
  styleUrls: ['./read-file-colon.component.scss']
})
export class ReadFileColonComponent implements OnInit {
  colon: Participant;
 fileType: string;
  pdfDataUrl: SafeResourceUrl; 
  showFrame: boolean = true;

  constructor(private sanitizer: DomSanitizer , @Inject(MAT_DIALOG_DATA) public data: { colon: Participant, property: string }){this.colon= data.colon; this.fileType=data.property}


  ngOnInit(): void {
    try {
      if (this.colon && this.fileType) {
        const fileBase64 = this.colon[this.fileType];
        if (this.isValidBase64(fileBase64)) {
          const binaryString = atob(fileBase64);
          const byteNumbers = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            byteNumbers[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([byteNumbers], { type: 'application/pdf' });
          this.pdfDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
          console.log(this.pdfDataUrl);
        }
      }
    } catch (error) {
      console.error('Error decoding base64 string:', error);
    }
  }
  isValidBase64(base64: string): boolean {
    try {
      atob(base64);
      return true;
    } catch (e) {
      return false;
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
