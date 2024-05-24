import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RapportProspection } from '../model/rapport-prospection.model';

@Injectable({
  providedIn: 'root'
})
export class RapportProspectionService {
  private reports: RapportProspection[] = []; // Liste des rapports
  private reportsSubject: BehaviorSubject<RapportProspection[]> = new BehaviorSubject<RapportProspection[]>([]);

  constructor() { }

  // Ajouter un rapport
  addReport(report: RapportProspection): void {
    this.reports.push(report);
    this.reportsSubject.next([...this.reports]);
  }

  // Modifier un rapport
  updateReport(updatedReport: RapportProspection): void {
    const index = this.reports.findIndex(report => report.id === updatedReport.id);
    if (index !== -1) {
      this.reports[index] = updatedReport;
      this.reportsSubject.next([...this.reports]);
    }
  }

  // Supprimer un rapport
  deleteReport(reportId: string): Observable<void> {
    this.reports = this.reports.filter(report => report.id !== reportId);
    this.reportsSubject.next([...this.reports]);
    return of();
  }

  // Récupérer tous les rapports
  getAllReports(): Observable<RapportProspection[]> {
    return this.reportsSubject.asObservable();
  }
}
