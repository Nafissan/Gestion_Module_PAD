import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RapportProspection } from '../model/rapport-prospection.model';

@Injectable({
  providedIn: 'root',
})
export class RapportProspectionService {
  private url = '/pss-backend/rapportsProspection';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAllRapportsProspection(): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(this.url, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  saveRapportProspection(rapportProspection: RapportProspection): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.url, JSON.stringify(rapportProspection), { 
      headers: this.httpOptions.headers,
      observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  updateRapportProspection(rapportProspection: RapportProspection): Observable<HttpResponse<any>> {
    return this.httpClient.put<any>(this.url, JSON.stringify(rapportProspection), {
       headers: this.httpOptions.headers, 
       observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  deleteRapportProspection(rapportProspection: RapportProspection): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body:rapportProspection,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);
  }

  private errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
