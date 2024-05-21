import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Membre } from "../model/membre.model";

@Injectable({
  providedIn: 'root'
})
export class MembreService {
  url: string = "/pss-backend/membrefamille";
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

  create(membres): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url + '/all', JSON.stringify(membres), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  getByAnnee(annee: any): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/anneee/'+ annee, {
        observe: "response",
      })
      // .pipe(catchError(this.errorHandler));
  }
  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/'+ id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  update(membre: Membre): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(membre), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  uploadMembre(membre:Membre, file: File): Observable<HttpResponse<any>> {
    const formdata: FormData = new FormData();
		formdata.append('file', file);
    return this.httpClient
      .post<any>(this.url + "/" + membre.id + "/upload" , formdata, {
			  reportProgress: true,
			  
		})
      .pipe(catchError(this.errorHandler));
  }
  download(membre: Membre): Observable < Blob >{
    return this.httpClient.get(this.url + "/" + membre.id + "/download",{
      responseType: 'blob'
    })

  }
  getMembreByAgent(id): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/plan/' + id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  delete(membre: Membre): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: membre,
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
