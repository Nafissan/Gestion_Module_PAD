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
import { MembreRoutingModule } from './membre-routing.module';
import { DetailsMembreComponent } from './details-membre/details-membre.component';
import { ListMembreComponent } from './list-membre/list-membre.component';
import { AddOrUpdateMembreComponent } from './add-or-update-membre/add-or-update-membre.component';
import { DownloadComponent } from './download/download.component';
import {JoindrePhotoComponent } from './joindre-photo/joindre-photo.component';
import { VoirMembreComponent } from './voir-membre/voir-membre.component';



@NgModule({
  declarations: [DetailsMembreComponent, ListMembreComponent, AddOrUpdateMembreComponent, JoindrePhotoComponent, DownloadComponent, VoirMembreComponent],
  imports: [
    CommonModule,
    MembreRoutingModule,
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
export class MembreModule { }
