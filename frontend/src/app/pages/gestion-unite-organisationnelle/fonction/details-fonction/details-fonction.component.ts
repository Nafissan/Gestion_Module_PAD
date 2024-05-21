import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Fonction } from '../../shared/model/fonction.model';
import { MatAccordion } from '@angular/material/expansion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddFonctionComponent } from '../add-fonction/add-fonction.component';

@Component({
  selector: 'fury-details-fonction',
  templateUrl: './details-fonction.component.html',
  styleUrls: ['./details-fonction.component.scss']
})
export class DetailsFonctionComponent implements OnInit {
  fonction: Fonction;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Show icon
  showIcon = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddFonctionComponent>,
  ) { }

  ngOnInit() {
    this.fonction = this.defaults;
  }

}
