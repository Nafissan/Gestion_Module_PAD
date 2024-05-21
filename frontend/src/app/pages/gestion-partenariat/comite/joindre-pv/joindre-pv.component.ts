import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Comite } from '../../shared/model/comite.model';
import { ComiteService } from '../../shared/service/comite.service';

@Component({
  selector: 'fury-joindre-pv',
  templateUrl: './joindre-pv.component.html',
  styleUrls: ['./joindre-pv.component.scss',"../../../../shared/util/bootstrap4.css"]
})
export class JoindrePvComponent implements OnInit {
  loaded = 0;
  selectedFiles: FileList;
  currentFileUpload: File;
  comite: Comite;
  msg: any;


  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private comiteService: ComiteService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<JoindrePvComponent>
    
    ) { }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.comiteService.uploadComite(this.comite,this.currentFileUpload)
      .subscribe(response => {        
      if (response === null ) {
        this.notificationService.warn('Le chargement a échoué !')
        this.dialogRef.close();
      }else{
        this.notificationService.success("Chargement réussi avec succès !")
        this.dialogRef.close(response);
      } 
    });
 }
  ngOnInit(): void {
    this.comite = this.defaults;
    console.log(this.comite);
    
  }

}
