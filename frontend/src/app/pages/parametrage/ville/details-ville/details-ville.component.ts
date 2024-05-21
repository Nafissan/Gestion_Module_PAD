import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Ville } from '../../../../shared/model/ville.model';

@Component({
  selector: 'fury-details-ville',
  templateUrl: './details-ville.component.html',
  styleUrls: ['./details-ville.component.scss', '../../../../shared/util/bootstrap4.css']
})
export class DetailsVilleComponent implements OnInit {
  ville: Ville;
  showIcon = true;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Ville,
    private dialogRef: MatDialogRef<DetailsVilleComponent>,
  ) { }

  ngOnInit(): void {
    this.ville = this.defaults;
  }

}
