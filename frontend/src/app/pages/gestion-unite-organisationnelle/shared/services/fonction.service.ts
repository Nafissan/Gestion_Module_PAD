import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Fonction } from "../model/fonction.model";

@Injectable({
    providedIn: "root",
  })
export class FonctionService {
    url: string = "/pss-backend/fonctions";
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        }),
    };
    constructor(private httpClient: HttpClient){}

/*********************************************** * * GET ALL * * ******************************************************************************************************/    

    getAll(): Observable<HttpResponse<any>> {
        return this.httpClient
          .get<any>(this.url, {
            observe: "response",
          })
          .pipe(catchError(this.errorHandler));
      }

/*********************************************** * * GET FONCTION BY NOM * * ******************************************************************************************************/    

  getByNom(nom: string): Observable<HttpResponse<any>> {
    //nom='"'+nom+'"'
    console.log(this.url + '/nom/' + nom)
    return this.httpClient
      .get<any>(this.url + '/nom/' + nom, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }


/*********************************************** * * CREATE * * ******************************************************************************************************/    
    
    create(fonction: Fonction): Observable<HttpResponse<any>> {
     let fonctionStringify : String
      fonctionStringify = JSON.stringify(fonction);

        return this.httpClient
          .post<any>(this.url,fonctionStringify, {
            headers: this.httpOptions.headers,
            observe: "response",
          })
          .pipe(catchError(this.errorHandler));
      }

/*********************************************** * * GET BY ID * * ******************************************************************************************************/    

      getById(id: number): Observable<HttpResponse<any>> {
        return this.httpClient
          .get<any>(this.url + id)
          .pipe(catchError(this.errorHandler));
      }
/*********************************************** * * UPDATE * * ******************************************************************************************************/    

      update(fonction: Fonction): Observable<HttpResponse<any>> {
        return this.httpClient
          .put<any>(this.url, JSON.stringify(fonction), {
            headers: this.httpOptions.headers,
            observe: "response",
          })
          .pipe(catchError(this.errorHandler));
      }

/*********************************************** * * DELETE * * *****************************************************************************************************/    

      delete(fonction: Fonction): Observable<HttpResponse<any>> {
        const httpOptions = {
          headers: this.httpOptions.headers,
          body: fonction,
        };
        return this.httpClient.delete<any>(this.url, httpOptions);
      }

/************************************************ * GESTION ERREUR * ******************************************************************************************************/    

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


      
/*********************************************** * * GET FONCTION BY UNITE ORGANISATIONNELLE * * ******************************************************************************************************/    

  getByUniteOrganisationnelle(id: number): Observable<HttpResponse<any>> {
    //nom='"'+nom+'"'
    console.log(this.url + '/uniteOrganisationnelle/' + id)
    return this.httpClient
      .get<any>(this.url + '/uniteOrganisationnelle/' + id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

}

