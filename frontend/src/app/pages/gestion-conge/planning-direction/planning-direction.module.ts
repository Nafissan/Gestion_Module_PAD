import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanningDirectionRoutingModule } from './planning-direction-routing.module';
import { ListPlanningDirectionComponent } from './list-planning-direction/list-planning-direction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { AddOrUpdatePlanningDirectionComponent } from './add-or-update-planning-direction/add-or-update-planning-direction.component';
import { DetailsPlanningDirectionComponent } from './details-planning-direction/details-planning-direction.component';


@NgModule({
  declarations: [ListPlanningDirectionComponent, AddOrUpdatePlanningDirectionComponent, DetailsPlanningDirectionComponent],
  imports: [
    CommonModule,
    PlanningDirectionRoutingModule,
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
export class PlanningDirectionModule { }
