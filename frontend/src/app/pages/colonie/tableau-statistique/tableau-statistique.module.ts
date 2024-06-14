import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauStatistiqueRoutingModule } from './tableau-statistique-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { DashboardColonieComponent } from './dashboard-colonie/dashboard-colonie.component';
import { ChartModule } from 'angular2-chartjs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ChartsModule } from 'ng2-charts';
import { AdvancedPieChartWidgetModule } from '../../dashboard/widgets/advanced-pie-chart-widget/advanced-pie-chart-widget.module';
import { AudienceOverviewWidgetModule } from '../../dashboard/widgets/audience-overview-widget/audience-overview-widget.module';
import { BarChartWidgetModule } from '../../dashboard/widgets/bar-chart-widget/bar-chart-widget.module';
import { DonutChartWidgetModule } from '../../dashboard/widgets/donut-chart-widget/donut-chart-widget.module';
import { LineChartWidgetModule } from '../../dashboard/widgets/line-chart-widget/line-chart-widget.module';
import { MapsWidgetModule } from '../../dashboard/widgets/maps-widget/maps-widget.module';
import { MarketWidgetModule } from '../../dashboard/widgets/market-widget/market-widget.module';
import { QuickInfoWidgetModule } from '../../dashboard/widgets/quick-info-widget/quick-info-widget.module';
import { RealtimeUsersWidgetModule } from '../../dashboard/widgets/realtime-users-widget/realtime-users-widget.module';
import { RecentSalesWidgetModule } from '../../dashboard/widgets/recent-sales-widget/recent-sales-widget.module';
import { SalesSummaryWidgetModule } from '../../dashboard/widgets/sales-summary-widget/sales-summary-widget.module';


@NgModule({
  declarations: [DashboardColonieComponent],
  imports: [
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
    MatTableExporterModule,
    TableauStatistiqueRoutingModule
  ]
})
export class TableauStatistiqueModule { }
