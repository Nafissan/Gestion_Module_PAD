import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentification.service';
import { Router } from '@angular/router';
import { CompteService } from '../../../pages/gestion-utilisateurs/shared/services/compte.service';
import { Compte } from '../../../pages/gestion-utilisateurs/shared/model/compte.model';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../../pages/authentication/register/register.component';

@Component({
  selector: 'fury-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent implements OnInit {

  isOpen: boolean;
  compte: Compte;
  username: string;

  constructor(private authentificationService: AuthenticationService,
              private router: Router,
              private compteService: CompteService,        
              private dialog: MatDialog) { }

  ngOnInit() {
    this.username = this.authentificationService.getUsername();   
    this.getCompteByUsername(this.username)
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }
  logOut(){
    this.authentificationService.logOut()
    this.router.navigateByUrl("/login");
  }
  changePassword(){
    this.dialog
      .open(RegisterComponent,{
        data: this.compte 
      })
      .afterClosed()
      .subscribe((compte: any) => {

      });
  }
  getCompteByUsername(username){
    this.compteService.getByUsername(username).subscribe(
      response => {
        this.compte = response.body;
        
      }
    )
  }
}
