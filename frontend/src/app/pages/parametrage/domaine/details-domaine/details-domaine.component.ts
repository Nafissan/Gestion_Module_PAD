import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Domaine } from '../../shared/model/domaine.model';


@Component({
  selector: 'fury-details-domaine',
  templateUrl: './details-domaine.component.html',
  styleUrls: ['./details-domaine.component.scss', '../../../../shared/util/bootstrap4.css']
})
export class DetailsDomaineComponent implements OnInit {

  domaine: Domaine;
  showIcon = true;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Domaine,
    private dialogRef: MatDialogRef<DetailsDomaineComponent>,
  ) { }

  ngOnInit(): void {
    this.domaine = this.defaults;
  }

}

