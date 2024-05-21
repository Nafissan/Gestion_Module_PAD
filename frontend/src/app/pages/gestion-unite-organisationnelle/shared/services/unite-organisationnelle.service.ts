import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UniteOrganisationnelle } from "../../../../shared/model/unite-organisationelle";

@Injectable({
  providedIn: "root",
})
export class UniteOrganisationnelleService {
  url: string = "/pss-backend/uniteOrganisationnelles";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) { }
  
  getAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  getAllSuperieuresByNiveau(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/niveau/1', {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  getAllInferieures(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/inferieures/' + id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  getAllSuperieures(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/superieures/' + id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  create(uniteOrganisationnelle: UniteOrganisationnelle): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(uniteOrganisationnelle), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + id,
        {
          observe: "response",
        })
      .pipe(catchError(this.errorHandler));
  }
  getByCode(code: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/code/' + code,
        {
          observe: "response",
        })
      .pipe(catchError(this.errorHandler));
  }
  update(uniteOrganisationnelle: UniteOrganisationnelle): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(uniteOrganisationnelle), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  delete(uniteOrganisationnelle: UniteOrganisationnelle): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: uniteOrganisationnelle,
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