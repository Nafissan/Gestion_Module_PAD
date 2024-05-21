import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Form, Validators } from "@angular/forms";
import { SuiviAttestationService } from "../../shared/services/suivi-attestation.service";
import { Agent } from "../../../../shared/model/agent.model";
import { Attestation } from "../../shared/model/demande-attestation.model";
import { EtapeAttestation } from "../../shared/model/etape-attestation.model";

@Component({
  selector: 'fury-add-suivi-attestation',
  templateUrl: './add-suivi-attestation.component.html',
  styleUrls: ['./add-suivi-attestation.component.scss']
})
export class AddSuiviAttestationComponent implements OnInit {
  static id = 100;
  agent: Agent;
  demandeAttestation: Attestation;
  suiviAttestation: EtapeAttestation;
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddSuiviAttestationComponent>,
    private fb: FormBuilder,
    private suiviAttestationService: SuiviAttestationService
  ) {}

  ngOnInit(){
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as EtapeAttestation;
    }
    this.form = this.fb.group({
      commentaire: [this.defaults.commentaire || '', Validators.required],
      dateSaisie: [this.defaults.dateSaisie || '', Validators.required]
    });
  }
  save() {
    if (this.mode === 'create') {
      this.createSuiviAttestation();
    } else if (this.mode === 'update') {
      this.updateSuiviAttestation();
    }
  }
  createSuiviAttestation() {
    let suiviAttestation = this.form.value;
    suiviAttestation.agent = this.agent;
    suiviAttestation.demandeAttestation = this.demandeAttestation;
    this.suiviAttestationService.create(suiviAttestation).subscribe(
         response => { 
           this.dialogRef.close(response.body);
          }
     )
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
  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
