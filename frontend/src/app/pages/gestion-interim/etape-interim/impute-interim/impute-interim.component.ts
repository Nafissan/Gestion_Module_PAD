import { Component, OnInit, Inject } from '@angular/core';
import { Compte } from '../../../gestion-utilisateurs/shared/model/compte.model';
import { Agent } from '../../../../shared/model/agent.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Interim } from '../../shared/model/interim.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EtapeInterimService } from '../../shared/services/etape-interim.service';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { InterimService } from '../../shared/services/interim.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { EtapeInterim } from '../../shared/model/etapeInterim.modele';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';

@Component({
  selector: 'fury-impute-interim',
  templateUrl: './impute-interim.component.html',
  styleUrls: ['./impute-interim.component.scss']
})
export class ImputeInterimComponent implements OnInit {

  static id = 100;
  interim: Interim;
  form: FormGroup;
  compte:Compte;
  etapeInterim:EtapeInterim;
  agent: Agent;
  username: string;
  agentConnecte: Agent;
  uniteOrganisationnelle:UniteOrganisationnelle;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ImputeInterimComponent>,
    private fb: FormBuilder,
    private etapeInterimService: EtapeInterimService,
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private interimService:InterimService,
  ) {}

  ngOnInit(){
 
    this.interim = this.defaults;
    this.form = this.fb.group({
      commentaire: [''],
    });
    
    this.username = this.authentificationService.getUsername()
    this.username = this.authentificationService.getUsername();
    this.compteService.getByUsername(this.username).subscribe((response) => {
      this.compte = response.body;
      this.agentConnecte = this.compte.agent;
      this.uniteOrganisationnelle = this.agentConnecte.uniteOrganisationnelle;
      //this.getUniteOrganisationnelleSuperieure();
    },err => {}
    , () => {
    //  this.getAgents();
    });
  }
 
  imputer() {
    let etapeInterim = this.form.value;
    etapeInterim.interim= this.defaults
    etapeInterim.prenom= this.agentConnecte.prenom;
    etapeInterim.nom= this.agentConnecte.nom;
    etapeInterim.matricule= this.agentConnecte.matricule;
    etapeInterim.fonction= this.agentConnecte.fonction.nom;
    etapeInterim.structure = this.agentConnecte.uniteOrganisationnelle.nom
    etapeInterim.date = new Date
    etapeInterim.action = 'TRANSMIS'
 //   etapeInterim.structure= this.agent.uniteOrganisationelle.nom;
    this.etapeInterimService.create(etapeInterim).subscribe(
         response => {   
          if(response.status === 201){
            this.interim = response.body.interim
              this.interim.niveau =    this.interim.niveau+1;
            this.updateInterim(this.interim, etapeInterim.action)
          }
        }
    )
  }
  updateInterim(interim: Interim, etat){
    interim.etat = etat
    this.interimService.update(interim).subscribe(
      response => {
       this.dialogRef.close(this.interim);
      }
   ) 
  }

  getCompteByUsername(username){
    this.compteService.getByUsername(username).subscribe(
      response => {
        this.agentConnecte = response.body.agent;
      }
    )
  }

}
