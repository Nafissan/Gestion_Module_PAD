import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../../../shared/services/notification.service';
import { MembreService } from '../../shared/service/membre.service';
import { Membre } from '../../shared/model/membre.model';

@Component({
  selector: 'fury-joindre-photo',
  templateUrl: './joindre-photo.component.html',
  styleUrls: ['./joindre-photo.component.scss',"../../../../shared/util/bootstrap4.css"]
})
export class JoindrePhotoComponent implements OnInit {
  loaded = 0;
  selectedFiles: FileList;
  currentFileUpload: File;
  membre: Membre;
  msg: any;


  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
  
    private membreService: MembreService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<JoindrePhotoComponent>
    
    ) { }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.membreService.uploadMembre(this.membre,this.currentFileUpload)
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
    this.membre = this.defaults;
    console.log(this.membre);
    
  }

}
