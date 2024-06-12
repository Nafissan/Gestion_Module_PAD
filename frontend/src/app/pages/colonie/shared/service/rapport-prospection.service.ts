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

  getAllRapportsProspection(): Observable<HttpResponse<RapportProspection[]>> {
    return this.httpClient.get<RapportProspection[]>(this.url, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  saveRapportProspection(rapportProspection: RapportProspection): Observable<HttpResponse<RapportProspection>> {
    return this.httpClient.post<RapportProspection>(this.url, rapportProspection, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  updateRapportProspection(rapportProspection: RapportProspection): Observable<HttpResponse<any>> {
    return this.httpClient.put<any>(this.url, rapportProspection, { headers: this.httpOptions.headers, observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  deleteRapportProspection(id: number): Observable<HttpResponse<any>> {
    const deleteUrl = `${this.url}/${id}`;
    return this.httpClient.delete<any>(deleteUrl, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
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
