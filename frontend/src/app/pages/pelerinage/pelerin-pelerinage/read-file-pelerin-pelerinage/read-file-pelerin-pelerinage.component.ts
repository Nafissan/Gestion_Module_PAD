import { Component, Inject, OnInit } from '@angular/core';
import { Pelerin } from '../../shared/model/pelerin-pelerinage.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'fury-read-file-pelerin-pelerinage',
  templateUrl: './read-file-pelerin-pelerinage.component.html',
  styleUrls: ['./read-file-pelerin-pelerinage.component.scss']
})
export class ReadFilePelerinPelerinageComponent implements OnInit {

  pelerin: Pelerin;
 fileType: string; // New input to specify file typ
  pdfDataUrl: SafeResourceUrl; // Safe URL for the PDF file
  showFrame: boolean = true; // Boolean to control the frame display

  constructor(private sanitizer: DomSanitizer,    @Inject(MAT_DIALOG_DATA) public data: { pelerin: Pelerin, property: string }){this.pelerin= data.pelerin; this.fileType=data.property}

  ngOnInit() {
    try {
    if (this.pelerin && this.fileType) {
      const fileBase64 = this.pelerin[this.fileType];
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
