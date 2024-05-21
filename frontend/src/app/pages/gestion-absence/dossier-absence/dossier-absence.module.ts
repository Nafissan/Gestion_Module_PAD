import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DossierAbsenceRoutingModule } from './dossier-absence-routing.module';
import { AddDossierAbsenceComponent } from './add-dossier-absence/add-dossier-absence.component';
import { ListDossierAbsenceComponent } from './list-dossier-absence/list-dossier-absence.component';
import { DetailsDossierAbsenceComponent } from './details-dossier-absence/details-dossier-absence.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';

@NgModule({
  declarations: [AddDossierAbsenceComponent, ListDossierAbsenceComponent, DetailsDossierAbsenceComponent],
  imports: [
    CommonModule,
    DossierAbsenceRoutingModule,
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
export class DossierAbsenceModule { }
