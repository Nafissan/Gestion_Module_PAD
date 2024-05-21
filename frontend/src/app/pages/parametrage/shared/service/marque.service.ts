import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Marque } from '../model/marque.model';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  url: string = "/pss-backend/marques";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  
  create(marque: Marque): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(marque), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      // .pipe(catchError(this.errorHandler));
  }
  
  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/'+ id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  
  update(marque: Marque): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(marque), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  
  delete(marque: Marque): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: marque,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);
  }
  
  errorHandler(error) {
    let errorMessage = "";
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