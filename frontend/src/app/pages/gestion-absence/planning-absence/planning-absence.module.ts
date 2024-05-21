import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsPlanningAbsenceComponent } from './details-planning-absence/details-planning-absence.component';
import { PlanningAbsenceRoutingModule } from './planning-absence-routing.module';
import { ListPlanningAbsenceComponent } from './list-planning-absence/list-planning-absence.component';
import { AddPlanningAbsenceComponent } from './add-planning-absence/add-planning-absence.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';

@NgModule({
  declarations: [DetailsPlanningAbsenceComponent,
    ListPlanningAbsenceComponent,
    AddPlanningAbsenceComponent],
  imports: [
    CommonModule,
    PlanningAbsenceRoutingModule,
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
export class PlanningAbsenceModule { }
