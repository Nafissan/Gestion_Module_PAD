import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Motif } from '../model/motif.model';

@Injectable({
  providedIn: 'root'
})
export class MotifService {
  url: string = "/pss-backend/motifs";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpclient:HttpClient) { 

  }
  
  getAll(): Observable<HttpResponse<any>> {
    return this.httpclient
      .get<any>(this.url, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get motif-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  create(motif:Motif):Observable<HttpResponse<any>>{
    return this.httpclient
    .post<any>(this.url,JSON.stringify(motif),
      {
        headers: this.httpOptions.headers,
        observe: "response",
      }
      )

  }
  getByID(id:number):Observable<HttpResponse<any>>{
    return this.httpclient
    .get(this.url+id,
      {
        observe:"response",
      })
     
  }
  update(motif:Motif):Observable<HttpResponse<any>>{
    return this.httpclient
    .put<any>(
      this.url, JSON.stringify(motif),
      {
        headers: this.httpOptions.headers,
        observe:"response"
      }
    )

  }
  delete(motif:Motif):Observable<HttpResponse<any>>{
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: motif,
    };
    return this.httpclient.delete<any>(this.url, httpOptions)
}


changerEtatRecupConge(etat){
  etat=true;
  console.log( etat)
}

}



