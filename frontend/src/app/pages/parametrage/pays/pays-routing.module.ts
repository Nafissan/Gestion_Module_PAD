import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../../shared/services/authguard.service';

import { ListPaysComponent } from './list-pays/list-pays.component';
import { AddOrUpdatePaysComponent } from './add-or-update-pays/add-or-update-pays.component';
import { DetailsPaysComponent } from './details-pays/details-pays.component';


export const routes: Routes = [
  {
    path: '', component: ListPaysComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-pays', component: ListPaysComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-continent', component: AddOrUpdatePaysComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-continent', component: DetailsPaysComponent, canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaysRoutingModule { }

