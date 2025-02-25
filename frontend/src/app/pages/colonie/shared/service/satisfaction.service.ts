import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Satisfaction } from '../model/satisfaction.model';

@Injectable({
  providedIn: 'root',
})
export class SatisfactionService {
  private url = '/pss-backend/formulairesSatisfaction';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAllSatisfactions(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  addSatisfaction(satisfaction: Satisfaction): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(satisfaction), { observe: 'response', headers: this.httpOptions.headers })
      .pipe(catchError(this.errorHandler));
  }

  updateSatisfaction(satisfaction: Satisfaction): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(satisfaction), { observe: 'response', headers: this.httpOptions.headers })
      .pipe(catchError(this.errorHandler));
  }

  deleteSatisfaction(satisfaction: Satisfaction): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body:satisfaction,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);
  }
  getFormulaireByDossierEtat(): Observable<HttpResponse<any>> {
    const url = `${this.url}/dossierEtat`;
    return this.httpClient
      .get<any>(url, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  getFormulairesByAnnee(annee: string): Observable<HttpResponse<any[]>> {
    const url = `${this.url}/annee/${annee}`;
    return this.httpClient
      .get<any[]>(url, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }


  private errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return of(error);
  }
}
