import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorieLaitRoutingModule } from './categorie-lait-routing.module';
import { ListCategorieLaitComponent } from './list-categorie-lait/list-categorie-lait.component';
import { AddOrUpdateCategorieLaitComponent } from './add-or-update-categorie-lait/add-or-update-categorie-lait.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [ListCategorieLaitComponent, AddOrUpdateCategorieLaitComponent],
  imports: [
    CommonModule,
    CategorieLaitRoutingModule,
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
export class CategorieLaitModule { }
