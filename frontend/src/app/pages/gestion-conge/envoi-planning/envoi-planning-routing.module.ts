import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { ListEnvoiPlanningComponent } from './list-envoi-planning/list-envoi-planning.component';


const routes: Routes = [
  {
    path: '', component: ListEnvoiPlanningComponent, canActivate: [AuthGuard]
  },
  {
    path: 'list-envoi-planning', component: ListEnvoiPlanningComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvoiPlanningRoutingModule { }
