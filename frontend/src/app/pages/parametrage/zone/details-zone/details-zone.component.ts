import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Zone } from '../../shared/model/zone.model';

@Component({
  selector: 'fury-details-zone',
  templateUrl: './details-zone.component.html',
  styleUrls: ['./details-zone.component.scss', '../../../../shared/util/bootstrap4.css']
})
export class DetailsZoneComponent implements OnInit {

  zone: Zone;
  showIcon = true;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: Zone,
    private dialogRef: MatDialogRef<DetailsZoneComponent>,
  ) { }

  ngOnInit(): void {
    this.zone = this.defaults;
  }

}
