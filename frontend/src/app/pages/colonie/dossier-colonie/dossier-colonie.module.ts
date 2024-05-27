import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DossierColonieRoutingModule } from './dossier-colonie-routing.module';
import { AddDossierColonieComponent } from './add-dossier-colonie/add-dossier-colonie.component';
import { ListeDossierColonieComponent } from './liste-dossier-colonie/liste-dossier-colonie.component';
import { DetailsDossierColonieComponent } from './details-dossier-colonie/details-dossier-colonie.component';
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
  declarations: [AddDossierColonieComponent, ListeDossierColonieComponent, DetailsDossierColonieComponent],
  imports: [
    CommonModule,
    DossierColonieRoutingModule,
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
export class DossierColonieModule { }
