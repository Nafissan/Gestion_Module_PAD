import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Absence } from '../../shared/model/absence.model';
import { EtapeAbsence } from '../../shared/model/etape-absence.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { EtapeAbsenceService } from '../../shared/service/etape-absence.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { fadeInUpAnimation } from '../../../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../../@fury/animations/fade-in-right.animation';

@Component({
  selector: 'fury-historique-absence',
  templateUrl: './historique-absence.component.html',
  styleUrls: ['./historique-absence.component.scss', "../../../../shared/util/bootstrap4.css"],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class HistoriqueAbsenceComponent implements OnInit {
  etapeAbsences: EtapeAbsence[];
  form: FormGroup;
  private fb: FormBuilder

  //Show icon
///  showIcon = true;
absence: Absence;
@ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<HistoriqueAbsenceComponent>,
    private etapeAbsenceService:EtapeAbsenceService
  ) { }

  ngOnInit(): void {
    this.absence = this.defaults;
    this.getEtapeAbsenceByAbsence();
  }

getEtapeAbsenceByAbsence(){
  
  this.etapeAbsenceService.getAll().subscribe(response=>{
    this.etapeAbsences = response.body;
   this.etapeAbsences = this.etapeAbsences.filter(a=> (a.absence.id===this.absence.id));
  })
}
save() {}
}
