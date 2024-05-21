import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPlanningCongeComponent } from './list-planning-conge/list-planning-conge.component';
import { AddOrUpdatePlanningCongeComponent } from './add-or-update-planning-conge/add-or-update-planning-conge.component';
import { DetailsPlanningCongeComponent } from './details-planning-conge/details-planning-conge.component';
import { AuthGuard } from '../../../shared/services/authguard.service';


const routes: Routes = [
  {
    path: '', component: ListPlanningCongeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-planning-conge', component: ListPlanningCongeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-planning-conge', component: AddOrUpdatePlanningCongeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-planning-conge', component: DetailsPlanningCongeComponent, canActivate: [AuthGuard],
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningCongeRoutingModule { }
