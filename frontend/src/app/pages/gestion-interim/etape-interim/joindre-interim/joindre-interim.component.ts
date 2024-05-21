import { Component, OnInit, Inject } from '@angular/core';
import { InterimService } from '../../shared/services/interim.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Interim } from '../../shared/model/interim.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../../shared/services/notification.service';
import { NotificationUtil } from '../../../../shared/util/util';
import { MailService } from '../../../../shared/services/mail.service';

@Component({
  selector: 'fury-joindre-interim',
  templateUrl: './joindre-interim.component.html',
  styleUrls: ['./joindre-interim.component.scss',"../../../../shared/util/bootstrap4.css"]
})
export class JoindreInterimComponent implements OnInit {

  loaded = 0;
  selectedFiles: FileList;
  currentFileUpload: File;
  interim: Interim;
  msg: any;

  subject = "Demande D'intérim"
  commentaire = "Votre Demande est disponible"
  contenu
 


  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private interimService: InterimService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<JoindreInterimComponent>,
    private mailService:MailService
    ) { }
    ngOnInit(): void {
      this.interim = this.defaults;

      this.contenu=
      '\n' +   this.interim.agentArrive.prenom + ' ' +   this.interim.agentArrive.nom , ' matricule de solde ', this.interim.agentArrive.matricule, ', ', '.. .. .., qui a assuré \n',
      'l\'intérim de ' + this.interim.agentDepart.prenom + ' ' + this.interim.agentArrive.nom , ', matricule de solde ',this.interim.agentDepart.matricule, ', percevra \n',
       'une indemnité égale à la différence entre son salaire et celui du titulaire au \n',
        'poste pour la période allant du ',this.interim.dateDepart+' au ',+{text: this.interim.dateRetour + ' inclus.', bold: true}    
    }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.interimService.uploadInterim(this.interim,this.currentFileUpload)
      .subscribe(response => {
        
      if (response === null ) {
        this.notificationService.warn('Le chargement a échoué ! Veuillez réessayez !')
        this.dialogRef.close();
      }else{
        this.notificationService.success("Chargement réussi avec succès !")
        this.dialogRef.close(this.interim);
        this.sendMail(this.subject,this.commentaire,this.contenu,1)
      }
    });
 }

 
 sendMail(subject:string,commentaire:string,contenu:string,idAgent:number){

  // this.mailService.sendMailByAgent(subject,commentaire,contenu,idAgent).subscribe(
  //   response => { 
  //  //  this.notificationService.success(NotificationUtil.ajout)
   
  //    this.dialogRef.close(response.body);
  //   }
// )
}
 

}