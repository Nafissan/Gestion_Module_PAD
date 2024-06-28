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
    this.getQuestions();
    this.getReponses();
  }

  getQuestions(): void {
    this.questionService.getAllQuestions().subscribe(
      response => {
        this.questions = response.body;
      },
      error => {
        console.error('Error fetching questions', error);
      }
    );
  }

  getReponses(): void {
    this.reponseService.getAllReponses(this.satisfaction).subscribe(
      response => {
        this.reponses = response.body;
      },
      error => {
        console.error('Error fetching responses', error);
      }
    );
  }

  findReponseForQuestion(questionId: number): string {
    const foundReponse = this.reponses.find(reponse => reponse.question.id === questionId);
    return foundReponse ? foundReponse.reponse : 'Non';
  }
}
