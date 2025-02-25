import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
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

  // Mettre à jour un participant
  updateParticipant(participant: Participant): Observable<HttpResponse<any>> {
    return this.httpClient
    .put<any>(this.url, JSON.stringify(participant), {
      headers: this.httpOptions.headers,
      observe: 'response',
    })
    .pipe(catchError(this.errorHandler));
  }
  sendMessages(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/sendMessages`, { observe: 'response' })
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
  getParticipantsByDossierEtat(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/etat`, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }
  getParticipantsValide(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/valider`, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }
  getParticipantsStatistics(annee: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/statistics/${annee}`, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  } 
  getParticipantsByAnnee(annee: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/annee/${annee}`, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }
  // Gérer les erreurs HTTP
  private errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = error.error.message;
    } else {
  if(error.status===409)  {
  errorMessage = 'Le colon existe déjà !';
  }   else errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
