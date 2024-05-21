import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Agent } from '../model/agent.model';
import { FonctionService } from "../../pages/gestion-unite-organisationnelle/shared/services/fonction.service";

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  url = '/pss-backend/agents';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private fonctionService : FonctionService
  constructor(private httpClient: HttpClient) {
  }
  getAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url, {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }
  getAllChefByPosition(estChef: boolean, position: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/position/' + position + '/chef/' + estChef, {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }
  getAllSansConge(idUniteOrganisationnelle: number, annee: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/uniteOrganisationnelle/' + idUniteOrganisationnelle + '/annee/' + annee + '/sansConge', {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }
  getAllByUniteOrganisationnelle(idUniteOrganisationnelle: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/uniteOrganisationnelle/' + idUniteOrganisationnelle , {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }

  getResponsableDCH(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/uniteOrganisationnelle/dch',  {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }
  
  getAgentsAssures(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/agents_assures',  {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler));
  }
  create(agent: Agent): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url, JSON.stringify(agent), {
        headers: this.httpOptions.headers,
        observe: 'response',
      })
  }

  createAll(agents: Agent[]): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url + '/all', JSON.stringify(agents), {
        headers: this.httpOptions.headers,
        observe: 'response',
      })
  }

  getById(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + id)
  }

  update(agent: Agent): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.url, JSON.stringify(agent), {
        headers: this.httpOptions.headers,
        observe: 'response',
      })
  }

  delete(agent: Agent): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: this.httpOptions.headers,
      body: agent,
    };
    return this.httpClient.delete<any>(this.url, httpOptions);
  }

  errorHandler(error) {
    let errorMessage = '';
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

  getFonctions(){
    return this.fonctionService.getAll();
  }

  getAgentResponsable(idUniteOrganisationnelle: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/uniteOrganisationnelle/' + idUniteOrganisationnelle + '/responsable', {
        observe: 'response',
      })
  }

  getAllChefByUniteOrganisationnelleInferieures(idUniteOrganisationnelles: number[]):Observable<HttpResponse<any>> {
  
    return this.httpClient
    .get<any>(this.url + '/uniteOrganisationnelles/' + idUniteOrganisationnelles + '/chef', {
      observe: 'response',
    })
  }
}
