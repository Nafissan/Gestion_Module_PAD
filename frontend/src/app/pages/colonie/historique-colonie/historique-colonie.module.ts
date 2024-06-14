import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriqueColonieRoutingModule } from './historique-colonie-routing.module';
import { ListeHistoriqueColonieComponent } from './liste-historique-colonie/liste-historique-colonie.component';
import { ReadHistoriqueColonieComponent } from './read-historique-colonie/read-historique-colonie.component';
import { ListeColonsComponent } from './liste-colons/liste-colons.component';
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
  declarations: [ListeHistoriqueColonieComponent, ReadHistoriqueColonieComponent, ListeColonsComponent],
  imports: [
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
    HistoriqueColonieRoutingModule
  ]
})
export class HistoriqueColonieModule { }
