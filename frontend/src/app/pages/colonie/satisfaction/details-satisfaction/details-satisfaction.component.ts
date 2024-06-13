import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Satisfaction } from '../../shared/model/satisfaction.model'; 
import { MatAccordion } from '@angular/material/expansion';
import { Question } from '../../shared/model/question.model';
import { QuestionService } from '../../shared/service/question.service';

@Component({
  selector: 'fury-details-satisfaction',
  templateUrl: './details-satisfaction.component.html',
  styleUrls: ['./details-satisfaction.component.scss', "../../../../shared/util/bootstrap4.css"],
})
export class DetailsSatisfactionComponent implements OnInit {
  satisfaction: Satisfaction; 
  questions: Question[] = [];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Satisfaction,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.satisfaction = this.data;
    this.getQuestions();
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
}