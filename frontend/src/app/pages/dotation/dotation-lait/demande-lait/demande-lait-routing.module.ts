import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AddOrUpdateDemandeLaitComponent } from './add-or-update-demande-lait/add-or-update-demande-lait.component';
import { DetailsDemandeLaitComponent } from './details-demande-lait/details-demande-lait.component';
import { ListDemandeLaitComponent } from './list-demande-lait/list-demande-lait.component';


const routes: Routes = [
  {
    path: '', component: ListDemandeLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-demande-lait', component: ListDemandeLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-demande-lait', component: AddOrUpdateDemandeLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-demande-lait', component: DetailsDemandeLaitComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandeLaitRoutingModule { }
