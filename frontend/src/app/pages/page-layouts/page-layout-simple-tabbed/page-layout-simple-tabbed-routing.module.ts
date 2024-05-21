import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLayoutSimpleTabbedComponent } from './page-layout-simple-tabbed.component';

const routes: Routes = [
  {
    path: '',
    component: PageLayoutSimpleTabbedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageLayoutSimpleTabbedRoutingModule {
}
