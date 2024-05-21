import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Partenaire, Prospect } from "../model/partenaire.model";

@Injectable({
  providedIn: "root",
})
export class PartenaireService {

  url: string = "/pss-backend/prospects";
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

  create(partenaire: Partenaire): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(partenaire), {
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

  getProspectsByPlanProspectionId(idPlanProspection: number) {
    return this.httpClient
    .get<any>(this.url + '/planprospection/'+ idPlanProspection, {
      observe: "response",
    })
    .pipe(catchError(this.errorHandler));
  }
  
  update(partenaire: Partenaire): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(partenaire), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  updateProspect(prospect: Prospect): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(prospect), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  qualifierProspectPotentiel(prospect: Prospect) {
    const valuePotentiel = prospect.statut === 1? "true": "false";
    return this.httpClient
      .put<any>(this.url + '/'+ prospect.id, JSON.stringify(prospect), {
        headers: this.httpOptions.headers,
        params: {potentiel: valuePotentiel, partenaire: "false"},
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  qualifierPartenaire(prospect: Prospect) {
    const valuePotentiel =  "true";
    const valuePartenaire =  "true";
    return this.httpClient
      .put<any>(this.url + '/'+ prospect.id, JSON.stringify(prospect), {
        headers: this.httpOptions.headers,
        params: {potentiel: valuePotentiel, partenaire: valuePartenaire},
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  delete(partenaire: Partenaire): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: partenaire,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);
  }
  getByAnnee(annee: any): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/anneee/'+ annee, {
        observe: "response",
      })
      // .pipe(catchError(this.errorHandler));
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
