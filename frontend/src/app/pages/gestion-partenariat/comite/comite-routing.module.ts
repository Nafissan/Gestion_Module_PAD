import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../shared/services/authguard.service';
import {ListComiteComponent} from './list-comite/list-comite.component'
import {AddOrUpdateComiteComponent} from './add-or-update-comite/add-or-update-comite.component'
import {DetailsComiteComponent} from './details-comite/details-comite.component'

const routes: Routes = [
  {
    path: '', component: ListComiteComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-comite', component: ListComiteComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-comite', component: AddOrUpdateComiteComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-comite', component: DetailsComiteComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComiteRoutingModule { }
