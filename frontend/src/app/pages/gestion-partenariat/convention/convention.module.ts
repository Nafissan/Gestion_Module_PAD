import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConventionRoutingModule } from './convention-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { ScrollbarModule } from 'src/@fury/shared/scrollbar/scrollbar.module';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import { ListConventionComponent } from './list-convention/list-convention.component';
import { DetailsConventionComponent } from './details-convention/details-convention.component';
import { AddOrUpdateConventionComponent } from './add-or-update-convention/add-or-update-convention.component';



@NgModule({
  declarations: [ListConventionComponent, DetailsConventionComponent, AddOrUpdateConventionComponent],
  imports: [
    CommonModule,
    ConventionRoutingModule,
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
    MatProgressBarModule,
    MatChipsModule
  ]
})
export class ConventionModule { }
