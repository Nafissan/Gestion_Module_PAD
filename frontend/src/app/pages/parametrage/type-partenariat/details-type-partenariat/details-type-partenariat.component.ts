import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { TypePartenariat } from '../../shared/model/type-partenariat.model';

@Component({
  selector: 'fury-details-type-partenariat',
  templateUrl: './details-type-partenariat.component.html',
  styleUrls: ['./details-type-partenariat.component.scss' , '../../../../shared/util/bootstrap4.css']
})
export class DetailsTypePartenariatComponent implements OnInit {

  typePartenariat: TypePartenariat;
  showIcon = true;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: TypePartenariat,
    private dialogRef: MatDialogRef<DetailsTypePartenariatComponent>,
  ) { }

  ngOnInit(): void {
    this.typePartenariat = this.defaults;
  }

}
