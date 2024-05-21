import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { PlanningConge } from "../model/planning-conge.model";
import { PlanningDirection } from "../model/planning-direction.model";

@Injectable({
  providedIn: "root",
})
export class PlanningDirectionService {
  url: string = "/pss-backend/planningdirections";
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
  getByCodeDirectionAndDossierConge(codeDirection: string, idDossierConge: number): Observable<HttpResponse<any>> {//recupere planning direction
    return this.httpClient
      .get<any>(this.url + "/uniteOrganisationnelle/" + codeDirection + "/dossierConge/" + idDossierConge, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  getByDossierConge(idDossierConge: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + "/dossierConge/" + idDossierConge, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  create(planningDirection: PlanningDirection): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(planningDirection), {
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
  update(planningDirection: PlanningDirection): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(planningDirection), {
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
  delete(planningDirection: PlanningDirection): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: planningDirection,
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
