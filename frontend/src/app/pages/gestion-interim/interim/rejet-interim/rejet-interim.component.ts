import { Component, OnInit, Inject } from '@angular/core';
import { Interim } from '../../shared/model/interim.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EtapeInterimService } from '../../shared/services/etape-interim.service';
import { InterimService } from '../../shared/services/interim.service';
import { Agent } from '../../../../shared/model/agent.model';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { EtapeInterim } from '../../shared/model/etapeInterim.modele';

@Component({
  selector: 'fury-rejet-interim',
  templateUrl: './rejet-interim.component.html',
  styleUrls: ['./rejet-interim.component.scss']
})
export class RejetInterimComponent implements OnInit {

  static id = 100;
  interim: Interim;
  form: FormGroup;

  etapeInterim:EtapeInterim
  agent: Agent;
  username: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<RejetInterimComponent>,
    private fb: FormBuilder,
    private etapeInterimService: EtapeInterimService,
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private interimService:InterimService,
  ) {}

  ngOnInit(){
 
    this.form = this.fb.group({
      commentaire: ['', Validators.required],
      //action: [ '', Validators.required]
    });
    
    this.username = this.authentificationService.getUsername();
    this.getCompteByUsername(this.username)
  }
 
  validerEtapeInterim() {
    let etapeInterim = this.form.value;
    etapeInterim.interim= this.defaults
    etapeInterim.prenom= this.agent.prenom;
    etapeInterim.nom= this.agent.nom;
    etapeInterim.matricule= this.agent.matricule;
    etapeInterim.fonction= this.agent.fonction.nom;
    etapeInterim.structure = this.agent.uniteOrganisationnelle.nom
    etapeInterim.date = new Date
    etapeInterim.action = 'REJETER'
 //   etapeInterim.structure= this.agent.uniteOrganisationelle.nom;
    this.etapeInterimService.create(etapeInterim).subscribe(
         response => {   
          if(response.status === 201){
            this.interim = response.body.interim
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
        this.agent = response.body.agent;
      }
    )
  }
}
