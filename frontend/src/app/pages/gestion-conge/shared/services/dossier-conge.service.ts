import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { DossierConge } from "../model/dossier-conge.model";

@Injectable({
  providedIn: "root",
})
export class DossierCongeService {
  url: string = "/pss-backend/dossierconges";
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

  create(dossierconge: DossierConge): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(dossierconge), {
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

  getByAnnee(annee: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/annee/'+ annee, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  
  update(dossierconge: DossierConge): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(dossierconge), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  // delete(dossierconge: DossierConge): Observable<any> {
  //   return this.httpClient.request("DELETE", this.url, {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //        observe: "response",
  //     }),
  //     body: dossierconge,
  //   });
  // }
  delete(dossierconge: DossierConge): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: dossierconge,
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
