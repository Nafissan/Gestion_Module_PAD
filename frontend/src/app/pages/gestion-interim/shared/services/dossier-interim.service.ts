import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { DossierInterim } from "../model/dossier-interim.model";

@Injectable({
  providedIn: 'root'
})
export class DossierInterimService {

  url: string = "/pss-backend/dossierInterims";
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

  create(dossierInterim: DossierInterim): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(dossierInterim), {
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
  update(dossierInterim: DossierInterim): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(dossierInterim), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  delete(dossierInterim: DossierInterim): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: dossierInterim,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);
  }

  getDossierInterimByAnnee(annee: number) {
    return this.httpClient
    .get<any>(this.url + '/annee/'+ annee, {
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

  getDossierInterimByUnORGAndAnnee(idUniteOrganisationnelle: number,annee:number): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(this.url + '/uniteOrganisationnelle/' + idUniteOrganisationnelle+'/annee/'+annee,
    {
      observe: "response",
    }
  )
  .pipe(catchError(this.errorHandler));
}
}
