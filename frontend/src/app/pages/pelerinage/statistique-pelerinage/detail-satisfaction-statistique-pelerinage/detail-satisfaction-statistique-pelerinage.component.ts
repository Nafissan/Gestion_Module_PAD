import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ReponsePelerinage } from '../../shared/model/reponse-pelerinage.model';
import { SatisfactionPelerinage } from '../../shared/model/satisfaction-pelerinage.model';
import { ReponsePelerinageService } from '../../shared/services/reponse-pelerinage.service';
import { Question } from 'src/app/pages/colonie/shared/model/question.model';
import { QuestionService } from 'src/app/pages/colonie/shared/service/question.service';

@Component({
  selector: 'fury-detail-satisfaction-statistique-pelerinage',
  templateUrl: './detail-satisfaction-statistique-pelerinage.component.html',
  styleUrls: ['./detail-satisfaction-statistique-pelerinage.component.scss', '../../../../shared/util/bootstrap4.css']
})
export class DetailSatisfactionStatistiquePelerinageComponent implements OnInit {
  satisfaction: SatisfactionPelerinage;
  questions: Question[] = [];
  reponses: ReponsePelerinage[] = [];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SatisfactionPelerinage,
    private questionService: QuestionService,
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
