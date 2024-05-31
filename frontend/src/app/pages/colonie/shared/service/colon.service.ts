import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Colon } from './../model/colon.model';

@Injectable({
  providedIn: 'root',
})
export class ColonService {
  url: string = '/pss-backend/colons';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/${id}`, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  getByMatriculeParent(matricule: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/matriculeParent/${matricule}`, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  getByCodeDossier(code: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/codeDossier/${code}`, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  create(colon: Colon): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(colon), {
        headers: this.httpOptions.headers,
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }

  update(colon: Colon): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(colon), {
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

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}