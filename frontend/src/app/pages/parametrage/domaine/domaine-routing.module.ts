import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../../shared/services/authguard.service';

import { ListDomaineComponent } from './list-domaine/list-domaine.component';
import { AddOrUpdateDomaineComponent } from './add-or-update-domaine/add-or-update-domaine.component';
import { DetailsDomaineComponent } from './details-domaine/details-domaine.component';


export const routes: Routes = [
  {
    path: '', component: ListDomaineComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-domaine', component: ListDomaineComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-domaine', component: AddOrUpdateDomaineComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-domaine', component: DetailsDomaineComponent, canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomaineRoutingModule { }

