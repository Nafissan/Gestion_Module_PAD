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
import { AddContinentComponent } from './add-continent/add-continent.component';
import { DetailsContinentComponent } from './details-continent/details-continent.component'
import { ListContinentComponent } from './list-continent/list-continent.component';
import { ContinentRoutingModule } from './continent-routing.module';
import { ScrollbarModule } from 'src/@fury/shared/scrollbar/scrollbar.module';

@NgModule({
  declarations: [DetailsContinentComponent, AddContinentComponent,ListContinentComponent],
  imports: [
    CommonModule,
    ContinentRoutingModule,
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
  ], 
  exports : [ListContinentComponent]
})
export class ContinentModule {

}
