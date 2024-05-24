import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SatisfactionRoutingModule } from './satisfaction-routing.module';
import { AddOrUpdateSatisfactionComponent } from './add-or-update-satisfaction/add-or-update-satisfaction.component';
import { ListeSatisfactionComponent } from './liste-satisfaction/liste-satisfaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { DetailsSatisfactionComponent } from './details-satisfaction/details-satisfaction.component';


@NgModule({
  declarations: [AddOrUpdateSatisfactionComponent, ListeSatisfactionComponent, DetailsSatisfactionComponent],
  imports: [
    CommonModule,
    SatisfactionRoutingModule,
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
export class SatisfactionModule { }
