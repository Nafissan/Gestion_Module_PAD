import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Satisfaction } from '../../shared/model/satisfaction.model';
import { MatAccordion } from '@angular/material/expansion';
import { Question } from '../../shared/model/question.model';
import { QuestionService } from '../../shared/service/question.service';
import { ReponseService } from '../../shared/service/reponse.service';
import { Reponse } from '../../shared/model/reponse.model';

@Component({
  selector: 'fury-details-satisfaction',
  templateUrl: './details-satisfaction.component.html',
  styleUrls: ['./details-satisfaction.component.scss', '../../../../shared/util/bootstrap4.css'],
})
export class DetailsSatisfactionComponent implements OnInit {
  satisfaction: Satisfaction;
  questions: Question[] = [];
  reponses: Reponse[] = [];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Satisfaction,
    private questionService: QuestionService,
    private reponseService: ReponseService
  ) { }

  ngOnInit(): void {
    this.satisfaction = this.data;
    this.getReponses();
  }



  getReponses(): void {
    this.reponseService.getAllReponses().subscribe(
      response => {
        this.reponses = response.body.filter(reponse => reponse.formulaire.id === this.satisfaction.id);
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
