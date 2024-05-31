import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RapportProspection } from '../model/rapport-prospection.model';

@Injectable({
  providedIn: 'root',
})
export class RapportProspectionService {
  private url = '/pss-backend/rapportsProspection';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // Récupérer tous les rapports de prospection
  getAllRapportsProspection(): Observable<HttpResponse<RapportProspection[]>> {
    return this.httpClient.get<RapportProspection[]>(this.url, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  // Récupérer un rapport de prospection par son ID
  getRapportProspectionById(id: number): Observable<HttpResponse<RapportProspection>> {
    const getUrl = `${this.url}/${id}`;
    return this.httpClient.get<RapportProspection>(getUrl, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  // Créer un rapport de prospection
  saveRapportProspection(rapportProspection: RapportProspection): Observable<HttpResponse<RapportProspection>> {
    return this.httpClient.post<RapportProspection>(this.url, rapportProspection, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  // Mettre à jour un rapport de prospection
  updateRapportProspection(rapportProspection: RapportProspection): Observable<HttpResponse<any>> {
    return this.httpClient.put<any>(this.url, rapportProspection, { headers: this.httpOptions.headers, observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  // Supprimer un rapport de prospection
  deleteRapportProspection(id: number): Observable<HttpResponse<any>> {
    const deleteUrl = `${this.url}/${id}`;
    return this.httpClient.delete<any>(deleteUrl, { observe: 'response' })
      .pipe(catchError(this.errorHandler));
  }

  // Gérer les erreurs HTTP
  private errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = error.error.message;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
