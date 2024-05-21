import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AttestationBarChartComponent } from './attestation-bar-chart/attestation-bar-chart.component';


const routes: Routes = [
  {
    path: '', component: AttestationBarChartComponent, canActivate: [AuthGuard],
  },
  {
    path: 'attestation-bar-chart', component: AttestationBarChartComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordAttestationRoutingModule { }
