import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRoleComponent } from './list-role/list-role.component';
import { CreateUpdateRoleComponent } from './create-update-role/create-update-role.component';
import { AuthGuard } from '../../../shared/services/authguard.service';


export const routes: Routes = [
  {
    path: '', component: ListRoleComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-role', component: ListRoleComponent, canActivate: [AuthGuard],
  },
  {
    path: 'create-update-role', component: CreateUpdateRoleComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
