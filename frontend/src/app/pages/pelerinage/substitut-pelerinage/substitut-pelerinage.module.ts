import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubstitutPelerinageRoutingModule } from './substitut-pelerinage-routing.module';
import { DetailSubstitutPelerinageComponent } from './detail-substitut-pelerinage/detail-substitut-pelerinage.component';
import { ListSubstitutPelerinageComponent } from './list-substitut-pelerinage/list-substitut-pelerinage.component';
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
  declarations: [DetailSubstitutPelerinageComponent, ListSubstitutPelerinageComponent],
  imports: [
    CommonModule,FormsModule,
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
    SubstitutPelerinageRoutingModule
  ]
})
export class SubstitutPelerinageModule { }
