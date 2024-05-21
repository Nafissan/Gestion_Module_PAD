import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniteOrganisationnelleRoutingModule } from './unite-organisationnelle-routing.module';
import { AddUniteOrganisationnelleComponent } from './add-unite-organisationnelle/add-unite-organisationnelle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListUniteOrganisationnelleComponent } from './list-unite-organisationnelle/list-unite-organisationnelle.component';
import { TreeGridModule, TreeGridAllModule, PageService, ExcelExportService, SortService, FilterService, ToolbarService, EditService } from '@syncfusion/ej2-angular-treegrid';
import { MatExpansionModule } from '@angular/material/expansion';
import { TreeComponent } from './tree/tree.component';
import { DetailsUniteOrganisationnelleComponent } from './details-unite-organisationnelle/details-unite-organisationnelle.component';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
@NgModule({
  declarations: [AddUniteOrganisationnelleComponent, ListUniteOrganisationnelleComponent, TreeComponent, DetailsUniteOrganisationnelleComponent],
  imports: [
    CommonModule,
    UniteOrganisationnelleRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    FuryCardModule,
    MatExpansionModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
    TreeGridAllModule,
    TreeGridModule,
    DropDownListAllModule,
  ],
  providers: [PageService, SortService, FilterService, ToolbarService, EditService,ExcelExportService]
})
export class UniteOrganisationnelleModule { }
