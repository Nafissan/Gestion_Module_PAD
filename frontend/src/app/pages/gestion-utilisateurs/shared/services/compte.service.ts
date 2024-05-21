import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Compte } from "../model/compte.model";

@Injectable({
  providedIn: "root",
})
export class CompteService {

  url: string = "/pss-backend/comptes";

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
  getAgensWithoutCompte(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>("/pss-backend/agents/sansCompte", {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  
  create(compte: Compte): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(compte), {
        headers: this.httpOptions.headers,
        observe: "response",
      });
  }
  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url +"/"+ id)
      .pipe(catchError(this.errorHandler));
  }
  getByUsername(username: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/username/' + username, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  update(compte: Compte): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(compte), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  updateMany(comptes: Compte[]): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url + '/many', JSON.stringify(comptes), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  
  updateWithNewPassword(compte: Compte, oldPassword: string, newPassword: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url + '/' + oldPassword +'/'+ newPassword, JSON.stringify(compte), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
  }

  updateWithNewPasswordForgot(compte: Compte, token: string, newPassword: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url + '/token/' + token +'/password/'+ newPassword, JSON.stringify(compte), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
  }
  // delete(compte: Compte): Observable<any> {
  //   return this.httpClient.request("DELETE", this.url, {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //        observe: "response",
  //     }),
  //     body: compte,
  //   });
  // }
  delete(compte: Compte): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: compte,
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
