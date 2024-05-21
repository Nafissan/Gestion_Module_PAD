import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Membre } from '../../shared/model/membre.model';

@Component({
  selector: 'fury-details-membre',
  templateUrl: './details-membre.component.html',
  styleUrls: ['./details-membre.component.scss']
})
export class DetailsMembreComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  membre: Membre;
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Membre,
    private dialogRef: MatDialogRef<DetailsMembreComponent>,
  ) { }

  ngOnInit(): void {
    this.membre = this.defaults;
  }


}
