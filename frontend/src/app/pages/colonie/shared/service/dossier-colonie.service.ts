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
      code: 'DCLN1',
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
  constructor() {
    console.log('Initial dossiers:', this.dossiers); // Debugging output
    this.dossiersListSubject.next(this.dossiers);
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
    // Recherche du dossier correspondant dans la liste en fonction du code
    const dossierToUpdate = this.dossiers.find(d => d.code === dossier.code);
    console.log(dossierToUpdate.code);
    // Si le dossier correspondant est trouvé
    if (dossierToUpdate) {
      // Mettre à jour les propriétés du dossier trouvé avec les nouvelles données
      dossierToUpdate.id = dossier.id;
      dossierToUpdate.annee = dossier.annee;
      dossierToUpdate.description = dossier.description;
      dossierToUpdate.etat = dossier.etat;
      dossierToUpdate.noteMinistere = dossier.noteMinistere;
      dossierToUpdate.demandeProspection = dossier.demandeProspection;
      dossierToUpdate.notePelerins = dossier.notePelerins;
      dossierToUpdate.notePersonnels = dossier.notePersonnels;
      dossierToUpdate.matricule = dossier.matricule;
      dossierToUpdate.prenom = dossier.prenom;
      dossierToUpdate.nom = dossier.nom;
      dossierToUpdate.fonction = dossier.fonction;
      dossierToUpdate.codeDirection = dossier.codeDirection;
      dossierToUpdate.nomDirection = dossier.nomDirection;
      dossierToUpdate.descriptionDirection = dossier.descriptionDirection;
  
      // Mettre à jour la liste des dossiers dans le BehaviorSubject
      this.dossiersListSubject.next(this.dossiers);
      console.log(this.dossiers.length);
      console.log(dossierToUpdate.code);
      // Renvoyer le dossier mis à jour
    }
    return of(dossierToUpdate);
  }
  delete(dossier: DossierColonie): Observable<void> {
    this.dossiers = this.dossiers.filter(d => d.id !== dossier.id);
    this.dossiersListSubject.next(this.dossiers);
    return of();
  }

}
