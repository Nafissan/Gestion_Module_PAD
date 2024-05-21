import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { TypeDotation } from '../../shared/model/type-dotation.model';

@Component({
  selector: 'fury-details-type-dotation-lait',
  templateUrl: './details-type-dotation-lait.component.html',
  styleUrls: ['./details-type-dotation-lait.component.scss']
})
export class DetailsTypeDotationLaitComponent implements OnInit {
  typeDotationLait: TypeDotation;
  showIcon = true;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: TypeDotation,
    private dialogRef: MatDialogRef<DetailsTypeDotationLaitComponent>,
  ) { }

  ngOnInit(): void {
    this.typeDotationLait = this.defaults;
  }

}
