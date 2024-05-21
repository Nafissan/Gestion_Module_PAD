import { enableProdMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordAccueilRoutingModule } from './dashbord-accueil-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { ChartModule } from 'angular2-chartjs';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { HttpClientModule } from '@angular/common/http';
// import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    // WjChartModule,
    CommonModule,
    DashbordAccueilRoutingModule,
    MaterialModule,
    FurySharedModule,
    FuryCardModule,
    ChartModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ]
})
export class DashbordAccueilModule { }
