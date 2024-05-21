import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuiviDemandeLaitRoutingModule } from './suivi-demande-lait-routing.module';
import { ListSuiviDemandeLaitComponent } from './list-suivi-demande-lait/list-suivi-demande-lait.component';
import { DetailsSuiviDemandeLaitComponent } from './details-suivi-demande-lait/details-suivi-demande-lait.component';
import { AddOrUpdateSuiviDemandeLaitComponent } from './add-or-update-suivi-demande-lait/add-or-update-suivi-demande-lait.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { PageLayoutDemoContentModule } from 'src/app/pages/page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { ValiderAttributionLaitComponent } from './valider-attribution-lait/valider-attribution-lait.component';
import { CorrectionAttributionComponent } from './correction-attribution/correction-attribution.component';


@NgModule({
  declarations: [ListSuiviDemandeLaitComponent, DetailsSuiviDemandeLaitComponent, AddOrUpdateSuiviDemandeLaitComponent, ValiderAttributionLaitComponent, CorrectionAttributionComponent],
  imports: [
    CommonModule,
    SuiviDemandeLaitRoutingModule, 
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
export class SuiviDemandeLaitModule { }
