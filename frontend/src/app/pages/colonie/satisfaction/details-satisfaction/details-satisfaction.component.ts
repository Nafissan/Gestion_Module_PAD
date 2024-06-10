import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Satisfaction } from '../../shared/model/satisfaction.model'; // Assurez-vous d'importer le modèle Satisfaction
import { SatisfactionService } from '../../shared/service/satisfaction.service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'fury-details-satisfaction',
  templateUrl: './details-satisfaction.component.html',
  styleUrls: ['./details-satisfaction.component.scss', "../../../../shared/util/bootstrap4.css"],
})
export class DetailsSatisfactionComponent implements OnInit {
  satisfaction: Satisfaction; // Définissez le type de données de la satisfaction
@ViewChild(MatAccordion) accordion: MatAccordion;
//Show icon
showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Satisfaction,
    private satisfactionService: SatisfactionService // Inject the SatisfactionService
    // Injectez les données de satisfaction passées en entrée
  ) { }

  ngOnInit(): void {

      this.satisfaction = this.data;
  }
}
