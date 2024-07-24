import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SatisfactionPelerinageRoutingModule } from './satisfaction-pelerinage-routing.module';
import { AddOrUpdateSatisfactionPelerinageComponent } from './add-or-update-satisfaction-pelerinage/add-or-update-satisfaction-pelerinage.component';
import { ListSatisfactionPelerinageComponent } from './list-satisfaction-pelerinage/list-satisfaction-pelerinage.component';
import { DetailsSatisfactionPelerinageComponent } from './details-satisfaction-pelerinage/details-satisfaction-pelerinage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';


@NgModule({
  declarations: [AddOrUpdateSatisfactionPelerinageComponent, ListSatisfactionPelerinageComponent, DetailsSatisfactionPelerinageComponent],
  imports: [
    CommonModule,
    SatisfactionPelerinageRoutingModule,
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
    ReactiveFormsModule
  ]
})
export class SatisfactionPelerinageModule { }
