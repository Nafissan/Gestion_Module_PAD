import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Agent } from '../model/agent.model';
import { FonctionService } from "../../pages/gestion-unite-organisationnelle/shared/services/fonction.service";
import { Mail } from '../model/mail.model';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  url = '/pss-backend/send-mail';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private fonctionService : FonctionService
  constructor(private httpClient: HttpClient) {
  }




  sendMailByAgent(mail: Mail,id:number): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.url+'/' +'agent'+'/'+id , JSON.stringify(Mail), {
        headers: this.httpOptions.headers,
        observe: 'response',
      })
  }

  // sendMailByDirections(mail: Mail,idAgents:number[]): Observable<HttpResponse<any>> {
  //     return this.httpClient
  //     .post<any>(this.url+'/' +'agents'+'/'+idAgents , JSON.stringify(mail), {
  //       headers: this.httpOptions.headers,
  //       observe: 'response',
  //     })
  //   }

    sendMailByDirections(mail: Mail): Observable<HttpResponse<any>> {
      return this.httpClient
      .post<any>(this.url+'/' +'agents', JSON.stringify(mail), {
        headers: this.httpOptions.headers,
        observe: 'response',
      })
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

  getAgentResponsable(idUniteOrganisationnelle: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.url + '/uniteOrganisationnelle/' + idUniteOrganisationnelle + '/responsable', {
        observe: 'response',
      })
  }

  sendMailPasswordOublie(agent: Agent): Observable<HttpResponse<any>> {
    return this.httpClient
    .post<any>(this.url+'/' +'agents'+'/'+'password',JSON.stringify(agent), {
      headers: this.httpOptions.headers,
      observe: 'response',
    })
  }
}