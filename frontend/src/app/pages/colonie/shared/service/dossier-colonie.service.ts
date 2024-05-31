import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DossierColonie } from '../model/dossier-colonie.model';

@Injectable({
  providedIn: 'root',
})
export class DossierColonieService {
  private url = '/pss-backend/dossiersColonies';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url, {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }

  create(dossier: DossierColonie): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(dossier), {
        headers: this.httpOptions.headers,
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/${id}`, {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }

  getByAnnee(annee: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/annee/${annee}`, {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }

  update(dossier: DossierColonie): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(dossier), {
        headers: this.httpOptions.headers,
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .delete<any>(`${this.url}/${id}`, {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
