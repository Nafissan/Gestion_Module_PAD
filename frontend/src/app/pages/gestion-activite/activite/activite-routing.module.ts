import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../shared/services/authguard.service';
import {ListActiviteComponent} from './list-activite/list-activite.component'
import {AddOrUpdateActiviteComponent} from './add-or-update-activite/add-or-update-activite.component'
import {DetailsActiviteComponent} from './details-activite/details-activite.component'

const routes: Routes = [
  {
    path: '', component: ListActiviteComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-activite', component: ListActiviteComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-activite', component: AddOrUpdateActiviteComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-activite', component: DetailsActiviteComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiviteRoutingModule { }
