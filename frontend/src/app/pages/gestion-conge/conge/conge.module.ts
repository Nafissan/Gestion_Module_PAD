import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CongeRoutingModule } from './conge-routing.module';
import { AddOrUpdateCongeComponent } from './add-or-update-conge/add-or-update-conge.component';
import { ListCongeComponent } from './list-conge/list-conge.component';
import { DetailsCongeComponent } from './details-conge/details-conge.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { ScrollbarModule } from '../../../../@fury/shared/scrollbar/scrollbar.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ImportCongeComponent } from './import-conge/import-conge.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}


@NgModule({
  declarations: [AddOrUpdateCongeComponent, ListCongeComponent, DetailsCongeComponent, ImportCongeComponent],
  imports: [
    CommonModule,
    CongeRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    FuryCardModule,
    MatTabsModule,
    PageLayoutDemoContentModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory
    }),
    ScrollbarModule,
    MatTableExporterModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
  ]
})
export class CongeModule { }
