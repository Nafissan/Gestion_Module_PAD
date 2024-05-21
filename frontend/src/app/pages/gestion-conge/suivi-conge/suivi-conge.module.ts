import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuiviCongeRoutingModule } from './suivi-conge-routing.module';
import { ListSuiviCongeComponent } from './list-suivi-conge/list-suivi-conge.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ValidationCongeComponent } from './validation-conge/validation-conge.component';
import { EtapeValidationComponent } from './etape-validation/etape-validation.component';

@NgModule({
  declarations: [ListSuiviCongeComponent, ValidationCongeComponent, EtapeValidationComponent],
  imports: [
    CommonModule,
    SuiviCongeRoutingModule,
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SuiviCongeModule { }
