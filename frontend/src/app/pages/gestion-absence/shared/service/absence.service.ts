import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Absence } from '../model/absence.model';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  url: string = "/pss-backend/absences";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private httpClient:HttpClient) { }
  getAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url, {
        observe: "response",
      })
      .pipe(catchError(this.errorHandler));
  }

getAbsenceByDossier(idDossierAbsence: number): Observable<HttpResponse<any>> {
  return this.httpClient.get<any>(this.url + '/dossierabsences/' + idDossierAbsence,
  {
    observe: "response",
  }
)
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
  create(absence:Absence):Observable<HttpResponse<any>>{
    return this.httpClient
    .post<any>(this.url,JSON.stringify(absence),
      {
        headers: this.httpOptions.headers,
        observe: "response",
      }
      )

  }
  getByID(id:number):Observable<HttpResponse<any>>{
    return this.httpClient
    .get(this.url+id,
      {
        observe:"response",
      })

  }
  update(absence:Absence):Observable<HttpResponse<any>>{
    return this.httpClient
    .put<any>(
      this.url, JSON.stringify(absence),
      {
        headers: this.httpOptions.headers,
        observe:"response"
      }
    )

  }
  delete(absence:Absence):Observable<HttpResponse<any>>{
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: absence,
    };
    return this.httpClient.delete<any>(this.url, httpOptions)
}
getAbsencesByUnORG(id:  number): Observable<HttpResponse<any>> {
  return this.httpClient.get<any[]>(this.url + '/uniteOrganisationnelle/' + id,
  {
    observe: "response",
  }
)
.pipe(catchError(this.errorHandler));
}

getAbsencesByUniteOrgAndAnnee(id: number, annee: number): Observable<HttpResponse<any>> {
  return this.httpClient.get<any>(this.url + '/uniteOrganisationnelle/' + id + '/annee/' +annee,
  {
    observe: "response",
  }
)
.pipe(catchError(this.errorHandler));
}

getAbsencesByPlanningAbsence(idPlanningAbsence:  number): Observable<HttpResponse<any>> {
  return this.httpClient.get<any>(this.url + '/planningAbsence/' + idPlanningAbsence,
  {
    observe: "response",
  }
)
.pipe(catchError(this.errorHandler));
}
getAbsencesByAgent(id: number): Observable<HttpResponse<any>> {
return this.httpClient.get<any>(this.url + '/agent/' + id,
{
  observe: "response",
}
)
.pipe(catchError(this.errorHandler));
}

// Get all agents
getAgents(): Observable<HttpResponse<any>> {
  return this.httpClient
    .get<any>('/pss-backend/agents', {
      observe: "response",
    })
    .pipe(catchError(this.errorHandler));
}

getAllByAbsencesUniteOrganisationnelles(
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

getByAnneeAndMois(annee: number,mois:string): Observable<HttpResponse<any>> {
  return this.httpClient
    .get<any>(this.url + '/annee/' + annee + '/mois/' + mois, {
      observe: "response",
    })
}

getAbsencesByUniteOrgInfAndAnneeAndMois(idUniteOrganisationnelles: number[], annee: number, mois:string): Observable<HttpResponse<any>> {
  return this.httpClient.get<any>(this.url + '/uniteOrganisationnelles/' + idUniteOrganisationnelles + '/annee/' +annee + '/mois/' + mois,
  {
    observe: "response",
  }
)
.pipe(catchError(this.errorHandler));
}
}

