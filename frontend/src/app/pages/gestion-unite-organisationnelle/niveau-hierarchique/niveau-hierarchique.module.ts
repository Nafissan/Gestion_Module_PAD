import { ListNiveauHierarchiqueComponent } from './list-niveau-hierarchique/list-niveau-hierarchique.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { AddNiveauHierarchiqueComponent } from './add-niveau-hierarchique/add-niveau-hierarchique.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NiveauHierarchiqueRoutingModule } from './niveau-hierarchique-routing.module';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { DetailsNiveauHierarchiqueComponent } from './details-niveau-hierarchique/details-niveau-hierarchique.component';
import { MatTableExporterModule } from 'mat-table-exporter';


@NgModule({
  declarations: [AddNiveauHierarchiqueComponent, ListNiveauHierarchiqueComponent, DetailsNiveauHierarchiqueComponent],
  imports: [
    CommonModule,
    NiveauHierarchiqueRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    MatTableExporterModule,
    FuryCardModule,
    MatTabsModule,
    PageLayoutDemoContentModule,
    MatExpansionModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NiveauHierarchiqueModule { }