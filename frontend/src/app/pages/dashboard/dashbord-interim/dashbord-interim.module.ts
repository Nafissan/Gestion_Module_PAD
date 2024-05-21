import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordInterimRoutingModule } from './dashbord-interim-routing.module';
import { InterimBarChartComponent } from './interim-bar-chart/interim-bar-chart.component';
import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular2-chartjs';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [InterimBarChartComponent],
  imports: [
    CommonModule,
    DashbordInterimRoutingModule,
    MaterialModule,
    FurySharedModule,
    ChartModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashbordInterimModule { }
