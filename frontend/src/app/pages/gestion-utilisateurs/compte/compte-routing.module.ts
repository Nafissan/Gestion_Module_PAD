import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCompteComponent } from './list-compte/list-compte.component';
import { CreateUpdateCompteComponent } from './create-update-compte/create-update-compte.component';
import { AuthGuard } from '../../../shared/services/authguard.service';


export const routes: Routes = [
  {
    path: '', component: ListCompteComponent, canActivate: [AuthGuard], data: { 
      roles: 'MENU_COMPTE'
    } 
  },
  {
    path: 'list-compte', component: ListCompteComponent, canActivate: [AuthGuard], data: { 
      roles: 'MENU_COMPTE'
    } 
  },
  {
    path: 'create-update-compte', component: CreateUpdateCompteComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompteRoutingModule { }
