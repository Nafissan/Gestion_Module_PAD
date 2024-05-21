import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../../shared/services/notification.service';
import { saveAs as importedSaveAs } from "file-saver";
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Comite } from '../../shared/model/comite.model';
// import { ComiteService } from '../../shared/service/comite.service';

@Component({
  selector: 'fury-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  // comite: Comite;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
  // private comiteService: ComiteService,
  private http: HttpClient,
  private notificationService: NotificationService,
  private dialogRef: MatDialogRef<DownloadComponent>,
  private snackbar: MatSnackBar,) { }

  ngOnInit(): void {
    // this.comite = this.defaults;
    
  }

  // download(){
  //   this.comiteService.download(this.comite).subscribe((response) => {
  //     console.log("Downloads : ", response);
  //     let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });   
  //     const url = window.URL.createObjectURL(blob);
  //     importedSaveAs(blob, this.comite.pointfocals + "_" + this.comite.pointfocals + '.pdf');
  //     this.snackbar.open('Téléchargement réussie!', null, {
  //       duration: 5000
  //     });

  //   });
  //   this.dialogRef.close()

  // }

}
