import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../shared/services/authguard.service';
import {ListConventionComponent} from './list-convention/list-convention.component'
import {AddOrUpdateConventionComponent} from './add-or-update-convention/add-or-update-convention.component'
import {DetailsConventionComponent} from './details-convention/details-convention.component'

const routes: Routes = [
  {
    path: '', component: ListConventionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-convention', component: ListConventionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-convention', component: AddOrUpdateConventionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-convention', component: DetailsConventionComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConventionRoutingModule { }
