import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrUpdatePointfocalComponent } from './add-or-update-pointfocal/add-or-update-pointfocal.component';
import { DetailsPointfocalComponent } from './details-pointfocal/details-pointfocal.component';
import { ListPointfocalComponent } from './list-pointfocal/list-pointfocal.component';
import { PointfocalRoutingModule } from '../pointfocal/pointfocal-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ScrollbarModule } from 'src/@fury/shared/scrollbar/scrollbar.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [AddOrUpdatePointfocalComponent, DetailsPointfocalComponent, ListPointfocalComponent],
  imports: [
    CommonModule,
    PointfocalRoutingModule,
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
export class PointfocalModule { }
