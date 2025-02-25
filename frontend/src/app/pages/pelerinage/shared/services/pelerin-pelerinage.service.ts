import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pelerin } from '../model/pelerin-pelerinage.model';
import { Agent } from 'src/app/shared/model/agent.model';

@Injectable({
  providedIn: 'root',
})
export class PelerinsService {
  private url = '/pss-backend/pelerins';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}
  create(pelerin: Pelerin): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(pelerin), {
        headers: this.httpOptions.headers,
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }
  getAll(): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(this.url, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  updatePelerin(pelerin: Pelerin): Observable<HttpResponse<any>> {
    return this.httpClient
    .put<any>(this.url, JSON.stringify(pelerin), {
      headers: this.httpOptions.headers,
      observe: 'response',
    })
    .pipe(catchError(this.errorHandler));
  }
  sendMessages(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/send-messages`, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }
  // Supprimer un pelerin
  deletePelerin(pelerin: Pelerin): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body:pelerin,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);

  }
  assignedAgentsToPelerinage(agent: Agent): Observable<HttpResponse<any>> {
    return this.httpClient
    .post<any>(`${this.url}/assignAgents`, JSON.stringify(agent), {
      headers: this.httpOptions.headers,
      observe: 'response',
    })
    .pipe(catchError(this.errorHandler));
  } 
  getPelerinsByDossierEtat(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/dossierEtat`, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }
  getPelerinsApte(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/apte`, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }
  getPelerinsStatistics(annee: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/statistiques/annee/${annee}`, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  } 
  getPelerinsByAnnee(annee: string): Observable<HttpResponse<any>> {
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
      // Erreur côté serveur
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
