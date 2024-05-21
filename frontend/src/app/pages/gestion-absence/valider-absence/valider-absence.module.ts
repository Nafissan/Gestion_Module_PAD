import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValiderAbsenceRoutingModule } from './valider-absence-routing.module';
import { ListAbsenceComponent } from './list-absence/list-absence.component';
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
import { AddValiderAbsenceComponent } from './add-valider-absence/add-valider-absence.component';

@NgModule({
  declarations: [ListAbsenceComponent, AddValiderAbsenceComponent],
  imports: [
    CommonModule,
    ValiderAbsenceRoutingModule,
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
export class ValiderAbsenceModule { }
