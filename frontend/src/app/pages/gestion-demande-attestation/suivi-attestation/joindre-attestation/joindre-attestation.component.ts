import { Component, OnInit, Inject } from '@angular/core';
import { SuiviAttestationService } from '../../shared/services/suivi-attestation.service';
import { EtapeAttestation } from '../../shared/model/etape-attestation.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Attestation } from '../../shared/model/demande-attestation.model';
import { DemandeAttestationService } from '../../shared/services/demande-attestation.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'fury-joindre-attestation',
  templateUrl: './joindre-attestation.component.html',
  styleUrls: ['./joindre-attestation.component.scss',"../../../../shared/util/bootstrap4.css"]
})
export class JoindreAttestationComponent implements OnInit {
  loaded = 0;
  selectedFiles: FileList;
  currentFileUpload: File;
  demandeAttestation: Attestation;
  msg: any;


  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private attestationService: DemandeAttestationService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<JoindreAttestationComponent>
    
    ) { }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.attestationService.uploadAttestation(this.demandeAttestation,this.currentFileUpload)
      .subscribe(response => {        
      if (response === null ) {
        this.notificationService.warn('Le chargement a échoué ! Veuillez réessayez !')
        this.dialogRef.close();
      }else{
        this.notificationService.success("Chargement réussi avec succès !")
        this.dialogRef.close(response);
      } 
    });
 }
  ngOnInit(): void {
    this.demandeAttestation = this.defaults;
    console.log(this.demandeAttestation);
    
  }

}
