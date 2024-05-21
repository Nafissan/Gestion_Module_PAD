import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../../shared/services/authguard.service';

import { ListZoneComponent } from './list-zone/list-zone.component';
import { AddOrUpdateZoneComponent } from './add-or-update-zone/add-or-update-zone.component';



const routes: Routes = [

  {
    path: '', component: ListZoneComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-zone', component: ListZoneComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-zone', component: AddOrUpdateZoneComponent, canActivate: [AuthGuard],
  },
  // {
  //   path: 'details-continent', component: DetailsPaysComponent, canActivate: [AuthGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoneRoutingModule { }
