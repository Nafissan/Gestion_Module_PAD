import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UniteOrganisationnelle } from '../../../../shared/model/unite-organisationelle';
import { MatAccordion } from '@angular/material/expansion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddUniteOrganisationnelleComponent } from '../add-unite-organisationnelle/add-unite-organisationnelle.component';

@Component({
  selector: 'fury-details-unite-organisationnelle',
  templateUrl: './details-unite-organisationnelle.component.html',
  styleUrls: ['./details-unite-organisationnelle.component.scss']
})
export class DetailsUniteOrganisationnelleComponent implements OnInit {
  uniteOrganisationnelle: UniteOrganisationnelle;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  //Show icon
  showIcon = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddUniteOrganisationnelleComponent>,
  ) { }

  ngOnInit(){
    this.uniteOrganisationnelle = this.defaults;
  }

}
