import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FonctionRoutingModule } from './fonction-routing.module';
import { AddFonctionComponent } from './add-fonction/add-fonction.component';
import { ListFonctionComponent } from './list-fonction/list-fonction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';

import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
// import { DetailsFonctionComponent } from './details-fonction/details-fonction.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DetailsFonctionComponent } from './details-fonction/details-fonction.component';
import { MatTableExporterModule } from 'mat-table-exporter';



@NgModule({
  declarations: [AddFonctionComponent, ListFonctionComponent, DetailsFonctionComponent],
  imports: [
    CommonModule,
    FonctionRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    FuryCardModule,
    MatExpansionModule,
    MatTableExporterModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FonctionModule { }
