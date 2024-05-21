import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Attestation } from "../model/demande-attestation.model";

@Injectable({
  providedIn: "root",
})
export class DemandeAttestationService {
  url: string = "/pss-backend/attestations";
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

  create(demandeattestation: Attestation): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(demandeattestation), {
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
  update(demandeattestation: Attestation): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(demandeattestation), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  updateMany(demandeattestation: Attestation[]): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url + '/many', JSON.stringify(demandeattestation), {
        headers: this.httpOptions.headers,
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  uploadAttestation(attestation:Attestation, file: File): Observable<HttpResponse<any>> {
    const formdata: FormData = new FormData();
		formdata.append('file', file);
    return this.httpClient
      .post<any>(this.url + "/" + attestation.id + "/upload" , formdata, {
			  reportProgress: true,
			  
		})
      .pipe(catchError(this.errorHandler));
  }
  downloadAttestation(attestation: Attestation): Observable < Blob >{
    return this.httpClient.get(this.url + "/" + attestation.id + "/download",{
      responseType: 'blob'
    })

  }
  delete(demandeattestation: Attestation): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: demandeattestation,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);
  }
  getAttestationByUnORG(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + "/uniteOrganisationnelle/" + id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  getAttestationsByAgent(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + "/agent/" + id, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  getAttestationsByEtatDifferent(etat: String): Observable<HttpResponse<any>>{
    return this.httpClient
    .get<any>(this.url +'/etat/different/'+ etat, {
      observe: "response",
    })
    .pipe(catchError(this.errorHandler));
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
