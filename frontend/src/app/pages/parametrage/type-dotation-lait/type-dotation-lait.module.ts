import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeDotationLaitRoutingModule } from './type-dotation-lait-routing.module';
import { ListTypeDotationLaitComponent } from './list-type-dotation-lait/list-type-dotation-lait.component';
import { DetailsTypeDotationLaitComponent } from './details-type-dotation-lait/details-type-dotation-lait.component';
import { AddOrUpdateTypeDotationLaitComponent } from './add-or-update-type-dotation-lait/add-or-update-type-dotation-lait.component';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListTypeDotationLaitComponent, DetailsTypeDotationLaitComponent, AddOrUpdateTypeDotationLaitComponent],
  imports: [
    CommonModule,
    TypeDotationLaitRoutingModule,
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
export class TypeDotationLaitModule { }
