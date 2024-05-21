import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Conge } from "../model/conge.model";

@Injectable({
  providedIn: "root",
})
export class CongeService {
  url: string = "/pss-backend/conges";
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
  getAllByIdPlanningConge(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/planningConge/' + id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  getAllByIdPlanningCongeAndAnnee(id: number, annee: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/planningConge/' + id + '/annee/' +annee, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler)) ;
  }

  getAllByIdPlanningCongeAndAnneeAndStructure(id: number, annee: string, idUnite:number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/planningConge/' + id + '/annee/' +annee+ '/structure/' +idUnite, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler)) ;
  }

  getAllByEtatAndIdPlanningConge(etat: string, id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/etat/' + etat + '/planningConge/' + id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  create(conge: Conge): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(conge), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  createAll(conges: Conge[]): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url +'/all', JSON.stringify(conges), {
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
  update(conge: Conge): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(conge), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  updateMany(conges: Conge[]): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url + '/many/', JSON.stringify(conges), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  delete(conge: Conge): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: conge,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);
  }
  getCongeByIdAgent(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
    .get<any>(this.url + '/agent/' + id,{
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

  getCongeByDossier(idDossierConge: number): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(this.url + '/dossierconges/' + idDossierConge,
    {
      observe: "response",
    }
  )
  .pipe(catchError(this.errorHandler));
  }
}
