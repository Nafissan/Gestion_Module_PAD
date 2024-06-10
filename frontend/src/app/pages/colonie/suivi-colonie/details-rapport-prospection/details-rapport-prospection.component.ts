import { Component, Input, OnInit } from '@angular/core';
import { RapportProspection } from '../../shared/model/rapport-prospection.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details-rapport-prospection',
  templateUrl: './details-rapport-prospection.component.html',
  styleUrls: ['./details-rapport-prospection.component.scss']
})
export class DetailsRapportProspectionComponent implements OnInit {
  @Input()rapportProspection: RapportProspection;
  pdfDataUrl: SafeResourceUrl; // Safe URL for the PDF file
  showFrame: boolean = true;
  
  constructor(
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if(this.rapportProspection && this.rapportProspection.rapport instanceof Blob){
      const objectUrl = URL.createObjectURL(this.rapportProspection.rapport);
      this.pdfDataUrl =this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
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
