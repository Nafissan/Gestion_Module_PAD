import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { AddAbsenceComponent } from '../add-absence/add-absence.component';
import { Absence } from '../../shared/model/absence.model';

@Component({
  selector: 'fury-details-absence',
  templateUrl: './details-absence.component.html',
  styleUrls: ['./details-absence.component.scss']
})
export class DetailsAbsenceComponent implements OnInit {

  absence: Absence;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Show icon
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddAbsenceComponent>,
  ) { }

  ngOnInit(): void {
    this.absence = this.defaults;
  }
  getNombtreJour(dateRetourEffectif: Date, dateRetourPrev: Date, dateDepart: Date){
    let date: number;
    if(dateRetourEffectif === null){
      date = new Date(dateRetourPrev).getTime() - new Date(dateDepart).getTime();
    }else{
      date = new Date(dateRetourEffectif).getTime() - new Date(dateDepart).getTime();
    }
    return date/(1000*3600*24);
   }
}
