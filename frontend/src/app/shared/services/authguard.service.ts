import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { isNull } from 'util';
import { AuthenticationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private jwtHelper: JwtHelperService,
  ) { }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // Vérifie si l'utilisateur est connecté    
      const token = sessionStorage.getItem('token');

      const isLoggedIn = !isNull(sessionStorage.getItem('token'));
      const expired = this.jwtHelper.isTokenExpired(token);

      if (!isLoggedIn || expired) {
        console.log('Vous n\'êtes pas connectés');
        this.router.navigate(['/login'], { queryParams: { redirectUrl: state.url }});
      }
      
      const date = new Date(0)
      let jwt = this.jwtHelper.decodeToken(token);
      date.setUTCSeconds(jwt.exp)

      console.log('Date d\'expiration du token :' , date);
      
      const roles = next.data['roles'];
      let hasRoles = true;
      if (roles && this.authenticationService.isAuthenticated()) {
        
        hasRoles = this.authenticationService.hasAnyRole(Array.of(roles));
      }
      if(!hasRoles) {
        // Si l'utilisateur na pas les habilitations : deconnexion
        console.log('Vous n\'avez pas les droits');
        this.authenticationService.logOut();
        this.router.navigateByUrl("/login");
      }
      console.log('a acces ',isLoggedIn && hasRoles && !expired);
      
      return isLoggedIn && hasRoles;
    }
}
