import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../shared/services/authguard.service';
import {ListPlanProspectionComponent} from './list-plan-prospection/list-plan-prospection.component'
import {AddOrUpdatePlanProspectionComponent} from './add-or-update-plan-prospection/add-or-update-plan-prospection.component'
import {DetailsPlanProspectionComponent} from './details-plan-prospection/details-plan-prospection.component'
import { ListBesoinComponent } from './suivi-plan-prospection/list-besoin/list-besoin.component';
import { ListProspectComponent } from './suivi-prospect/list-prospect/list-prospect.component';

const routes: Routes = [
  {
    path: '', component: ListPlanProspectionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-plan-prospection', component: ListPlanProspectionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'plan-prospection/:id', component: ListBesoinComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-plan-prospection', component: AddOrUpdatePlanProspectionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-plan-prospection', component: DetailsPlanProspectionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'suivi-prospect/:id', component: ListProspectComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanProspectionRoutingModule { }
