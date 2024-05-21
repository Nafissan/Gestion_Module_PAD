import { Injectable } from '@angular/core';
import {EtapeInterim} from '../model/etapeInterim.modele';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EtapeInterimService {
  url: string = '/pss-backend/etapeInterims';
  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  create(etapeInterim: EtapeInterim): Observable<HttpResponse<any>> {
      return this.httpClient.post<any>(this.url, JSON.stringify(etapeInterim), {
          headers: this.httpOptions.headers,
          observe: 'response'
      })
          .pipe(catchError(this.errorHandler));
  }
  getById(id: number): Observable<HttpResponse<any>> {
      return this.httpClient.get<any>(this.url + id)
          .pipe(catchError(this.errorHandler));
  }
  update(etapeInterim: EtapeInterim): Observable<HttpResponse<any>> {
      return this.httpClient.put<any>(this.url, JSON.stringify(etapeInterim), {
          headers: this.httpOptions.headers,
          observe: 'response'
      })
          .pipe(catchError(this.errorHandler));
  }

  delete(etapeInterim: EtapeInterim): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: etapeInterim,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);
  }

  getEtapeInterimsByInterim(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(this.url + '/interim/' + id,
    {
      observe: "response",
    }
  )
  .pipe(catchError(this.errorHandler));
  }
  errorHandler(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
      }
      else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
  }
}

