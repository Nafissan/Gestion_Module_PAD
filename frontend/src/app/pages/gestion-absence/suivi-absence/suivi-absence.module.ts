import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuiviAbsenceRoutingModule } from './suivi-absence-routing.module';
import { AbsenceDirectionComponent } from './absence-direction/absence-direction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from '@angular/material/core';
import { momentAdapterFactory } from '../../gestion-conge/conge/conge.module';
import { ScrollbarModule } from '../../../../@fury/shared/scrollbar/scrollbar.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListAbsenceComponent } from './list-absence/list-absence.component';



@NgModule({
  declarations: [AbsenceDirectionComponent, ListAbsenceComponent],
  imports: [
    CommonModule,
    SuiviAbsenceRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    FuryCardModule,
    MatTabsModule,
    PageLayoutDemoContentModule,
    MatExpansionModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory
    }),
    ScrollbarModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
  ]
})
export class SuiviAbsenceModule { }
