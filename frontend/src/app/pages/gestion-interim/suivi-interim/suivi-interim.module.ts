import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuiviInterimRoutingModule } from './suivi-interim-routing.module';
import { SuiviInterimComponent } from './suivi-interim.component';
import { ListSuiviInterimComponent } from './list-suivi-interim/list-suivi-interim.component';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HighlightModule } from '../../../../@fury/shared/highlightjs/highlight.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';



@NgModule({
  declarations: [SuiviInterimComponent, ListSuiviInterimComponent],
  imports: [
  
    SuiviInterimRoutingModule,
    CommonModule,

    FormsModule,
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
export class SuiviInterimModule { }
