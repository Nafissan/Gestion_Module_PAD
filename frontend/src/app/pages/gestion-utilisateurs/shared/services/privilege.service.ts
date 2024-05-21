import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Privilege } from "../model/privilege.model";

@Injectable({
  providedIn: "root",
})
export class PrivilegeService {

  url: string = "/pss-backend/roles";

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

  create(privilege: Privilege): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(privilege), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  createWithPrivileges(privilege: Privilege, privileges: Array<string>): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url + '/' + privileges, JSON.stringify(privilege), {
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
  update(privilege: Privilege): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(privilege), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  // delete(privilege: Privilege): Observable<any> {
  //   return this.httpClient.request("DELETE", this.url, {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //        observe: "response",
  //     }),
  //     body: privilege,
  //   });
  // }
  delete(privilege: Privilege): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: privilege,
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
