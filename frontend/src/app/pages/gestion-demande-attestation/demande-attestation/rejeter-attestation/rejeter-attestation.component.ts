import { Component, OnInit, Inject } from '@angular/core';
import { DemandeAttestationService } from '../../shared/services/demande-attestation.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Attestation } from '../../shared/model/demande-attestation.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SuiviAttestationService } from '../../shared/services/suivi-attestation.service';
import { Agent } from '../../../../shared/model/agent.model';
import { AuthenticationService } from '../../../../shared/services/authentification.service';
import { CompteService } from '../../../gestion-utilisateurs/shared/services/compte.service';
import { EtapeAttestation } from '../../shared/model/etape-attestation.model';
import { EtatAttestation } from '../../shared/util/etat';
import { DialogConfirmationService } from '../../../../shared/services/dialog-confirmation.service';
import { DialogUtil, NotificationUtil } from '../../../../shared/util/util';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'fury-rejeter-attestation',
  templateUrl: './rejeter-attestation.component.html',
  styleUrls: ['./rejeter-attestation.component.scss']
})
export class RejeterAttestationComponent implements OnInit {
  dialogUtil: DialogUtil = new DialogUtil();
  static id = 100;
  demandeAttestations: Attestation[];
  form: FormGroup;
  agent: Agent;
  username: string
  suiviAttestation: EtapeAttestation
  attestation: Attestation
  constructor( 
    private notificationService:NotificationService,
    private dialogConfirmationService: DialogConfirmationService,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<RejeterAttestationComponent>,
    private fb: FormBuilder,
    private suiviAttestationService: SuiviAttestationService,
    private authentificationService: AuthenticationService,
    private compteService: CompteService,
    private demandeAttestationService: DemandeAttestationService,
  ) { }

  ngOnInit(): void {    
    this.form = this.fb.group({
      commentaire: ['', Validators.required]
     // date: ['', Validators.required]
    });
    this.username = this.authentificationService.getUsername();
    this.getCompteByUsername(this.username)
  }

  rejeterAttestation() {
    this.dialogConfirmationService.confirmationDialog().subscribe(action =>{
      if (action === DialogUtil.confirmer){
        let suiviAttestation: EtapeAttestation = this.form.value;
      
      if(this.defaults.type === 'one'){
        suiviAttestation.date = new Date()
        suiviAttestation.prenom= this.agent.prenom;
        suiviAttestation.nom= this.agent.nom;
        suiviAttestation.matricule= this.agent.matricule;
        suiviAttestation.fonction= this.agent.fonction.nom;
        suiviAttestation.attestation = this.defaults.demandeAttestation;
        suiviAttestation.telephone = this.agent.telephone;

        this.suiviAttestationService.create(suiviAttestation).subscribe(
          response => { 
            this.notificationService.success(NotificationUtil.rejet); 
              if(response.status === 201){
                this.attestation = response.body.attestation
                this.updateAttestation(this.attestation, EtatAttestation.rejeter)
              }
          })
      }
      else if(this.defaults.type === 'many'){
        let suiviAttestations: EtapeAttestation[] = [];

        this.defaults.demandeAttestations.forEach(el => {
          let suiviAttestation: EtapeAttestation = new EtapeAttestation();
          suiviAttestation.date = new Date()
          suiviAttestation.prenom= this.agent.prenom;
          suiviAttestation.nom= this.agent.nom;
          suiviAttestation.matricule= this.agent.matricule;
          suiviAttestation.fonction= this.agent.fonction.nom;
          suiviAttestation.attestation = el;
          suiviAttestation.telephone = this.agent.telephone;
          suiviAttestation.commentaire = this.form.value.commentaire;
          suiviAttestations.push(suiviAttestation);
        });
        this.suiviAttestationService.createMany(suiviAttestations).subscribe(
          response => { 
            this.notificationService.success(NotificationUtil.rejet);
              if(response.status === 201){
                this.updateAttestationMany(this.defaults.demandeAttestations, EtatAttestation.rejeter)
              }
          })
      }
      
      }
    })
  }
  updateSuiviAttestation() {
    let suiviAttestation = this.form.value;
    suiviAttestation.id = this.defaults.id;
    suiviAttestation.agent = this.defaults.agent;
    
    this.suiviAttestationService.update(suiviAttestation).subscribe(
       response => {
        this.dialogRef.close(suiviAttestation);
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
  updateAttestation(attestation: Attestation, etat){
    attestation.etat = etat
    this.demandeAttestationService.update(attestation).subscribe(
      response => {
       this.dialogRef.close(this.attestation);
      }
   )
  }
  updateAttestationMany(attestations: Attestation[], etat: string) {
    attestations.forEach(el => el.etat = etat)
    this.demandeAttestationService.updateMany(attestations).subscribe((response) => {
      this.dialogRef.close();
    });
  }
}
