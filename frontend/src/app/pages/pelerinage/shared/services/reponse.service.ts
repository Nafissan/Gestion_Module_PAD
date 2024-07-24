import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SatisfactionPelerinage } from '../model/satisfaction-pelerinage.model'
import { Reponse } from '../model/reponse-pelerinage.model';

@Injectable({
    providedIn: 'root',
  })
  export class ReponsePelerinageService {
    private url = '/pss-backend/reponsesPelerinage';

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  
    constructor(private httpClient: HttpClient) {}

    getAllReponses():Observable<HttpResponse<any>> {
      return this.httpClient.get<any>(this.url, { observe: 'response' })
        .pipe(catchError(this.errorHandler));
    }
    
      addReponse(reponse: Reponse): Observable<HttpResponse<any>>{
        return this.httpClient.post<any>(this.url, JSON.stringify(reponse),{observe : 'response', headers: this.httpOptions.headers})
        .pipe(catchError(this.errorHandler));
      }

      updateReponse(reponse: Reponse): Observable<HttpResponse<any>>{
        return this.httpClient.put<any>(this.url, JSON.stringify(reponse),{observe : 'response', headers: this.httpOptions.headers})
        .pipe(catchError(this.errorHandler));
      }
      getReponsesByFormulaireId(formulaireId: SatisfactionPelerinage): Observable<HttpResponse<any>> {
        return this.httpClient.post<any>(`${this.url}/formulaire`, JSON.stringify(formulaireId), { observe: 'response' , headers: this.httpOptions.headers})
          .pipe(catchError(this.errorHandler));
      }     
       private errorHandler(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Erreur côté client
          errorMessage = error.error.message;
        } else {
          // Erreur côté serveur
          errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }
  }