import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { CongeBarChartComponent } from './conge-bar-chart/conge-bar-chart.component';


const routes: Routes = [
  {
    path: '', component: CongeBarChartComponent, canActivate: [AuthGuard],
  },
  {
    path: 'conge-bar-chart', component: CongeBarChartComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordCongeRoutingModule { }
