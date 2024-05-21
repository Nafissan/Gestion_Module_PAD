
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
import { AddOrUpdateDomaineComponent } from './add-or-update-domaine/add-or-update-domaine.component';
import { DetailsDomaineComponent } from './details-domaine/details-domaine.component';
import { ListDomaineComponent } from './list-domaine/list-domaine.component';
import { DomaineRoutingModule } from './domaine-routing.module';



@NgModule({
  declarations: [AddOrUpdateDomaineComponent, DetailsDomaineComponent, ListDomaineComponent],
  imports: [
    CommonModule,
    DomaineRoutingModule,
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
export class DomaineModule { }
