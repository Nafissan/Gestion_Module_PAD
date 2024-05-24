import { Injectable } from "@angular/core";
import { BehaviorSubject, of, throwError } from "rxjs";
import { Participant } from "../model/participant.model";
import { Agent } from "src/app/shared/model/agent.model";
import { AgentService } from "src/app/shared/services/agent.service";

@Injectable({
  providedIn: "root"
})
export class ParticipantService {
  private participantsList: Participant[] = [];
  private participantsSubject = new BehaviorSubject<Participant[]>([]);
  agent: Agent = new Agent();
  participants$ = this.participantsSubject.asObservable();
  private agentService: AgentService;
  private participants: Participant[] = [
    {
      id: 1,
      nom: 'nana',
      prenom: 'ndiaye',
      ficheSocial: null,
      groupeSanguin: 'A+',
      dateNaissance: null,
      lieuNaissance: 'dadar',
      agentParent: this.agent,
    },
    // Ajoutez d'autres objets DossierColonie si nécessaire
  ];
  constructor() { this.participantsSubject.next(this.participants);}

  getAllParticipants() {
    // You can replace this with actual fetching logic from backend
    // For now, we'll just return a copy of the participants list
    return this.participantsSubject;
  }

  addParticipant(participant: Participant) {
    // You can replace this with actual logic to add participant
    // For now, we'll just push the new participant to the list
    this.participantsList.push(participant);
    this.participantsSubject.next([...this.participantsList]);
  }

  updateParticipant(participant: Participant) {
    // Find the participant by id and update its data
    const index = this.participantsList.findIndex(p => p.id === participant.id);
    if (index !== -1) {
      this.participantsList[index] = participant;
      this.participantsSubject.next([...this.participantsList]);
      return of(participant); // Return an observable to mimic HTTP request
    } else {
      return throwError('Participant not found');
    }
  }
  
  delete(participant: Participant) {
    this.participants = this.participants.filter(d => d.id !== participant.id);
    this.participantsSubject.next(this.participants);
    return of();
  }
}
