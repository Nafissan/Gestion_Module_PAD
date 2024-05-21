import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';

import { DashboardLaitRoutingModule } from './dashboard-lait-routing.module';
import { DashboardLaitComponent } from './dashboard-lait/dashboard-lait.component';
import { ChartModule } from 'angular2-chartjs';
import { BarChartWidgetModule } from 'src/app/pages/dashboard/widgets/bar-chart-widget/bar-chart-widget.module';
import { LineChartWidgetModule } from 'src/app/pages/dashboard/widgets/line-chart-widget/line-chart-widget.module';
import { DonutChartWidgetModule } from 'src/app/pages/dashboard/widgets/donut-chart-widget/donut-chart-widget.module';
import { SalesSummaryWidgetModule } from 'src/app/pages/dashboard/widgets/sales-summary-widget/sales-summary-widget.module';
import { AudienceOverviewWidgetModule } from 'src/app/pages/dashboard/widgets/audience-overview-widget/audience-overview-widget.module';
import { RealtimeUsersWidgetModule } from 'src/app/pages/dashboard/widgets/realtime-users-widget/realtime-users-widget.module';
import { QuickInfoWidgetModule } from 'src/app/pages/dashboard/widgets/quick-info-widget/quick-info-widget.module';
import { RecentSalesWidgetModule } from 'src/app/pages/dashboard/widgets/recent-sales-widget/recent-sales-widget.module';
import { AdvancedPieChartWidgetModule } from 'src/app/pages/dashboard/widgets/advanced-pie-chart-widget/advanced-pie-chart-widget.module';
import { MapsWidgetModule } from 'src/app/pages/dashboard/widgets/maps-widget/maps-widget.module';
import { MarketWidgetModule } from 'src/app/pages/dashboard/widgets/market-widget/market-widget.module';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageLayoutDemoContentModule } from 'src/app/pages/page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { MatTableExporterModule } from 'mat-table-exporter';


@NgModule({
  declarations: [DashboardLaitComponent],
  imports: [
    CommonModule,
    DashboardLaitRoutingModule,
    
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
    FurySharedModule,
    ChartModule,
    FuryCardModule,
    // Widgets
    BarChartWidgetModule,
    LineChartWidgetModule,
    DonutChartWidgetModule,
    SalesSummaryWidgetModule,
    AudienceOverviewWidgetModule,
    RealtimeUsersWidgetModule,
    QuickInfoWidgetModule,
    RecentSalesWidgetModule,
    AdvancedPieChartWidgetModule,
    MapsWidgetModule,
    MarketWidgetModule,
    ChartsModule,

    //Table
    MatTabsModule,
    PageLayoutDemoContentModule,
    MatExpansionModule,
    // Core
    ListModule,
    BreadcrumbsModule,

    //export table
    MatTableExporterModule
  ]
})
export class DashboardLaitModule { }
