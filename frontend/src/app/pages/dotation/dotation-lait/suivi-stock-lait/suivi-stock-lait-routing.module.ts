import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AddOrUpdateSuiviStockLaitComponent } from './add-or-update-suivi-stock-lait/add-or-update-suivi-stock-lait.component';
import { DetailsSuiviStockLaitComponent } from './details-suivi-stock-lait/details-suivi-stock-lait.component';
import { ListSuiviStockLaitComponent } from './list-suivi-stock-lait/list-suivi-stock-lait.component';
import { SuiviCategorieStockComponent } from './suivi-categorie-stock/suivi-categorie-stock.component';



const routes: Routes = [
  {
    path: '', component: ListSuiviStockLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-suivi-stock-lait/:id', component: ListSuiviStockLaitComponent, canActivate: [AuthGuard],
  },

  {
    path: 'add-suivi-stock-lait', component: AddOrUpdateSuiviStockLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-suivi-stock-lait', component: DetailsSuiviStockLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-suivi-stock-lait', component: ListSuiviStockLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-categorie-stock-lait/:id', component: SuiviCategorieStockComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuiviStockLaitRoutingModule { }
