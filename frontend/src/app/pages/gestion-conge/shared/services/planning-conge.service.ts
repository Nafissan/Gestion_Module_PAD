import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { PlanningConge } from "../model/planning-conge.model";

@Injectable({
  providedIn: "root",
})
export class PlanningCongeService {
  url: string = "/pss-backend/planningconges";
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
  getAllByPlanningDirection(
    idPlanningDirection: number
  ): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(
        this.url +
          "/planningDirection/" +
          idPlanningDirection,
        {
          observe: "response",
        }
      )
      .pipe(catchError(this.errorHandler));
  }
  getAllByPlanningDirectionAndUniteOrganisationnelle(
    idPlanningDirection: number,
    idUniteOrganisationnelle: number
  ): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(
        this.url +
          "/planningDirection/" +
          idPlanningDirection +
          "/uniteOrganisationnelle/" +
          idUniteOrganisationnelle,
        {
          observe: "response",
        }
      )
      .pipe(catchError(this.errorHandler));
  }
  getAllByPlanningDirectionAndUniteOrganisationnelles(
    idPlanningDirection: number,
    idUniteOrganisationnelles: number[]
  ): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(
        this.url +
          "/planningDirection/" +
          idPlanningDirection +
          "/uniteOrganisationnelles/" +
          idUniteOrganisationnelles,
        {
          observe: "response",
        }
      )
      .pipe(catchError(this.errorHandler));
  }
  getAllByPlanningDirectionAndUniteOrganisationnelleAndEtat(
    idPlanningDirection: number,
    idUniteOrganisationnelle: number,
    etat: string
  ): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(
        this.url +
          "/planningDirection/" +
          idPlanningDirection +
          "/uniteOrganisationnelle/" +
          idUniteOrganisationnelle +
          "/etat/" +
          etat,
        {
          observe: "response",
        }
      )
      .pipe(catchError(this.errorHandler));
  }

  getAllByEtat(etat: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + "/etat/" + etat, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  create(planningconge: PlanningConge): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(planningconge), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + "/" + id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  update(planningconge: PlanningConge): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(planningconge), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  delete(planningconge: PlanningConge): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: planningconge,
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
