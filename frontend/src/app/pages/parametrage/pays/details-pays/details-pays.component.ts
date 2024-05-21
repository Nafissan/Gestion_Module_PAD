import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import {Pays} from '../../shared/model/pays.model';

@Component({
  selector: 'fury-details-pays',
  templateUrl: './details-pays.component.html',
  styleUrls: ['./details-pays.component.scss', '../../../../shared/util/bootstrap4.css']
})
export class DetailsPaysComponent implements OnInit {
  pays: Pays;
  showIcon = true;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Pays,
    private dialogRef: MatDialogRef<DetailsPaysComponent>,
  ) { }

  ngOnInit(): void {
    this.pays = this.defaults;
  }

}
