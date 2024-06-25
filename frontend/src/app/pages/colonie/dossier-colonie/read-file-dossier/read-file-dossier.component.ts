import { Component, Input, OnInit } from '@angular/core';
import { DossierColonie } from '../../shared/model/dossier-colonie.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'fury-read-file-dossier',
  templateUrl: './read-file-dossier.component.html',
  styleUrls: ['./read-file-dossier.component.scss']
})
export class ReadFileDossierComponent implements OnInit {
  @Input() dossier: DossierColonie;
  @Input() fileType: 'noteMinistere' | 'demandeProspection' | 'noteInformation' | 'noteInstruction' | 'rapportMission';
  pdfDataUrl: SafeResourceUrl;
   showFrame: boolean = true; // Initially true

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadFile();
  }
  loadFile(): void {
    try {
      const base64String = this.getFileContent(this.fileType);
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

  getFileContent(fileType: string): string {
    return this.dossier[fileType];
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
