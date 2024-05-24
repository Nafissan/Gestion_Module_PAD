import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DossierColonie } from '../model/dossier-colonie.model';

@Injectable({
    providedIn: "root",
  })
export class DossierColonieService {
  
  private dossiersListSubject: BehaviorSubject<DossierColonie[]> = new BehaviorSubject<DossierColonie[]>([]);
  public dossiersList$: Observable<DossierColonie[]> = this.dossiersListSubject.asObservable();

  private dossiers: DossierColonie[] = [
    {
      id: 1,
      code: 'DC001',
      annee: '2024',
      description: 'Dossier Colonie 1',
      etat: 'ouvert',
      noteMinistere: undefined,
      demandeProspection: undefined,
      notePelerins: undefined,
      notePersonnels: undefined,
      matricule: '',
      prenom: '',
      nom: '',
      fonction: '',
      codeDirection: '',
      nomDirection: '',
      descriptionDirection: ''
    },
    // Ajoutez d'autres objets DossierColonie si nécessaire
  ];
  constructor() {     this.dossiersListSubject.next(this.dossiers);
  }
  getAll(): Observable<DossierColonie[]> {
    return this.dossiersList$;
  }

  create(dossier: DossierColonie): Observable<DossierColonie> {
    dossier.id = this.dossiers.length + 1; // Simuler l'assignation d'un nouvel ID
    this.dossiers.push(dossier);
    this.dossiersListSubject.next(this.dossiers);
    return of(dossier);
  }


  setDossiersList(dossiers: DossierColonie[]): void {
    this.dossiersListSubject.next(dossiers);
  }

  getDossiersList(): Observable<DossierColonie[]> {
    return this.dossiersList$;
  }
  updateDossier(dossier: DossierColonie): Observable<DossierColonie> {
    const index = this.dossiers.findIndex(d => d.id === dossier.id);
    if (index !== -1) {
      this.dossiers[index] = dossier;
      this.dossiersListSubject.next(this.dossiers);
    }
    return of(dossier);
  
  }delete(dossier: DossierColonie): Observable<void> {
    this.dossiers = this.dossiers.filter(d => d.id !== dossier.id);
    this.dossiersListSubject.next(this.dossiers);
    return of();
  }

}
