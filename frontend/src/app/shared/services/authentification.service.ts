import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router, ActivatedRoute } from '@angular/router';
import { CompteService } from '../../pages/gestion-utilisateurs/shared/services/compte.service';
import { Compte } from '../../pages/gestion-utilisateurs/shared/model/compte.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  host:string = "/pss-backend/login"
  jwt:string
  username:string
  roles:Array<string>
  constructor(private http:HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private compteService: CompteService){
  }
  
  login(data){
    return this.http.post(this.host, data,{observe:'response'})
  }
  
  hasAnyRole(roles: string[]) {    
    for (const role of this.roles) {
      if (roles.includes(role)) {
        return true;
      }
    }
    return false;
  }

  saveToken(jwt: string) {
    sessionStorage.setItem('token',jwt);
    this.jwt=jwt;
    this.parseJWT();
  }

  parseJWT() {
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    if(objJWT){
      this.username = objJWT.sub;
      this.roles = objJWT.roles;      
    }
  }
  getUsername(){
    this.loadToken();
    return this.username
  }
  isAuthenticated(){
    this.loadToken();
    return this.roles && this.hasAnyRole(this.roles);
  }

  loadToken() {
    this.jwt = sessionStorage.getItem('token');
    this.parseJWT()
  }

  logOut() {
    sessionStorage.removeItem('token')
    this.initParams()
  }
  initParams(){
    this.jwt=undefined
    this.username=undefined
    this.roles=undefined
  }
}
