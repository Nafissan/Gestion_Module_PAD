import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HistoriqueConge } from "../model/historique-conge.model";
import { EtapePlanningDirection } from "../model/etape-planning-direction.model";

@Injectable({
  providedIn: "root",
})
export class EtapePlanningDirectionService {
  url: string = "/pss-backend/etapeplannings";
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

  getByPlanningDirection(idPlanningDirection: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url+ "/planningDirection/"+ idPlanningDirection, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
 create(etapePlanningDirection: EtapePlanningDirection): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(etapePlanningDirection), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + id)
      .pipe(catchError(this.errorHandler));
  }
  update(etapePlanningDirection: EtapePlanningDirection): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(etapePlanningDirection), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  delete(etapePlanningDirection: EtapePlanningDirection): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: etapePlanningDirection,
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
