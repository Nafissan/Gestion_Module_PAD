import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListValiderPlanningComponent } from './list-valider-planning/list-valider-planning.component';
import { AuthGuard } from '../../../shared/services/authguard.service';


const routes: Routes = [
  {
    path: '', component: ListValiderPlanningComponent, canActivate: [AuthGuard]
  },
  {
    path: 'list-valider-planning', component: ListValiderPlanningComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValiderPlanningRoutingModule { }
