import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Suiviplan } from "../model/suiviplan.model";

@Injectable({
  providedIn: "root",
})
export class SuiviPlanProspectionService {
  url: string = "/pss-backend/suiviprospects";
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

  getBesoinsByPlan(id): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/plan/' + id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  getSuiviByProspectId(id): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/prospect/' + id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  create(suiviplan: Suiviplan): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(suiviplan), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/'+ id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  
  update(suiviplan: Suiviplan): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(suiviplan), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  delete(suiviplan: Suiviplan): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: suiviplan,
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
