import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SuiviDotation } from "../models/suiviDotation.model";

@Injectable({
  providedIn: 'root'
})
export class SuiviDotationService {
  url: string = "/pss-backend/suivi-dotations";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private httpClient: HttpClient) { }

  getAll(idDotation?: number): Observable<HttpResponse<any>> {
    let params = {};
    if (idDotation) {
      params = Object.assign(params, { idDotation: idDotation });
    }
    return this.httpClient
      .get<any>(this.url, {
        observe: "response",
        params: params
      })
      .pipe(catchError(this.errorHandler));
  }

  create(suiviDotation: SuiviDotation): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(suiviDotation), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
    // .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/' + id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  getByAnneeAndMois(annee: number, mois: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/annee/' + annee + '/mois/' + mois, {
        observe: "response",
      })
  }
  update(suiviDotation: SuiviDotation): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(suiviDotation), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  delete(suiviDotation: SuiviDotation): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: suiviDotation,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);
  }

  getByDotationAnneeAndMois(id: number, annee: number, mois: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/dotation/' + id + '/annee/' + annee + '/mois/' + mois, {
        observe: "response",
      })
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
