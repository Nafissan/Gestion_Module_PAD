import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordAbsenceRoutingModule } from './dashbord-absence-routing.module';
import { AbsenceBarChartComponent } from './absence-bar-chart/absence-bar-chart.component';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { ChartModule } from 'angular2-chartjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AbsenceBarChartComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DashbordAbsenceRoutingModule,
    MaterialModule,
    FurySharedModule,
    ChartModule,
    ChartsModule
  ]
})
export class DashbordAbsenceModule { }
