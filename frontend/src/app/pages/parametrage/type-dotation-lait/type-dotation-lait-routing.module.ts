import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../shared/services/authguard.service';
import { AddOrUpdateTypeDotationLaitComponent } from './add-or-update-type-dotation-lait/add-or-update-type-dotation-lait.component';
import { DetailsTypeDotationLaitComponent } from './details-type-dotation-lait/details-type-dotation-lait.component';
import { ListTypeDotationLaitComponent } from './list-type-dotation-lait/list-type-dotation-lait.component';


const routes: Routes = [
  {
    path: '', component: ListTypeDotationLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-type-dotation-lait', component: ListTypeDotationLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-type-dotation-lait', component: AddOrUpdateTypeDotationLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-type-dotation-lait', component: DetailsTypeDotationLaitComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeDotationLaitRoutingModule { }
