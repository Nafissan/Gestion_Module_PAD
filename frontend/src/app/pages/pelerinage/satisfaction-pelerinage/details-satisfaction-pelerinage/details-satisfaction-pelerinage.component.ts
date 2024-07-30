import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { SatisfactionPelerinage } from '../../shared/model/satisfaction-pelerinage.model';
import { ReponsePelerinage } from '../../shared/model/reponse-pelerinage.model';
import { ReponsePelerinageService } from '../../shared/services/reponse-pelerinage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Question } from 'src/app/pages/colonie/shared/model/question.model';

@Component({
  selector: 'fury-details-satisfaction-pelerinage',
  templateUrl: './details-satisfaction-pelerinage.component.html',
  styleUrls: ['./details-satisfaction-pelerinage.component.scss', '../../../../shared/util/bootstrap4.css']
})
export class DetailsSatisfactionPelerinageComponent implements OnInit {
  satisfaction: SatisfactionPelerinage;
  questions: Question[] = [];
  reponses: ReponsePelerinage[] = [];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SatisfactionPelerinage,
    private reponseService: ReponsePelerinageService
  ) { }

  ngOnInit(): void {this.satisfaction = this.data;
    this.getReponses();
  }
  getReponses(): void {
    console.log(this.data);
    this.reponseService.getReponsesByFormulaireId(this.data).subscribe(
      response => {
        this.reponses = response.body as ReponsePelerinage[];
        this.extractQuestionsFromReponses();

      },
      error => {
        console.error('Error fetching responses', error);
      }
    );
  }
  extractQuestionsFromReponses(): void {
    const questionMap = new Map<number, Question>();
    this.reponses.forEach(reponse => {
      if (!questionMap.has(reponse.question.id)) {
        questionMap.set(reponse.question.id, reponse.question);
      }
    });
    this.questions = Array.from(questionMap.values());
  }
  findReponseForQuestion(questionId: number): string {
    const foundReponse = this.reponses.find(reponse => reponse.question.id === questionId);
    return foundReponse ? foundReponse.reponse : 'Non';
  }
}
