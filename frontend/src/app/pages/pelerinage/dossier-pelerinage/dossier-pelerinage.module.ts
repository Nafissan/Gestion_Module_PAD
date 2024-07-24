import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DossierPelerinageRoutingModule } from './dossier-pelerinage-routing.module';
import { AddOrUpdateDossierPelerinageComponent } from './add-or-update-dossier-pelerinage/add-or-update-dossier-pelerinage.component';
import { ListDossierPelerinageComponent } from './list-dossier-pelerinage/list-dossier-pelerinage.component';
import { DetailsDossierPelerinageComponent } from './details-dossier-pelerinage/details-dossier-pelerinage.component';
import { ReadFileDossierPelerinageComponent } from './read-file-dossier-pelerinage/read-file-dossier-pelerinage.component';
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
  declarations: [AddOrUpdateDossierPelerinageComponent, ListDossierPelerinageComponent, DetailsDossierPelerinageComponent, ReadFileDossierPelerinageComponent],
  imports: [
    CommonModule,
    DossierPelerinageRoutingModule,
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
export class DossierPelerinageModule { }
