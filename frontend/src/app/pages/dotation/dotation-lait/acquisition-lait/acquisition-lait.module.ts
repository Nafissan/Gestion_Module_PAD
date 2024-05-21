import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcquisitionLaitRoutingModule } from './acquisition-lait-routing.module';
import { ListAcquisitionLaitComponent } from './list-acquisition-lait/list-acquisition-lait.component';
import { AddAquisitionLaitComponent } from './add-aquisition-lait/add-aquisition-lait.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from 'src/app/pages/page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [ListAcquisitionLaitComponent, AddAquisitionLaitComponent],
  imports: [
    CommonModule,
    AcquisitionLaitRoutingModule,
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
export class AcquisitionLaitModule { }
