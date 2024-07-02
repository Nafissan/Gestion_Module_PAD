import { Component, Inject, Input, OnInit } from '@angular/core';
import { DossierColonie } from '../../shared/model/dossier-colonie.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'fury-read-file-dossier',
  templateUrl: './read-file-dossier.component.html',
  styleUrls: ['./read-file-dossier.component.scss']
})
export class ReadFileDossierComponent implements OnInit {
  dossier: DossierColonie;
  property: string;
  pdfDataUrl: SafeResourceUrl;
   showFrame: boolean = true; // Initially true

  constructor(private sanitizer: DomSanitizer,    @Inject(MAT_DIALOG_DATA) public data: { dossier: DossierColonie, property: string }
) { this.dossier = data.dossier;
  this.property = data.property;}

  ngOnInit() {
    this.loadFile();
  }
  loadFile(): void {
    try {
      const base64String = this.getFileContent(this.property);
      if (this.isValidBase64(base64String)) {
        const binaryString = atob(base64String);
        const byteNumbers = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          byteNumbers[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: 'application/pdf' });
        this.pdfDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
        console.log(this.pdfDataUrl);
      }
    } catch (error) {
      console.error('Error decoding base64 string:', error);
    }
  }

  getFileContent(property: string): string {
    return this.dossier[property];
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
