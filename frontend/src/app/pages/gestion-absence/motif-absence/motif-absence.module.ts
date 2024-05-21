import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotifAbsenceRoutingModule } from './motif-absence-routing.module';
import { AddMotifAbsenceComponent } from './add-motif-absence/add-motif-absence.component';
import { ListMotifAbsenceComponent } from './list-motif-absence/list-motif-absence.component';
import { DetailsMotifAbsenceComponent } from './details-motif-absence/details-motif-absence.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [AddMotifAbsenceComponent, ListMotifAbsenceComponent, DetailsMotifAbsenceComponent],
  imports: [
    CommonModule,
    MotifAbsenceRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    MatExpansionModule,
    ListModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
  ],
   exports:[
    ListMotifAbsenceComponent
  ]
})
export class MotifAbsenceModule { }
