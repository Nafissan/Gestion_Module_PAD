import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashbordStatistiquePelerinageComponent } from './dashbord-statistique-pelerinage/dashbord-statistique-pelerinage.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { DetailSatisfactionStatistiquePelerinageComponent } from './detail-satisfaction-statistique-pelerinage/detail-satisfaction-statistique-pelerinage.component';


const routes: Routes = [
  {
    path: '', component: DashbordStatistiquePelerinageComponent, canActivate: [AuthGuard],
  }, {
    path: 'details-satisfaction-pelerinage', component: DetailSatisfactionStatistiquePelerinageComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatistiquePelerinageRoutingModule { }
