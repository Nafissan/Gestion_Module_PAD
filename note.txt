import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RapportProspection } from '../../shared/model/rapport-prospection.model';
import { RapportProspectionService } from '../../shared/service/rapport-prospection.service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-details-rapport-prospection',
  templateUrl: './details-rapport-prospection.component.html',
  styleUrls: ['./details-rapport-prospection.component.scss']
})
export class DetailsRapportProspectionComponent implements OnInit {
  rapportProspection: RapportProspection;
  fileContent: string | ArrayBuffer;
  report: RapportProspection;
  @ViewChild(MatAccordion) accordion: MatAccordion;
//Show icon
showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private rapportProspectionService: RapportProspectionService
  ) {}

  ngOnInit(): void {
    this.rapportProspectionService.getAllReports().subscribe(reports => {
      this.report= reports.find(result => result.id === this.data.id);
        this.loadFileContent(this.report.rapport);
    })
   
  }

  loadFileContent(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      if (file.type.startsWith('text')) {
        this.fileContent = reader.result as string;
      } else if (file.type === 'application/pdf') {
        const pdfWindow = window.open("");
        pdfWindow.document.write(
          "<iframe width='100%' height='100%' src='" + encodeURI(reader.result as string) + "'></iframe>"
        );
      } else {
        this.fileContent = 'Type de fichier non pris en charge pour l\'affichage.';
      }
    };

    if (file.type.startsWith('text') || file.type === 'application/pdf') {
      reader.readAsDataURL(file); // readAsDataURL to support PDF viewing
    } else {
      this.fileContent = 'Type de fichier non pris en charge pour l\'affichage.';
    }
  }
}
