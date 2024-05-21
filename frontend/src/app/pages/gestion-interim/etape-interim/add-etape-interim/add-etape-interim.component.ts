import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Form, Validators } from "@angular/forms";
import { Interim } from '../../shared/model/interim.model'
import { EtapeInterimService } from "../../shared/services/etape-interim.service";

@Component({
  selector: 'fury-add-etape-interim',
  templateUrl: './add-etape-interim.component.html',
  styleUrls: ['./add-etape-interim.component.scss']
})
export class AddEtapeInterimComponent implements OnInit {

  static id = 100;
  interim: Interim;
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddEtapeInterimComponent>,
    private fb: FormBuilder,
    private etapeInterimService: EtapeInterimService
  ) {}

  ngOnInit(){
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as Interim;
    }
    this.form = this.fb.group({
      commentaire: [this.defaults.commentaire || '', Validators.required],
      date: [this.defaults.date || '', Validators.required],
      action: [this.defaults.action || '', Validators.required]
    });
  }
  save() {
    if (this.mode === 'create') {
      this.createEtapeInterim();
    } else if (this.mode === 'update') {
      this.updateEtapeInterim();
    }
  }
  createEtapeInterim() {
    let etapeInterim = this.form.value;
    this.etapeInterimService.create(etapeInterim).subscribe(
         response => {      
          this.dialogRef.close(response.body);
         }
    )
  }

  updateEtapeInterim() {
    let etapeInterim = this.form.value;
    etapeInterim.id = this.defaults.id;
    
    this.etapeInterimService.update(etapeInterim).subscribe(
       response => {
        this.dialogRef.close(etapeInterim);
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