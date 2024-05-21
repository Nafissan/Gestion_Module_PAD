import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComiteRoutingModule } from './comite-routing.module';
import { DetailsComiteComponent } from './details-comite/details-comite.component';
import { ListComiteComponent } from './list-comite/list-comite.component';
import { AddOrUpdateComiteComponent } from './add-or-update-comite/add-or-update-comite.component';
import { JoindrePvComponent } from './joindre-pv/joindre-pv.component';
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
import { DownloadComponent } from './download/download.component';



@NgModule({
  declarations: [DetailsComiteComponent, ListComiteComponent, AddOrUpdateComiteComponent, JoindrePvComponent, DownloadComponent],
  imports: [
    CommonModule,
    CommonModule,
    ComiteRoutingModule,
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
export class ComiteModule { }
