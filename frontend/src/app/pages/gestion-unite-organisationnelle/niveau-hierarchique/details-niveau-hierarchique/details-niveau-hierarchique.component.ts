import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NiveauHierarchique } from '../../shared/model/niveau-hierarchique.model';
import { MatAccordion } from '@angular/material/expansion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddNiveauHierarchiqueComponent } from '../add-niveau-hierarchique/add-niveau-hierarchique.component';

@Component({
  selector: 'fury-details-niveau-hierarchique',
  templateUrl: './details-niveau-hierarchique.component.html',
  styleUrls: ['./details-niveau-hierarchique.component.scss']
})
export class DetailsNiveauHierarchiqueComponent implements OnInit {
  niveauHierarchique: NiveauHierarchique;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Show icon
  showIcon = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddNiveauHierarchiqueComponent>,
  ) { }

  ngOnInit() {
    this.niveauHierarchique = this.defaults;
  }

}
