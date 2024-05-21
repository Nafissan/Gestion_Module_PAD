import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtapeInterimRoutingModule } from './etape-interim-routing.module';
import { DetailsEtapeInterimComponent } from './details-etape-interim/details-etape-interim.component';
import { AddEtapeInterimComponent } from './add-etape-interim/add-etape-interim.component';
import { ListEtapeInterimComponent } from './list-etape-interim/list-etape-interim.component';
import { InterimRoutingModule } from '../interim/interim-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { JoindreInterimComponent } from './joindre-interim/joindre-interim.component';
import { ImputeInterimComponent } from './impute-interim/impute-interim.component';

@NgModule({
  declarations: [DetailsEtapeInterimComponent, AddEtapeInterimComponent, ListEtapeInterimComponent, JoindreInterimComponent, ImputeInterimComponent],
  imports:[
  CommonModule,
  EtapeInterimRoutingModule,
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




],
exports: [ListEtapeInterimComponent]
})
export class EtapeInterimModule { }
