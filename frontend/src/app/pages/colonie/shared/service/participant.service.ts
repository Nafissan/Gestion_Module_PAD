import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Participant } from '../model/participant.model';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private url = '/pss-backend/participants';

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
  // Récupérer tous les participants
  getAllParticipants(): Observable<HttpResponse<Participant[]>> {
    return this.httpClient.get<Participant[]>(this.url, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }


  // Mettre à jour un participant
  updateParticipant(id: number, participant: Participant): Observable<HttpResponse<any>> {
    const updateUrl = `${this.url}/${id}`;
    return this.httpClient.put<any>(updateUrl, participant, { headers: this.httpOptions.headers, observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  // Mettre à jour le statut d'un participant
  updateParticipantStatus(id: number, newStatus: string): Observable<HttpResponse<any>> {
    const updateStatusUrl = `${this.url}/${id}/status/${newStatus}`;
    return this.httpClient.put<any>(updateStatusUrl, null, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  // Supprimer un participant
  deleteParticipant(id: number): Observable<HttpResponse<any>> {
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
