import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeLaitRoutingModule } from './demande-lait-routing.module';
import { AddOrUpdateDemandeLaitComponent } from './add-or-update-demande-lait/add-or-update-demande-lait.component';
import { DetailsDemandeLaitComponent } from './details-demande-lait/details-demande-lait.component';
import { ListDemandeLaitComponent } from './list-demande-lait/list-demande-lait.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { PageLayoutDemoContentModule } from 'src/app/pages/page-layouts/components/page-layout-content/page-layout-demo-content.module';


@NgModule({
  declarations: [ListDemandeLaitComponent, DetailsDemandeLaitComponent, AddOrUpdateDemandeLaitComponent],
  imports: [
    CommonModule,
    DemandeLaitRoutingModule,
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
export class DemandeLaitModule { }
