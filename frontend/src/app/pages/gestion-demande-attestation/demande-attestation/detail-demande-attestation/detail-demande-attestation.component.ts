import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddAttestationComponent } from '../add-attestation/add-attestation.component';
import { Attestation } from '../../shared/model/demande-attestation.model';
import { MatAccordion } from '@angular/material/expansion';
import { EtapeAttestation } from '../../shared/model/etape-attestation.model';
import { SuiviAttestationService } from '../../shared/services/suivi-attestation.service';
import { Agent } from '../../../../shared/model/agent.model';

@Component({
  selector: 'fury-detail-demande-attestation',
  templateUrl: './detail-demande-attestation.component.html',
  styleUrls: ['./detail-demande-attestation.component.scss']
})
export class DetailDemandeAttestationComponent implements OnInit {
  suiviAttestations: EtapeAttestation[];
  suiviAttestation: EtapeAttestation = undefined;
  attestaion: Attestation
   agent : Agent;
  @ViewChild(MatAccordion) accordion: MatAccordion;
 showIcon = true;
  constructor( @Inject(MAT_DIALOG_DATA) public defaults: any,
  private suiviAttestationService: SuiviAttestationService,
  private dialogRef: MatDialogRef<DetailDemandeAttestationComponent>,) { }


  ngOnInit(): void {
    // this.suiviAttestation = this.defaults;
    
    this.attestaion = this.defaults
    console.log(this.attestaion);  
    
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
  }':'

}
