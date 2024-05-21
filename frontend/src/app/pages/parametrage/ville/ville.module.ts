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
import { ScrollbarModule } from 'src/@fury/shared/scrollbar/scrollbar.module';
import { VilleRoutingModule } from './ville-routing.module';
import { DetailsVilleComponent } from './details-ville/details-ville.component';
import { ListVilleComponent } from './list-ville/list-ville.component';
import { AddVilleComponent } from './add-ville/add-ville.component';


@NgModule({
  declarations: [DetailsVilleComponent, ListVilleComponent, AddVilleComponent],
  imports: [
    CommonModule,
    VilleRoutingModule,
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
  ]
})
export class VilleModule { }
