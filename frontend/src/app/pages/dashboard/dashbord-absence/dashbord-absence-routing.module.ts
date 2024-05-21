import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AbsenceBarChartComponent } from './absence-bar-chart/absence-bar-chart.component';


const routes: Routes = [
  {
    path: '', component: AbsenceBarChartComponent, canActivate: [AuthGuard], 
  },
  {
    path: 'absence-bar-chart', component: AbsenceBarChartComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordAbsenceRoutingModule { }
