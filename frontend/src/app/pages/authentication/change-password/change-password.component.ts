import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompteService } from '../../gestion-utilisateurs/shared/services/compte.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../../shared/services/authentification.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { DialogConfirmationService } from '../../../shared/services/dialog-confirmation.service';
import { DialogUtil } from '../../../shared/util/util';
import { ChartComponent } from 'angular2-chartjs';
import { ChangePasswordModule } from './change-password.module';
import { Compte } from '../../gestion-utilisateurs/shared/model/compte.model';

@Component({
  selector: 'fury-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  animations: [fadeInUpAnimation]
})
export class ChangePasswordComponent implements OnInit {
  
  
  form: FormGroup;
  inputType = 'password';
  visible = false;
  idCompte:any;
  token:any;
  compte:any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private compteService: CompteService,
    private notificationService: NotificationService,
    private authentificationService: AuthenticationService,
    private dialogConfirmationService: DialogConfirmationService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      newPassword: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    }, { validator: PasswordValidation.MatchPassword });
    
       //Recupère contenant l'id du PlanningDirectione selectionné
       this.route.paramMap.subscribe((params) => {
        this.idCompte = parseInt(params.get("id"));
        this.token = params.get("token");
      });
      this.getCompteById();
  }
  logOut(){
    this.authentificationService.logOut()
    this.router.navigateByUrl("/login");
  }
   send() {
     this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      this.compteService.updateWithNewPasswordForgot(
        this.compte, this.token, this.form.value.newPassword).subscribe(
          response => {
            this.notificationService.login('Votre mot de passe a été réinitialisé)')
            this.logOut();
          },(error:HttpErrorResponse) => {
          
              this.notificationService.warn('Erreur Serveur,Veuillez contacter l\'administrateur !!!')
            
          }) 
        });
   }

   getCompteById(){
    // this.dialogConfirmationService.confirmationDialog().subscribe(action => {
   
      this.compteService.getById(this.idCompte).subscribe(
          response => {
             this.compte = response
            //this.logOut();
          },(error:HttpErrorResponse) => {
            if(error.status === 404 && error.error.message === 'l\'ancien mot de passe ne correspond pas') {
              this.notificationService.warn('L\'ancien mot de passe ne correspond pas !!!')
            }
          }) 
  
    // });
   }
  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let newPassword = AC.get('newPassword').value;
    if (AC.get('passwordConfirm').touched || AC.get('passwordConfirm').dirty) {
      let verifyPassword = AC.get('passwordConfirm').value;

      if (newPassword != verifyPassword) {
        AC.get('passwordConfirm').setErrors({ MatchPassword: true })
      } else {
        return null
      }
    }
  }

}
