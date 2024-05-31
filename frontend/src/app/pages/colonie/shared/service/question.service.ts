import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Question } from '../model/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private url = '/pss-backend/questions';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Récupérer toutes les questions
  getAllQuestions(): Observable<HttpResponse<Question[]>> {
    return this.httpClient.get<Question[]>(this.url, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  // Récupérer une question par son ID
  getQuestionById(id: number): Observable<HttpResponse<Question>> {
    const getUrl = `${this.url}/${id}`;
    return this.httpClient.get<Question>(getUrl, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  // Créer une question
  saveQuestion(question: Question): Observable<HttpResponse<Question>> {
    return this.httpClient.post<Question>(this.url, question, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  // Mettre à jour une question
  updateQuestion(question: Question): Observable<HttpResponse<any>> {
    return this.httpClient.put<any>(this.url, question, { headers: this.httpOptions.headers, observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  // Supprimer une question
  deleteQuestion(id: number): Observable<HttpResponse<any>> {
    const deleteUrl = `${this.url}/${id}`;
    return this.httpClient.delete<any>(deleteUrl, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  // Gérer les erreurs HTTP
  private errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = error.error.message;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
