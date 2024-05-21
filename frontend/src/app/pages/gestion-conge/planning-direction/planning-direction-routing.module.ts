import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPlanningDirectionComponent } from './list-planning-direction/list-planning-direction.component';
import { AuthGuard } from '../../../shared/services/authguard.service';


const routes: Routes = [
  {
    path: '', component: ListPlanningDirectionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-planning-direction', component: ListPlanningDirectionComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningDirectionRoutingModule { }
