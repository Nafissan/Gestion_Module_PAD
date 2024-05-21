import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { AuthenticationService } from '../../../shared/services/authentification.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { SidenavService } from '../../../layout/sidenav/sidenav.service';
import { CompteService } from '../../gestion-utilisateurs/shared/services/compte.service';
import { getMenu } from '../../../shared/util/url';

@Component({
  selector: 'fury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpAnimation]
})
export class LoginComponent implements OnInit {
  showProgressBar: boolean = false;
  form: FormGroup;
  inputType = 'password';
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
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // if(this.authentificationService.isAuthenticated()) {
    //   this.router.events.subscribe(e => {
    //     let urlDestination;
    //     if (e instanceof NavigationEnd) {
    //       urlDestination = e.url // recuperer l'url de la page de destination
    //       if (urlDestination === 'login') {
    //         // this.router.navigate([this.state.url])

    //       }
    //     }
    //   });
    // }
  }

  login() {
    this.showProgressBar = true;
    this.authentificationService.login(this.form.value)
      .subscribe(resp => {
        let jwt = resp.headers.get('Authorization')
        this.authentificationService.saveToken(jwt)
        // On récupère l'url de redirection
        let redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || 'espace-salaries-pad';
               
        // // On accède à la page souhaitée
        this.router.navigate([redirectUrl]);
      }, error => {
        this.showProgressBar = false;
        this.notificationservice.login('Verifiez vos identifiants !!! ')
      }, () => {
        this.getAgentConnecte();
      })
  }
  getAgentConnecte() {
      this.sidenavService.items = [];
      this.sidenavService.items = [];
      let menu = getMenu(this.authentificationService.roles);
      this.sidenavService.addItems(menu);
  }

  // Is used to submit form by clicked enter touch
  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.login();
    }
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
