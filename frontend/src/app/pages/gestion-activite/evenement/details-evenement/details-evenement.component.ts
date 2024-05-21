import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { DetailsPartenariatComponent } from 'src/app/pages/gestion-partenariat/partenariat/details-partenariat/details-partenariat.component';
import { Evenement } from '../../shared/model/evenement.model';


@Component({
  selector: 'fury-details-evenement',
  templateUrl: './details-evenement.component.html',
  styleUrls: ['./details-evenement.component.scss' , '../../../../shared/util/bootstrap4.css']
})
export class DetailsEvenementComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  evenement: Evenement;
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Evenement,
    private dialogRef: MatDialogRef<DetailsPartenariatComponent>,
  ) { }

  ngOnInit(): void {
    this.evenement = this.defaults;
  }

}
