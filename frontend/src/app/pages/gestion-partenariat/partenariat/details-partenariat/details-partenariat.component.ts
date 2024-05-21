import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Partenaire } from '../../shared/model/partenaire.model';

@Component({
  selector: 'fury-details-partenariat',
  templateUrl: './details-partenariat.component.html',
  styleUrls: ['./details-partenariat.component.scss', '../../../../shared/util/bootstrap4.css']
})
export class DetailsPartenariatComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  partenaire: Partenaire;
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Partenaire,
    private dialogRef: MatDialogRef<DetailsPartenariatComponent>,
  ) { }

  ngOnInit(): void {
    this.partenaire = this.defaults;
  }

}
