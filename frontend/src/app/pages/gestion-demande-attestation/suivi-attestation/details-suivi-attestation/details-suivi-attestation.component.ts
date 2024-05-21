import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddSuiviAttestationComponent } from '../add-suivi-attestation/add-suivi-attestation.component';
import { EtapeAttestation } from '../../shared/model/etape-attestation.model';
import { MatAccordion } from '@angular/material/expansion';
import { Agent } from '../../../../shared/model/agent.model';
import { Attestation } from '../../shared/model/demande-attestation.model';
import { SuiviAttestationService } from '../../shared/services/suivi-attestation.service';

@Component({
  selector: 'fury-details-suivi-attestation',
  templateUrl: './details-suivi-attestation.component.html',
  styleUrls: ['./details-suivi-attestation.component.scss']
})
export class DetailsSuiviAttestationComponent implements OnInit {
  suiviAttestations: EtapeAttestation[];
  suiviAttestation: EtapeAttestation;
  attestaion: Attestation
   agent : Agent;
  @ViewChild(MatAccordion) accordion: MatAccordion;
 showIcon = true;
  constructor( @Inject(MAT_DIALOG_DATA) public defaults: any,
  private suiviAttestationService: SuiviAttestationService,
  private dialogRef: MatDialogRef<DetailsSuiviAttestationComponent>,) { }


  ngOnInit(): void {
    // this.suiviAttestation = this.defaults;
    
    this.attestaion = this.defaults
    // this.agent = this.defaults;
    this.getSuiviAttestation(this.attestaion )
  }
  getSuiviAttestation(attestaion:Attestation){
    this.suiviAttestationService.getAll().subscribe(response=>{

      this.suiviAttestations = response.body
      this.suiviAttestations = this.suiviAttestations.filter(a=> (a.attestation .id=== attestaion.id));
      this.suiviAttestations.forEach(element => {
          this.suiviAttestation =element;
      });
      
    });
  }

}
