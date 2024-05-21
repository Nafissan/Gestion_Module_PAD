import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Interim } from '../../shared/model/interim.model';
import { DetailsEtapeInterimComponent } from '../../etape-interim/details-etape-interim/details-etape-interim.component';
import { InterimService } from '../../shared/services/interim.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'fury-details-interim',
  templateUrl: './details-interim.component.html',
  styleUrls: ['./details-interim.component.scss']
})
export class DetailsInterimComponent implements OnInit {

  static id = 100;
  interim: Interim;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Show icon
  showIcon = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<DetailsInterimComponent>,
    private interimService: InterimService
  ) {}

  ngOnInit(){
     // this.defaults = {} as Interim;
     this.interim = this.defaults;

   
}
}