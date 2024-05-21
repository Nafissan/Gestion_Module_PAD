import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { EtapeAttestation } from '../model/etape-attestation.model';
import { Attestation } from '../model/demande-attestation.model';

@Injectable({
  providedIn: 'root'
})
export class SuiviAttestationService {
  url: string = "/pss-backend/etapeAttestations";
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

  create(suiviAttestation:EtapeAttestation): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(suiviAttestation), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  createMany(suiviAttestations:EtapeAttestation[]): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url + '/many', JSON.stringify(suiviAttestations), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url +'/'+ id)
      .pipe(catchError(this.errorHandler));
  }
  update(suiviAttestation: EtapeAttestation): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(suiviAttestation), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  
  delete(suiviAttestation: EtapeAttestation): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: suiviAttestation,
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
