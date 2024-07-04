import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardColonieComponent } from './dashboard-colonie/dashboard-colonie.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { DetailsSatisfactionComponent } from './details-satisfaction/details-satisfaction.component';


const routes: Routes = [
  {
    path: '', component: DashboardColonieComponent, canActivate: [AuthGuard],
  }, {
    path: 'details-satisfaction', component: DetailsSatisfactionComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableauStatistiqueRoutingModule { }
