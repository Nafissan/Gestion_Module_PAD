import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

import { FournisseurLaitRoutingModule } from './fournisseur-lait-routing.module';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { AddOrUpdateFournisseurComponent } from './add-or-update-fournisseur/add-or-update-fournisseur.component';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { PageLayoutDemoContentModule } from 'src/app/pages/page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [ListFournisseurComponent, AddOrUpdateFournisseurComponent],
  imports: [
    CommonModule,
    FournisseurLaitRoutingModule,

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
export class FournisseurLaitModule { }
