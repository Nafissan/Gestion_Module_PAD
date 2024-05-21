import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { DetailsPartenariatComponent } from '../../partenariat/details-partenariat/details-partenariat.component';
import { Convention } from '../../shared/model/convention.model';

@Component({
  selector: 'fury-details-convention',
  templateUrl: './details-convention.component.html',
  styleUrls: ['./details-convention.component.scss', '../../../../shared/util/bootstrap4.css']
})
export class DetailsConventionComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  convention: Convention;
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Convention,
    private dialogRef: MatDialogRef<DetailsPartenariatComponent>,
  ) { }

  ngOnInit(): void {
    this.convention = this.defaults;
  }


}
