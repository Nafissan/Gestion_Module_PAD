import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidenavItem } from './sidenav-item/sidenav-item.interface';
import { SidenavService } from './sidenav.service';
import { ThemeService } from '../../../@fury/services/theme.service';
import { AuthenticationService } from '../../shared/services/authentification.service';
import { Compte } from '../../pages/gestion-utilisateurs/shared/model/compte.model';
import { CompteService } from '../../pages/gestion-utilisateurs/shared/services/compte.service';

@Component({
  selector: 'fury-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  sidenavUserVisible$ = this.themeService.config$.pipe(map(config => config.sidenavUserVisible));

  @Input()
  @HostBinding('class.collapsed')
  collapsed: boolean;

  @Input()
  @HostBinding('class.expanded')
  expanded: boolean;

  items$: Observable<SidenavItem[]>;
  username: string;
  email: string
  compte: Compte;
  utilisateur: string // prenom et nom de l'utilisateur qui s'est connecté

  constructor(private router: Router,
              private sidenavService: SidenavService,
              private themeService: ThemeService,
              private authentificationService: AuthenticationService,
              private compteService: CompteService) {
  }

  ngOnInit() {
    this.items$ = this.sidenavService.items$.pipe(
      map((items: SidenavItem[]) => this.sidenavService.sortRecursive(items, 'position'))
    );
    this.username = this.authentificationService.getUsername();   
    this.getCompteByUsername(this.username)
  }
  logOut(){
    console.log('logout');
    this.authentificationService.logOut()
    this.router.navigateByUrl("/login");
  }

  toggleCollapsed() {
    this.sidenavService.toggleCollapsed();
  }

  @HostListener('mouseenter')
  @HostListener('touchenter')
  onMouseEnter() {
    this.sidenavService.setExpanded(true);
  }

  @HostListener('mouseleave')
  @HostListener('touchleave')
  onMouseLeave() {
    this.sidenavService.setExpanded(false);
  }

  getCompteByUsername(username){
    this.compteService.getByUsername(username).subscribe(
      response => {
        this.compte = response.body;
      },err => {},
      () => {
        this.email = this.compte.agent.email;
        this.utilisateur = this.compte.agent.prenom + ' ' + this.compte.agent.nom;
      }
    )
  }

  ngOnDestroy() {
  }
}
