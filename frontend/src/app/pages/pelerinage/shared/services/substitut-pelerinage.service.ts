import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Agent } from 'src/app/shared/model/agent.model';

@Injectable({
  providedIn: 'root',
})
export class SubstitutService {
  private url = '/pss-backend/substituts';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(this.url, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }
  getSubstitutsByDossierEtat(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/etat`, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }
  assignedSubToPelerins(agent: Agent): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(`${this.url}/assign`, JSON.stringify(agent), { headers: this.httpOptions.headers,
        observe: 'response', })
      .pipe(catchError(this.errorHandler));
  }
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
