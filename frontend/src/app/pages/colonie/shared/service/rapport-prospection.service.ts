import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { RapportProspection } from '../model/rapport-prospection.model';

@Injectable({
  providedIn: 'root'
})
export class RapportProspectionService {
  private reports: RapportProspection[] = []; // Liste des rapports
  private reportsSubject: BehaviorSubject<RapportProspection[]> = new BehaviorSubject<RapportProspection[]>([]);

  constructor() { }

  // Ajouter un rapport
  addReport(report: RapportProspection){
    this.reports.push(report);
    this.reportsSubject.next([...this.reports]);
  }

  // Modifier un rapport
  updateReport(updatedReport: RapportProspection){
    const index = this.reports.findIndex(report => report.id === updatedReport.id);
    if (index !== -1) {
      this.reports[index] = updatedReport;
      this.reportsSubject.next([...this.reports]);
      return of(updatedReport); // Return an observable to mimic HTTP request
    } else {
      return throwError('Participant not found');
    }
  }

  // Supprimer un rapport
  deleteReport(reportId: string) {
    this.reports = this.reports.filter(report => report.id !== reportId);
    this.reportsSubject.next([...this.reports]);
    return of();
  }

  // Récupérer tous les rapports
  getAllReports() {
    return this.reportsSubject;
  }
}
