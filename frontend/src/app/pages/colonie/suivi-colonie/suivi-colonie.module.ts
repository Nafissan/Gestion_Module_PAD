import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuiviColonieRoutingModule } from './suivi-colonie-routing.module';
import { AddOrUpdateRapportProspectionComponent } from './add-or-update-rapport-prospection/add-or-update-rapport-prospection.component';
import { ListeRapportProspectionComponent } from './liste-rapport-prospection/liste-rapport-prospection.component';
import { DetailsRapportProspectionComponent } from './details-rapport-prospection/details-rapport-prospection.component';
import { ValidationDchComponent } from './validation-dch/validation-dch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';


@NgModule({
  declarations: [AddOrUpdateRapportProspectionComponent, ListeRapportProspectionComponent, DetailsRapportProspectionComponent, ValidationDchComponent],
  imports: [
    CommonModule,
    SuiviColonieRoutingModule,
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
    ReactiveFormsModule
  ]
})
export class SuiviColonieModule { }
