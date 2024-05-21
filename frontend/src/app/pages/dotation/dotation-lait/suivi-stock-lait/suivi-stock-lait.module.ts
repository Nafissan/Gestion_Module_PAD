import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuiviStockLaitRoutingModule } from './suivi-stock-lait-routing.module';
import { DetailsSuiviStockLaitComponent } from './details-suivi-stock-lait/details-suivi-stock-lait.component';
import { AddOrUpdateSuiviStockLaitComponent } from './add-or-update-suivi-stock-lait/add-or-update-suivi-stock-lait.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { PageLayoutDemoContentModule } from 'src/app/pages/page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { ListSuiviStockLaitComponent } from './list-suivi-stock-lait/list-suivi-stock-lait.component';
import { SuiviCategorieStockComponent } from './suivi-categorie-stock/suivi-categorie-stock.component';


@NgModule({
  declarations: [ListSuiviStockLaitComponent, DetailsSuiviStockLaitComponent, AddOrUpdateSuiviStockLaitComponent, SuiviCategorieStockComponent],
  imports: [
    CommonModule,
    SuiviStockLaitRoutingModule,
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
export class SuiviStockLaitModule { }
