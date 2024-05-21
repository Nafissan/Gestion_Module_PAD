import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { HighlightModule } from '../../../../@fury/shared/highlightjs/highlight.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';



import { DossierInterimRoutingModule } from './dossier-interim-routing.module';
import { DossierInterimComponent } from './dossier-interim/dossier-interim.component';
import { ListInterimComponent } from './list-interim/list-interim.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DossierInterimComponent, ListInterimComponent],
  imports: [
    CommonModule,
    DossierInterimRoutingModule,
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
export class DossierInterimModule { }
