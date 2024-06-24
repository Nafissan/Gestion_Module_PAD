import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Participant } from '../model/participant-colonie.model';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private url = '/pss-backend/participantsColonie';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}
  create(participant: Participant): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(participant), {
        headers: this.httpOptions.headers,
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }
  getAll(): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(this.url, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }
  deleteAllParticipants(): Observable<HttpResponse<any>> {
    return this.httpClient
      .delete<any>(`${this.url}/deleteAll`, {
        headers: this.httpOptions.headers,
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }


  // Mettre à jour un participant
  updateParticipant(participant: Participant): Observable<HttpResponse<any>> {
    return this.httpClient
    .put<any>(this.url, JSON.stringify(participant), {
      headers: this.httpOptions.headers,
      observe: 'response',
    })
    .pipe(catchError(this.errorHandler));
  }

  // Supprimer un participant
  deleteParticipant(participant: Participant): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body:participant,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);

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
