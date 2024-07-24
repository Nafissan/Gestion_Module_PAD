import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSatisfactionPelerinageComponent } from './list-satisfaction-pelerinage/list-satisfaction-pelerinage.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AddOrUpdateSatisfactionPelerinageComponent } from './add-or-update-satisfaction-pelerinage/add-or-update-satisfaction-pelerinage.component';
import { DetailsSatisfactionPelerinageComponent } from './details-satisfaction-pelerinage/details-satisfaction-pelerinage.component';


const routes: Routes = [
  {
    path: '', component: ListSatisfactionPelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'liste-suivi-satisfaction-pelerinage', component: ListSatisfactionPelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-suivi-satisfaction-pelerinage', component: AddOrUpdateSatisfactionPelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-satisfaction-pelerinage', component: DetailsSatisfactionPelerinageComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SatisfactionPelerinageRoutingModule { }
