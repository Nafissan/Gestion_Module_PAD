import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPlanningAbsenceComponent } from '../../gestion-absence/planning-absence/list-planning-absence/list-planning-absence.component';
import { AuthGuard } from '../../../shared/services/authguard.service';
import { AddPlanningAbsenceComponent } from './add-planning-absence/add-planning-absence.component';


const routes: Routes = [
  {
    path: '', component: ListPlanningAbsenceComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-planning-absence', component: ListPlanningAbsenceComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-planning-absence', component: AddPlanningAbsenceComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningAbsenceRoutingModule { }
