import { Component, OnInit ,ViewChild ,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Comite } from '../../shared/model/comite.model';

@Component({
  selector: 'fury-details-comite',
  templateUrl: './details-comite.component.html',
  styleUrls: ['./details-comite.component.scss']
})
export class DetailsComiteComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  comite: Comite;
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Comite,
    private dialogRef: MatDialogRef<DetailsComiteComponent>,
  ) { }

  ngOnInit(): void {
    this.comite = this.defaults;
  }

}
