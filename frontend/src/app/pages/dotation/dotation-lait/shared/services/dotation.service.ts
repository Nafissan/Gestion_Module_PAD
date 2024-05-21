import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Dotation } from './../models/dotation.model';

@Injectable({
  providedIn: "root",
})
export class DotationService {

  url: string = "/pss-backend/dotations";

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

  create(dotation: Dotation): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(dotation), {
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
  update(dotation: Dotation): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(dotation), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  delete(dotation: Dotation): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: dotation,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);
  }


  // getByAnnee(annee: any): Observable<HttpResponse<any>> {
  //   return this.httpClient
  //     .get<any>(this.url + '/anneee/'+ annee, {
  //       observe: "response",
  //     })
  //     .pipe(catchError(this.errorHandler));
  // }

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
