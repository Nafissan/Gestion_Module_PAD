import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AddOrUpdateStockLaitComponent } from './add-or-update-stock-lait/add-or-update-stock-lait.component';
import { DetailsStockLaitComponent } from './details-stock-lait/details-stock-lait.component';
import { ListStockLaitComponent } from './list-stock-lait/list-stock-lait.component';


const routes: Routes = [
  {
    path: '', component: ListStockLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-stock-lait', component: ListStockLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-stock-lait', component: AddOrUpdateStockLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-stock-lait', component: DetailsStockLaitComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockLaitRoutingModule { }
