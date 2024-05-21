import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../../src/app/shared/services/authentification.service';
import { CompteService } from '../../gestion-utilisateurs/shared/services/compte.service';
import { Agent } from '../../../../../src/app/shared/model/agent.model';
import { Compte } from '../../gestion-utilisateurs/shared/model/compte.model';
import { fadeInRightAnimation } from '../../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';


@Component({
  selector: 'fury-informations-agents',
  templateUrl: './informations-agents.component.html',
  styleUrls: ['./informations-agents.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class InformationsAgentsComponent implements OnInit {

  recupAbsence: boolean = true;  
  recupConge: boolean = false;
  recupAttestation: boolean = false;
  recupInterims: boolean = false;
  username: string;
  agent: Agent;
  compte: Compte;
  estChef: boolean = false;


  constructor(
    private authentificationService: AuthenticationService,
    private compteService: CompteService,) { }

  ngOnInit(): void {
      this.username = this.authentificationService.getUsername();
      this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agent = this.compte.agent;  

      this.isAgentChef()
     
      });
      
  }

  isAgentChef(){
    if(this.agent.estChef){
      this.estChef=true
    }else{
      this.estChef=false
    }
  }

  changerEtat(){
    this.recupConge=true;
  }

  chargerDonneesTab(a){
    if(this.estChef){
        if(a.index==1){//conge
          this.recupConge=true;//si recupConge==true on fait appel au component qui affiche les conges
        }else if(a.index==2){//interim
          this.recupInterims=true;
        }else if(a.index==3) {//attestation
          this.recupAttestation=true;
        }
    }else{
      if(a.index==1){//conge
        this.recupConge=true;//si recupConge==true on fait appel au component qui affiche les conges
      }else if(a.index==2) {//attestation
        this.recupAttestation=true;
      }
    }


  }     

}
