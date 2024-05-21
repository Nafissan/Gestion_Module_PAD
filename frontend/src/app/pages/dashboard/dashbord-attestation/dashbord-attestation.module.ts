import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordAttestationRoutingModule } from './dashbord-attestation-routing.module';
import { AttestationBarChartComponent } from './attestation-bar-chart/attestation-bar-chart.component';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { ChartModule } from 'angular2-chartjs';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [AttestationBarChartComponent],
  imports: [
    CommonModule,
    DashbordAttestationRoutingModule,
    MaterialModule,
    FurySharedModule,
    ChartModule,
    ChartsModule
  ]
})
export class DashbordAttestationModule { }
