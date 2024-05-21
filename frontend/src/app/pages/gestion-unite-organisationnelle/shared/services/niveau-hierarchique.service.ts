import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {NiveauHierarchique} from '../model/niveau-hierarchique.model';
import { NotificationService } from "../../../../shared/services/notification.service";

@Injectable({
    providedIn: "root",
  })
export class NiveauHierarchiqueService{

    url: string = "/pss-backend/niveauxHierarchiques";
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        }),
    };

    constructor(private httpClient: HttpClient, 
                private notificationService: NotificationService){}

    getAll(): Observable<HttpResponse<any>> {
        return this.httpClient
          .get<any>(this.url, {
            observe: "response",
          })
          .pipe(catchError(this.errorHandler));
      }
      create(niveauHierarchique: NiveauHierarchique): Observable<HttpResponse<any>> {
        return this.httpClient
          .post<any>(this.url, JSON.stringify(niveauHierarchique), {
            headers: this.httpOptions.headers,
            observe: "response",
          })
      }
      getById(id: number): Observable<HttpResponse<any>> {
        return this.httpClient
          .get<any>(this.url + id)
          .pipe(catchError(this.errorHandler));
      }
      getByPosition(position: number): Observable<HttpResponse<any>> {
        return this.httpClient
          .get<any>(this.url + '/position/' + position, {
            observe: "response",
          })
          .pipe(catchError(this.errorHandler));}

      update(niveauHierarchique: NiveauHierarchique): Observable<HttpResponse<any>> {
        return this.httpClient
          .put<any>(this.url, JSON.stringify(niveauHierarchique), {
            headers: this.httpOptions.headers,
            observe: "response",
          })
          //.pipe(catchError(this.errorHandler));
      }
      delete(niveauHierarchique: NiveauHierarchique): Observable<HttpResponse<any>> {
        const httpOptions = {
          headers: this.httpOptions.headers,
          body: niveauHierarchique,
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
          if(error.status === 302 ){
            console.log('existe');
          }
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      }

}