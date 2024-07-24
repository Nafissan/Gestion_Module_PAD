import { Component, Inject, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DossierColonie } from '../../shared/model/dossier-colonie.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RapportProspection } from '../../shared/model/rapport-prospection.model';
import { RapportProspectionService } from '../../shared/service/rapport-prospection.service';

@Component({
  selector: 'fury-read-historique-colonie',
  templateUrl: './read-historique-colonie.component.html',
  styleUrls: ['./read-historique-colonie.component.scss']
})
export class ReadHistoriqueColonieComponent implements OnInit {
    dossier: DossierColonie;
    property: string;
    rapportProspection: string;

    pdfDataUrl: SafeResourceUrl;
     showFrame: boolean = true; // Initially true
  
    constructor(private sanitizer: DomSanitizer,    @Inject(MAT_DIALOG_DATA) public data: { dossier: DossierColonie, property: string },
    private rapportService: RapportProspectionService) {
      if(data.dossier) this.dossier = data.dossier;
      this.property = data.property;
    }
  
    ngOnInit(): void {
        this.loadFileContent();
    }
  

    async loadFileContent(): Promise<void> {
      try {
        const base64String = await this.getFileContent(this.property); // Utilisez await ici
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
      async getFileContent(property: string): Promise<string> {
        if (property === "rapportProspection") {
          await this.getRapportProspection();
          return this.rapportProspection;
        } else {
          return this.dossier[property];
        }
      }
      
      getRapportProspection(): Promise<void> {
        return new Promise((resolve, reject) => {
          this.rapportService.getRapportByDossier(this.dossier).subscribe(
            (data) => {
              const dossier = data.body as RapportProspection;
              this.rapportProspection = dossier.rapportProspection;
              console.log(dossier);
              resolve();
            },
            (error) => {
              console.error('Error fetching rapport prospection', error);
              reject(error);
            }
          );
        });
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
   
