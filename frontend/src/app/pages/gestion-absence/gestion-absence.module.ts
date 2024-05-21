import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GestionAbsenceRoutingModule } from './gestion-absence-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddPlanningAbsenceComponent } from './planning-absence/add-planning-absence/add-planning-absence.component';
import { ListPlanningAbsenceComponent } from './planning-absence/list-planning-absence/list-planning-absence.component';
import { PageLayoutDemoContentModule } from '../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ListModule } from '../../../@fury/shared/list/list.module';
import { BreadcrumbsModule } from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { AbsenceDirectionComponent } from './suivi-absence/absence-direction/absence-direction.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GestionAbsenceRoutingModule,
  ]
})
export class GestionAbsenceModule { }
