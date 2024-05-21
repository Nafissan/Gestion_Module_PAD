
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { NotificationEntity } from '../../shared/model/notification.model';

@Component({
  selector: 'fury-details-notification',
  templateUrl: './details-notification.component.html',
  styleUrls: ['./details-notification.component.scss', '../../../../shared/util/bootstrap4.css']
})
export class DetailsNotificationComponent implements OnInit {
  notification: NotificationEntity;
  showIcon = true;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: NotificationEntity,
    private dialogRef: MatDialogRef<DetailsNotificationComponent>,

  ) { }

  ngOnInit(): void {
    this.notification = this.defaults;
  }

}



