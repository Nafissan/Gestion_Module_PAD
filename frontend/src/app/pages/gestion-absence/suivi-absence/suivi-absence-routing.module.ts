import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbsenceDirectionComponent } from './absence-direction/absence-direction.component';
import { AuthGuard } from '../../../shared/services/authguard.service';


const routes: Routes = [
  {
    path: '', component: AbsenceDirectionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'absence-direction', component: AbsenceDirectionComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuiviAbsenceRoutingModule { }
