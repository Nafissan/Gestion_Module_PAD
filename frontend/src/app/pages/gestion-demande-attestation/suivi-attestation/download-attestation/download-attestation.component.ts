import { Component, OnInit, Inject } from '@angular/core';
import { Attestation } from '../../shared/model/demande-attestation.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DemandeAttestationService } from '../../shared/services/demande-attestation.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../../shared/services/notification.service';
import { saveAs as importedSaveAs } from "file-saver";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'fury-download-attestation',
  templateUrl: './download-attestation.component.html',
  styleUrls: ['./download-attestation.component.scss']
})
export class DownloadAttestationComponent implements OnInit {
  demandeAttestation: Attestation;
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
  private attestationService: DemandeAttestationService,
  private http: HttpClient,
  private notificationService: NotificationService,
  private dialogRef: MatDialogRef<DownloadAttestationComponent>,
  private snackbar: MatSnackBar,) { }

  ngOnInit(): void {
    this.demandeAttestation = this.defaults;
    
  }

  download(){
    this.attestationService.downloadAttestation(this.demandeAttestation).subscribe((response) => {
      console.log("Downloads : ", response);
      let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });   
      const url = window.URL.createObjectURL(blob);
      importedSaveAs(blob, this.demandeAttestation.agent.prenom + "_" + this.demandeAttestation.agent.nom + '.pdf');
      this.snackbar.open('Téléchargement réussie!', null, {
        duration: 5000
      });

    });
    this.dialogRef.close()

  }

}
