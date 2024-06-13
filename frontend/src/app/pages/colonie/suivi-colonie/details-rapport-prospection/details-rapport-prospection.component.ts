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
    if (this.rapportProspection) {
      const fileBase64 = this.rapportProspection.rapportProspection;
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
