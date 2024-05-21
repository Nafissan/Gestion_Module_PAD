import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbsenceRoutingModule } from './absence-routing.module';
import { AddAbsenceComponent } from './add-absence/add-absence.component';
import { ListAbsenceComponent } from './list-absence/list-absence.component';
import { DetailsAbsenceComponent } from './details-absence/details-absence.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ValidationAbsenceComponent } from './validation-absence/validation-absence.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CloseAbsenceComponent } from './close-absence/close-absence.component';
import { MotifRejetAbsenceComponent } from './motif-rejet-absence/motif-rejet-absence.component';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from '@angular/material/core';
import { momentAdapterFactory } from '../../gestion-conge/conge/conge.module';
import { ScrollbarModule } from '../../../../@fury/shared/scrollbar/scrollbar.module';



@NgModule({
  declarations: [AddAbsenceComponent, ListAbsenceComponent, DetailsAbsenceComponent, ValidationAbsenceComponent, CloseAbsenceComponent, MotifRejetAbsenceComponent],
  imports: [
    CommonModule,
    AbsenceRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    MatExpansionModule,
    FuryCardModule,
    MatTabsModule,
    PageLayoutDemoContentModule,
    MatExpansionModule,
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: momentAdapterFactory
    // }),
    ScrollbarModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
  ],
  exports:[
    ListAbsenceComponent

  ]
})
export class AbsenceModule {
  
 }
