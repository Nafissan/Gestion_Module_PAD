import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { DashboardLaitComponent } from './dashboard-lait/dashboard-lait.component';


const routes: Routes = [
  {
    path: '', component: DashboardLaitComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardLaitRoutingModule { }
