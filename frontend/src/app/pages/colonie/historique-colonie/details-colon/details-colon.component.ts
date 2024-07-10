import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Colon } from '../../shared/model/colon.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'fury-details-colon',
  templateUrl: './details-colon.component.html',
  styleUrls: ['./details-colon.component.scss']
})
export class DetailsColonComponent implements OnInit {
  colon:Colon;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  showIcon = true;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: Colon) { }
  photoUrl: string | null = null;
  ngOnInit(): void {
    this.colon=this.defaults; this.convertPhotoToFile(this.colon.photo);

  }
  convertPhotoToFile(base64Photo: string) {
    if (base64Photo) {
      const byteCharacters = atob(base64Photo);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });
      this.photoUrl = URL.createObjectURL(blob);
    }
  }
}
