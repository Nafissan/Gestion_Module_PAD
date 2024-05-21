import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { ScrollbarModule } from 'src/@fury/shared/scrollbar/scrollbar.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActiviteRoutingModule } from './activite-routing.module';
import { ListActiviteComponent } from './list-activite/list-activite.component';
import { AddOrUpdateActiviteComponent } from './add-or-update-activite/add-or-update-activite.component';
import { DetailsActiviteComponent } from './details-activite/details-activite.component';



@NgModule({
  declarations: [ListActiviteComponent, AddOrUpdateActiviteComponent, DetailsActiviteComponent],
  imports: [
    CommonModule,
    ActiviteRoutingModule,
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
export class ActiviteModule { }
