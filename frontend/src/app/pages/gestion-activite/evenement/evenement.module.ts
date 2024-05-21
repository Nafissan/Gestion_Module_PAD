import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { ScrollbarModule } from 'src/@fury/shared/scrollbar/scrollbar.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { EvenementRoutingModule } from './evenement-routing.module';
import { ListEvenementComponent } from './list-evenement/list-evenement.component';
import { AddOrUpdateEvenementComponent } from './add-or-update-evenement/add-or-update-evenement.component';
import { DetailsEvenementComponent } from './details-evenement/details-evenement.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { CalendrierEvenementComponent } from './calendrier-evenement/calendrier-evenement.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarEditComponent } from './calendrier-evenement/calendar-edit/calendar-edit.component';



export function momentAdapterFactory() {
  return adapterFactory(moment);
}






@NgModule({
  declarations: [ListEvenementComponent, AddOrUpdateEvenementComponent, DetailsEvenementComponent, CalendrierEvenementComponent, CalendarEditComponent],
  entryComponents: [CalendarEditComponent],
  imports: [
    CommonModule,
    EvenementRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    FuryCardModule,
    MatTabsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory
    }),
    PageLayoutDemoContentModule,
    MatExpansionModule,
    // Core
    ListModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
    ScrollbarModule,
    MatDatepickerModule
        
  ]
})
export class EvenementModule { }
