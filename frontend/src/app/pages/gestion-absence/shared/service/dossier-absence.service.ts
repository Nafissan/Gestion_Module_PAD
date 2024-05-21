import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { DossierAbsence } from "../model/dossier-absence.modele";


@Injectable({
  providedIn: "root",
})
export class DossierAbsenceService {
    url: string = "/pss-backend/dossierabsences";
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

    getDossierAbsenceByAnnee(annee: number): Observable<HttpResponse<any>> {
      return this.httpClient
      .get<any>(this.url + '/annee/'+ annee, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
    } 
  
    
    getByCodeDossAndDossierConge(codeDirection: string, idDossierConge: number): Observable<HttpResponse<any>> {
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
  
    create(dossierAbsence: DossierAbsence): Observable<HttpResponse<any>> {
      return this.httpClient
        .post<any>(this.url, JSON.stringify(dossierAbsence), {
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
    update(dossierAbsence: DossierAbsence): Observable<HttpResponse<any>> {
      return this.httpClient
        .put<any>(this.url, JSON.stringify(dossierAbsence), {
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
    delete(dossierAbsence: DossierAbsence): Observable<HttpResponse<any>> {
      const httpOptions = {
        headers: this.httpOptions.headers,
        body: dossierAbsence,
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
    