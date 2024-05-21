import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompteService } from '../../gestion-utilisateurs/shared/services/compte.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../../shared/services/authentification.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { DialogConfirmationService } from '../../../shared/services/dialog-confirmation.service';
import { DialogUtil } from '../../../shared/util/util';

@Component({
  selector: 'fury-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInUpAnimation]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  inputType = 'password';
  visible = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private compteService: CompteService,
    private notificationService: NotificationService,
    private authentificationService: AuthenticationService,
    private dialogConfirmationService: DialogConfirmationService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    }, { validator: PasswordValidation.MatchPassword });
  }
  logOut(){
    this.authentificationService.logOut()
    this.router.navigateByUrl("/login");
  }
  send() {
    this.dialogConfirmationService.confirmationDialog().subscribe(action => {
      if (action === DialogUtil.confirmer) {
      this.compteService.updateWithNewPassword(
        this.defaults, this.form.value.oldPassword, this.form.value.newPassword).subscribe(
          response => {
            this.dialogRef.close();    
            this.logOut();
          },(error:HttpErrorResponse) => {
            if(error.status === 404 && error.error.message === 'l\'ancien mot de passe ne correspond pas') {
              this.notificationService.warn('L\'ancien mot de passe ne correspond pas !!!')
            }
          }) 
      } else {
        this.dialogRef.close();
      }
    });
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