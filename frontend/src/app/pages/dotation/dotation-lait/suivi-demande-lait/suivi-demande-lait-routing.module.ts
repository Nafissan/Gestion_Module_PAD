import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AddOrUpdateSuiviDemandeLaitComponent } from './add-or-update-suivi-demande-lait/add-or-update-suivi-demande-lait.component';
import { DetailsSuiviDemandeLaitComponent } from './details-suivi-demande-lait/details-suivi-demande-lait.component';
import { ListSuiviDemandeLaitComponent } from './list-suivi-demande-lait/list-suivi-demande-lait.component';
import { ValiderAttributionLaitComponent } from './valider-attribution-lait/valider-attribution-lait.component';


const routes: Routes = [
   {
    path: 'list-suivi-demande-lait/:id', component: ListSuiviDemandeLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-suivi-demande-lait', component: AddOrUpdateSuiviDemandeLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-suivi-demande-lait', component: DetailsSuiviDemandeLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: '', component: ValiderAttributionLaitComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuiviDemandeLaitRoutingModule { }
