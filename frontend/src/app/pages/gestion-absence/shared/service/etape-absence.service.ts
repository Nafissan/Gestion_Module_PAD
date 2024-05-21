import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { EtapeAbsence } from '../model/etape-absence.model';


@Injectable({
  providedIn: 'root'
})
export class EtapeAbsenceService {
  url: string = "/pss-backend/etapeabsences";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private httpClient:HttpClient) { }
  getAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
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
  create(etapeAbsence:EtapeAbsence):Observable<HttpResponse<any>>{
    return this.httpClient
    .post<any>(this.url,JSON.stringify(etapeAbsence),
      {
        headers: this.httpOptions.headers,
        observe: "response",
      }
      )

  }
  getByID(id:number):Observable<HttpResponse<any>>{
    return this.httpClient
    .get(this.url+id,
      {
        observe:"response",
      })
     
  }
  update(etapeAbsence:EtapeAbsence):Observable<HttpResponse<any>>{
    return this.httpClient
    .put<any>(
      this.url, JSON.stringify(etapeAbsence),
      {
        headers: this.httpOptions.headers,
        observe:"response"
      }
    )

  }
  delete(etapeAbsence:EtapeAbsence):Observable<HttpResponse<any>>{
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: etapeAbsence,
    };
    return this.httpClient.delete<any>(this.url, httpOptions); 
  
}
}

