import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PelerinPelerinageRoutingModule } from './pelerin-pelerinage-routing.module';
import { ListPelerinPelerinageComponent } from './list-pelerin-pelerinage/list-pelerin-pelerinage.component';
import { DetailsPelerinPelerinageComponent } from './details-pelerin-pelerinage/details-pelerin-pelerinage.component';
import { ReadFilePelerinPelerinageComponent } from './read-file-pelerin-pelerinage/read-file-pelerin-pelerinage.component';
import { AddOrUpdatePelerinPelerinageComponent } from './add-or-update-pelerin-pelerinage/add-or-update-pelerin-pelerinage.component';
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
  declarations: [ListPelerinPelerinageComponent, DetailsPelerinPelerinageComponent, ReadFilePelerinPelerinageComponent, AddOrUpdatePelerinPelerinageComponent],
  imports: [
    CommonModule, FormsModule,
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
    PelerinPelerinageRoutingModule
  ]
})
export class PelerinPelerinageModule { }
