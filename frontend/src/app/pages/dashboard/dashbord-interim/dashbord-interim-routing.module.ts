import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { InterimBarChartComponent } from './interim-bar-chart/interim-bar-chart.component';


const routes: Routes = [
  {
    path: '', component: InterimBarChartComponent, canActivate: [AuthGuard],
  },
  {
    path: 'interim-bar-chart', component: InterimBarChartComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordInterimRoutingModule { }
