import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../../@fury/shared/scrollbar/scrollbar.module';
import { CalendarEditComponent } from './calendar-edit/calendar-edit.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory
    }),
    ScrollbarModule
  ],
  declarations: [CalendarComponent, CalendarEditComponent],
  entryComponents: [CalendarEditComponent]
})
export class CalendarAppModule {
}
