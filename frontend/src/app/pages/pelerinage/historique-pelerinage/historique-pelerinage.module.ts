import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriquePelerinageRoutingModule } from './historique-pelerinage-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { DetailsHistoriquePelerinageComponent } from './details-historique-pelerinage/details-historique-pelerinage.component';
import { ListPelerinPelerinageComponent } from './list-pelerin-pelerinage/list-pelerin-pelerinage.component';
import { ListHistoriquePelerinageComponent } from './list-historique-pelerinage/list-historique-pelerinage.component';
import { ReadFileHistoriquePelerinageComponent } from './read-file-historique-pelerinage/read-file-historique-pelerinage.component';


@NgModule({
  declarations: [DetailsHistoriquePelerinageComponent, ListPelerinPelerinageComponent, ListHistoriquePelerinageComponent, ReadFileHistoriquePelerinageComponent],
  imports: [
    CommonModule,FormsModule,
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
    HistoriquePelerinageRoutingModule
  ]
})
export class HistoriquePelerinageModule { }
