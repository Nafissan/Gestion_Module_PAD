import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'simple',
    loadChildren: () => import('./page-layout-simple/page-layout-simple.module').then(m => m.PageLayoutSimpleModule)
  },
  {
    path: 'simple-tabbed',
    loadChildren: () => import('./page-layout-simple-tabbed/page-layout-simple-tabbed.module').then(m => m.PageLayoutSimpleTabbedModule)
  },
  {
    path: 'card',
    loadChildren: () => import('./page-layout-card/page-layout-card.module').then(m => m.PageLayoutCardModule)
  },
  {
    path: 'card-tabbed',
    loadChildren: () => import('./page-layout-card-tabbed/page-layout-card-tabbed.module').then(m => m.PageLayoutCardTabbedModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageLayoutsRoutingModule {
}
