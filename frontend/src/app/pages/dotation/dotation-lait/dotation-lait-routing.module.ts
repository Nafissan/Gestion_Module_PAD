import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'demande-lait',
    loadChildren: () => import('./demande-lait/demande-lait.module').then(m => m.DemandeLaitModule),
    pathMatch: 'full'
  },
  {
    path: 'suivi-demande-lait',
    loadChildren: () => import('./suivi-demande-lait/suivi-demande-lait.module').then(m => m.SuiviDemandeLaitModule),
  },
  {
    path: 'stock-lait',
    loadChildren: () => import('./stock-lait/stock-lait.module').then(m => m.StockLaitModule),
    pathMatch: 'full'
  },
  // {
  //   path: 'suivi-stock-lait/:id',
  //   loadChildren: () => import('./suivi-stock-lait/suivi-stock-lait.module').then(m => m.SuiviStockLaitModule),
  //   pathMatch: 'full'
  // },
  {
    path: 'suivi-stock-lait',
    loadChildren: () => import('./suivi-stock-lait/suivi-stock-lait.module').then(m => m.SuiviStockLaitModule),
    // pathMatch: 'full'
  },
  {
    path: 'acquisition-lait',
    loadChildren: () => import('./acquisition-lait/acquisition-lait.module').then(m => m.AcquisitionLaitModule),
    pathMatch: 'full'
  },
  {
    path: 'dashboard-lait',
    loadChildren: () => import('./dashboard-lait/dashboard-lait.module').then(m => m.DashboardLaitModule),
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DotationLaitRoutingModule { }
