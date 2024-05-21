import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Activite } from '../../shared/model/activite.model';

@Component({
  selector: 'fury-details-activite',
  templateUrl: './details-activite.component.html',
  styleUrls: ['./details-activite.component.scss', '../../../../shared/util/bootstrap4.css']
})
export class DetailsActiviteComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  activite: Activite;
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Activite,
    private dialogRef: MatDialogRef<DetailsActiviteComponent>,
  ) { }

  ngOnInit(): void {
    this.activite = this.defaults;
  }


}
