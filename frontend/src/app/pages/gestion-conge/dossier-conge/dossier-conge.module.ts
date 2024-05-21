import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDossierCongeComponent } from './add-dossier-conge/add-dossier-conge.component';
import { ListDossierCongeComponent } from './list-dossier-conge/list-dossier-conge.component';
import { DetailsDossierCongeComponent } from './details-dossier-conge/details-dossier-conge.component';
import { DossierCongeRoutingModule } from './dossier-conge-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [AddDossierCongeComponent, ListDossierCongeComponent, DetailsDossierCongeComponent],
  imports: [
    CommonModule,
    DossierCongeRoutingModule,
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
  exports : [ListDossierCongeComponent]
})
export class DossierCongeModule { }
