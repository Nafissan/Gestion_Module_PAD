import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SidenavService } from 'src/app/layout/sidenav/sidenav.service';
import { Agent } from 'src/app/shared/model/agent.model';
import { Mail } from 'src/app/shared/model/mail.model';
import { AgentService } from 'src/app/shared/services/agent.service';
import { AuthenticationService } from 'src/app/shared/services/authentification.service';
import { MailService } from 'src/app/shared/services/mail.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { CompteService } from '../../gestion-utilisateurs/shared/services/compte.service';

@Component({
  selector: 'fury-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUpAnimation]
})
export class ForgotPasswordComponent implements OnInit {

  form = this.fb.group({
    email: [null, Validators.required]
  });

  showProgressBar: boolean = false;
  visible = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private authentificationService: AuthenticationService,
    private route: ActivatedRoute,
    private notificationservice: NotificationService,

    private sidenavService: SidenavService,
    private compteService: CompteService,
    private agentService:AgentService,
    private mailService:MailService
  ) {
  }

  ngOnInit() {
  }

  send() {
    this.showProgressBar = true;
    let agent: Agent = this.form.value;
    this.mailService.sendMailPasswordOublie(agent)
      .subscribe(resp => {   
        this.notificationservice.login('Verifier votre Boite Mail!!! ')
        // // On accède à la page souhaitée
        this.router.navigate(['/password-oublie']);

      }, error => {
        this.showProgressBar = false;
        this.notificationservice.login('Verifier votre Boite Mail!!! ')
      }, () => {
        // this.getAgentConnecte();
      })
  }
  // getAgentConnecte() {
  //     this.sidenavService.items = [];
  //     this.sidenavService.items = [];
  //     let menu = getMenu(this.authentificationService.roles);
  //     this.sidenavService.addItems(menu);
  // }

  // Is used to submit form by clicked enter touch
  // handleKeyUp(e) {
  //   if (e.keyCode === 13) {
  //     this.login();
  //   }
  // }

  // toggleVisibility() {
  //   if (this.visible) {
  //     this.inputType = 'password';
  //     this.visible = false;
  //     this.cd.markForCheck();
  //   } else {
  //     this.inputType = 'text';
  //     this.visible = true;
  //     this.cd.markForCheck();
  //   }
  // }
}
