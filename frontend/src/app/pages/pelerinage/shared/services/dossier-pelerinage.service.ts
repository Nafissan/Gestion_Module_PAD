import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DossierPelerinage } from '../model/dossier-pelerinage.model';

@Injectable({
  providedIn: 'root',
})
export class DossierPelerinageService {
  private url = '/pss-backend/dossiersPelerinages';

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
  getDossier(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/etatOuvertOuSaisi`, {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }
  create(dossier: DossierPelerinage): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(dossier), {
        headers: this.httpOptions.headers,
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

  update(dossier: DossierPelerinage): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(dossier), {
        headers: this.httpOptions.headers,
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }

  delete(dossier: DossierPelerinage): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body:dossier,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);
  }
  getDossiersPelerinageFerme(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(`${this.url}/fermes`, {
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
