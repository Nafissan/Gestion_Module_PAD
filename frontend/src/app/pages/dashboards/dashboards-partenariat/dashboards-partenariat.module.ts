import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsPartenariatRoutingModule } from './dashboards-partenariat-routing.module';
import { ConventionsComponent } from './conventions/conventions.component';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { LineChartWidgetModule } from '../../dashboard/widgets/line-chart-widget/line-chart-widget.module';
import { ChartsModule } from 'ng2-charts';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DonutChartWidgetModule } from '../../dashboard/widgets/donut-chart-widget/donut-chart-widget.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConventionsComponent],
  imports: [
    CommonModule,
    DashboardsPartenariatRoutingModule,
    FurySharedModule,
    MatTabsModule,
    LineChartWidgetModule,
    DonutChartWidgetModule,
    ChartsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class DashboardsPartenariatModule { }
