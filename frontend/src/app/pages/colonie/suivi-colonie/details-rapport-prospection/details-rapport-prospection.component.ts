import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RapportProspection } from '../../shared/model/rapport-prospection.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details-rapport-prospection',
  templateUrl: './details-rapport-prospection.component.html',
  styleUrls: ['./details-rapport-prospection.component.scss']
})
export class DetailsRapportProspectionComponent implements OnInit, OnDestroy {
  @Input() rapportProspection: RapportProspection;
  pdfDataUrl: SafeResourceUrl; 
  showFrame: boolean = true; 

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    try {
      if (this.rapportProspection) {
        const fileBase64 = this.rapportProspection.rapportProspection;
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
