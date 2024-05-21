import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListPaysComponent } from './list-pays/list-pays.component';
import { AddOrUpdatePaysComponent } from './add-or-update-pays/add-or-update-pays.component';
import { DetailsPaysComponent } from './details-pays/details-pays.component';
import { PaysRoutingModule } from './pays-routing.module';

@NgModule({
  declarations: [ListPaysComponent, AddOrUpdatePaysComponent, DetailsPaysComponent],
  imports: [
    CommonModule,
    PaysRoutingModule,
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
  ], 
  exports : []
})
export class PaysModule {

}
