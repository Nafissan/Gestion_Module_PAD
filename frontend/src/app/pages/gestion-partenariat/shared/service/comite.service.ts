import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Comite } from "../model/comite.model";

@Injectable({
  providedIn: "root",
})
export class ComiteService{
  url: string = "/pss-backend/comite";
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

  create(comite: Comite): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(comite), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  uploadComite(comite:Comite, file: File): Observable<HttpResponse<any>> {
    const formdata: FormData = new FormData();
		formdata.append('file', file);
    return this.httpClient
      .post<any>(this.url + "/" + comite.id + "/upload" , formdata, {
			  reportProgress: true,
			  
		})
      .pipe(catchError(this.errorHandler));
  }
  download(comite: Comite): Observable < Blob >{
    return this.httpClient.get(this.url + "/" + comite.id + "/download",{
      responseType: 'blob'
    })

  }

  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/'+ id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  
  update(comite: Comite): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(comite), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  delete(comite: Comite): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: comite,
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
