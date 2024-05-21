import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionInterimRoutingModule } from './gestion-interim-routing.module';
import { InterimModule } from './interim/interim.module';
import { EtapeInterimModule } from './etape-interim/etape-interim.module';
import { SuiviInterimModule } from './suivi-interim/suivi-interim.module';
import { SuiviCongeRoutingModule } from '../gestion-conge/suivi-conge/suivi-conge-routing.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GestionInterimRoutingModule,
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
  ]
})
export class GestionInterimModule { }
