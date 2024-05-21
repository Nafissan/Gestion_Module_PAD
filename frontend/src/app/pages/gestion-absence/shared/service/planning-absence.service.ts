import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { PlanningAbsence } from "../model/planning-absence.modele";


@Injectable({
  providedIn: "root",
})
export class PlanningAbsenceService {
  url: string = "/pss-backend/planningabsences";
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
  getAllByDossierAbsence(
    idDossierAbsence: number
  ): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(
        this.url +
          "/dossierAbsence/" +
          idDossierAbsence,
        {
          observe: "response",
        }
      )
      .pipe(catchError(this.errorHandler));
  }
  getAllByDossierAbsenceAndUniteOrganisationnelle(
    idDossierAbsence: number,
    idUniteOrganisationnelle: number
  ): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(
        this.url +
          "/dossierAbsence/" +
          idDossierAbsence +
          "/uniteOrganisationnelle/" +
          idUniteOrganisationnelle,
        {
          observe: "response",
        }
      )
      .pipe(catchError(this.errorHandler));
  }
  getAllByDossierAbsenceAndUniteOrganisationnelles(
    idDossierAbsence: number,
    idUniteOrganisationnelles: number[]
  ): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(
        this.url +
          "/dossierAbsence/" +
          idDossierAbsence +
          "/uniteOrganisationnelles/" +
          idUniteOrganisationnelles,
        {
          observe: "response",
        }
      )
      .pipe(catchError(this.errorHandler));
  }
  getAllByDossierAbsenceAndUniteOrganisationnelleAndEtat(
    idDossierAbsence: number,
    idUniteOrganisationnelle: number,
    etat: string
  ): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(
        this.url +
          "/dossierAbsence/" +
          idDossierAbsence +
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

  create(planningabsence: PlanningAbsence): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(planningabsence), {
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
  update(planningAbsence: PlanningAbsence): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(planningAbsence), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  delete(planningAbsence: PlanningAbsence): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: planningAbsence,
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
