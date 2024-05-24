import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeSatisfactionComponent } from './liste-satisfaction/liste-satisfaction.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AddOrUpdateSatisfactionComponent } from './add-or-update-satisfaction/add-or-update-satisfaction.component';
import { DetailsSatisfactionComponent } from './details-satisfaction/details-satisfaction.component';


const routes: Routes = [
  {
    path: '', component: ListeSatisfactionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'liste-suivi-satisfaction', component: ListeSatisfactionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-suivi-satisfaction', component: AddOrUpdateSatisfactionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-satisfaction', component: DetailsSatisfactionComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SatisfactionRoutingModule { }
