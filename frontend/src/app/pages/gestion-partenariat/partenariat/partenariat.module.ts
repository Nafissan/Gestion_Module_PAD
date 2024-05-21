import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartenariatRoutingModule } from './partenariat-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { ScrollbarModule } from 'src/@fury/shared/scrollbar/scrollbar.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListPartenariatComponent } from './list-partenariat/list-partenariat.component';
import { AddOrUpdatePartenariatComponent } from './add-or-update-partenariat/add-or-update-partenariat.component';
import { DetailsPartenariatComponent } from './details-partenariat/details-partenariat.component';
import { MapPartenairesComponent } from './map-partenaires/map-partenaires.component';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [ListPartenariatComponent, AddOrUpdatePartenariatComponent, DetailsPartenariatComponent, MapPartenairesComponent],
  imports: [
    CommonModule,
    PartenariatRoutingModule,
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
    ScrollbarModule,
    AgmCoreModule,
  ],
  exports: [ListPartenariatComponent]
})
export class PartenariatModule { }
