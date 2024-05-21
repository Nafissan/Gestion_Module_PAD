import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLayoutSimpleTabbedRoutingModule } from './page-layout-simple-tabbed-routing.module';
import { PageLayoutSimpleTabbedComponent } from './page-layout-simple-tabbed.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../components/page-layout-content/page-layout-demo-content.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';

@NgModule({
  declarations: [PageLayoutSimpleTabbedComponent],
  imports: [
    CommonModule,
    PageLayoutSimpleTabbedRoutingModule,
    MatTabsModule,
    FurySharedModule,
    PageLayoutDemoContentModule
  ]
})
export class PageLayoutSimpleTabbedModule {
}
