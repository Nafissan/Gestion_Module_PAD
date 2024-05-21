import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogUtil } from '../../util/util';

@Component({
  selector: 'fury-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
 
  dialogUtil: DialogUtil = new DialogUtil();
  annuler: string;
  confirmer: string;
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    this.annuler = DialogUtil.annuler;
    this.confirmer = DialogUtil.confirmer;
  }
  close(answer: string) {
    this.dialogRef.close(answer);
  }
}
