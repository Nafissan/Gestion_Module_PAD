
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Satisfaction } from '../model/satisfaction.model';

@Injectable({
  providedIn: 'root',
})
export class SatisfactionService {
  private satisfactionsList: Satisfaction[] = [];
  private satisfactionsSubject = new BehaviorSubject<Satisfaction[]>([]);
  satisfactions$ = this.satisfactionsSubject.asObservable();

  constructor() {
    // Initialize with some dummy data if necessary
    this.satisfactionsList = [
      new Satisfaction({
        id: 1,
        questions: ['question1', 'question2', 'question3', 'question4', 'question5'],
        reponses: { question1: true, question2: false, question3: true, question4: false, question5: true },
        dateCreation: new Date(),
        traitePar: null,
        code: "DCLN2024",
        commentaire: "dkflrlflelf"
      }),
      new Satisfaction({
        id: 2,
        questions: ['question1', 'question2', 'question3', 'question4', 'question5'],
        reponses: { question1: false, question2: true, question3: false, question4: true, question5: false },
        dateCreation: new Date(),
        traitePar: null,
        code: "DCLN2023",
        commentaire: "dvfcf"
      })
    ];
    this.satisfactionsSubject.next(this.satisfactionsList);
  }

  getAllSatisfactions(): Observable<Satisfaction[]> {
    return this.satisfactions$;
  }

  addSatisfaction(satisfaction: Satisfaction): Observable<void> {
    this.satisfactionsList.push(satisfaction);
    this.satisfactionsSubject.next([...this.satisfactionsList]);
    return of();
  }

  updateSatisfaction(satisfaction: Satisfaction): Observable<void> {
    const index = this.satisfactionsList.findIndex(s => s.id === satisfaction.id);
    if (index !== -1) {
      this.satisfactionsList[index] = satisfaction;
      this.satisfactionsSubject.next([...this.satisfactionsList]);
    }
    return of();
  }

  deleteSatisfaction(id: number): Observable<void> {
    this.satisfactionsList = this.satisfactionsList.filter(s => s.id !== id);
    this.satisfactionsSubject.next(this.satisfactionsList);
    return of();
  }
}
