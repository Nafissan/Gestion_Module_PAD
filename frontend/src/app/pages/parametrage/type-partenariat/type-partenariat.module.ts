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

import { TypePartenariatRoutingModule } from './type-partenariat-routing.module';
import { ListTypePartenariatComponent } from './list-type-partenariat/list-type-partenariat.component';
import { DetailsTypePartenariatComponent } from './details-type-partenariat/details-type-partenariat.component';
import { AddTypePartenariatComponent } from './add-type-partenariat/add-type-partenariat.component';
import { ScrollbarModule } from 'src/@fury/shared/scrollbar/scrollbar.module';


@NgModule({
  declarations: [ListTypePartenariatComponent, DetailsTypePartenariatComponent, AddTypePartenariatComponent],
  imports: [
    CommonModule,
    TypePartenariatRoutingModule,
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
export class TypePartenariatModule { }
