import { Injectable } from '@angular/core';
import {Interim} from '../model/interim.model';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class InterimService {
  url: string = '/pss-backend/interims';
  //url: string = '/interims';
  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }
  
  getAgents(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>('/pss-backend/agents', {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

  create(interim: Interim): Observable<HttpResponse<any>> {
      return this.httpClient.post<any>(this.url, JSON.stringify(interim), {
          headers: this.httpOptions.headers,
          observe: 'response'
      })
          .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<HttpResponse<any>> {
      return this.httpClient.get<any>(this.url + '/' + id)
          .pipe(catchError(this.errorHandler));
  }
  
  update(interim: Interim): Observable<HttpResponse<any>> {
      return this.httpClient.put<any>(this.url, JSON.stringify(interim), {
          headers: this.httpOptions.headers,
          observe: 'response'
      })
          .pipe(catchError(this.errorHandler));
  }

  delete(interim: Interim): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: interim,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);
  }
  
  getInterimByUnORG(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(this.url + '/uniteOrganisationnelle/' + id,
    {
      observe: "response",
    }
  )
  .pipe(catchError(this.errorHandler));
}
getInterimByUnORGAndAnnee(id: number, annee: number): Observable<HttpResponse<any>> {
  return this.httpClient.get<any>(this.url + '/uniteOrganisationnelle/' + id + '/annee/' +annee,
  {
    observe: "response",
  }
)
.pipe(catchError(this.errorHandler));
}
getInterimsByAgent(id: number): Observable<HttpResponse<any>> {
  return this.httpClient.get<any>(this.url + '/agent/' + id,
  {
    observe: "response",
  }
)
.pipe(catchError(this.errorHandler));
}


getInterimsByDossier(idDossierInterim: number): Observable<HttpResponse<any>> {
  return this.httpClient.get<any>(this.url + '/dossierInterim/' + idDossierInterim,
  {
    observe: "response",
  }
)
.pipe(catchError(this.errorHandler));
}

uploadInterim(interim:Interim, file: File): Observable<HttpResponse<any>> {
  const formdata: FormData = new FormData();
  formdata.append('file', file);
  return this.httpClient
    .post<any>(this.url + "/" + interim.id + "/upload" , formdata, {
      reportProgress: true,
      
  })
    .pipe(catchError(this.errorHandler));
}
downloadInterim(interim:Interim): Observable < Blob >{
  return this.httpClient.get(this.url + "/" + interim.id + "/download",{
    responseType: 'blob'
  })

}
  errorHandler(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
      }
      else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
  }

  getAllByInterimsUniteOrganisationnelles(
    idUniteOrganisationnelles: number[]
  ): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(
        this.url +
          "/uniteOrganisationnelles/" +
          idUniteOrganisationnelles,
        {
          observe: "response",
        }
      )
      .pipe(catchError(this.errorHandler));
  }
}

