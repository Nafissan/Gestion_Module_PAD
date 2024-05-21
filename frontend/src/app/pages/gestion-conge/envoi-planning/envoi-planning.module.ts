import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvoiPlanningRoutingModule } from './envoi-planning-routing.module';
import { ListEnvoiPlanningComponent } from './list-envoi-planning/list-envoi-planning.component';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListEnvoiPlanningComponent],
  imports: [
    CommonModule,
    EnvoiPlanningRoutingModule,
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
export class EnvoiPlanningModule { }
