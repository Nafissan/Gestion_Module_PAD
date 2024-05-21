import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockLaitRoutingModule } from './stock-lait-routing.module';
import { ListStockLaitComponent } from './list-stock-lait/list-stock-lait.component';
import { DetailsStockLaitComponent } from './details-stock-lait/details-stock-lait.component';
import { AddOrUpdateStockLaitComponent } from './add-or-update-stock-lait/add-or-update-stock-lait.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { PageLayoutDemoContentModule } from 'src/app/pages/page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatBadgeModule } from '@angular/material/badge';
import { CorrectionStockComponent } from './correction-stock/correction-stock.component';

@NgModule({
  declarations: [ListStockLaitComponent, DetailsStockLaitComponent, AddOrUpdateStockLaitComponent, CorrectionStockComponent],
  imports: [
    CommonModule,
    StockLaitRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    FuryCardModule,
    MatTabsModule,
    PageLayoutDemoContentModule,
    MatExpansionModule,
    // Core
    ListModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
  ]
})
export class StockLaitModule { }
