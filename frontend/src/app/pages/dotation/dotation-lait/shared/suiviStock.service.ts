import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SuiviStock } from "./models/SuiviStock.model";

@Injectable({
  providedIn: "root",
})
export class SuiviStockService {


  url: string = "/pss-backend/suivi-stocks";
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

  create(suiviStock: SuiviStock): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(suiviStock), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  addCorrectionStock(suiviStock: SuiviStock): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url+'/stock-correction', JSON.stringify(suiviStock), {
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
  
  update(suiviStock: SuiviStock): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(suiviStock), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  delete(suiviStock: SuiviStock): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: suiviStock,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);
  }

  getByStock(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/stock/'+ id, {
        observe: "response",
      })
      // .pipe(catchError(this.errorHandler));
  }

  getByStockAndCategorie(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url+'/categorie/stock/'+ id, {
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


}
