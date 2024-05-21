import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLayoutCardRoutingModule } from './page-layout-card-routing.module';
import { PageLayoutCardComponent } from './page-layout-card.component';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { PageLayoutDemoContentModule } from '../components/page-layout-content/page-layout-demo-content.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';

@NgModule({
  declarations: [PageLayoutCardComponent],
  imports: [
    CommonModule,
    PageLayoutCardRoutingModule,
    FurySharedModule,
    FuryCardModule,
    PageLayoutDemoContentModule
  ]
})
export class PageLayoutCardModule {
}
