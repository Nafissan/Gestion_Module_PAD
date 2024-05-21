import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCongeComponent } from './list-conge/list-conge.component';
import { AddOrUpdateCongeComponent } from './add-or-update-conge/add-or-update-conge.component';
import { DetailsCongeComponent } from './details-conge/details-conge.component';
import { AuthGuard } from '../../../shared/services/authguard.service';


const routes: Routes = [
  {
    path: '', component: ListCongeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-conge', component: ListCongeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-conge', component: AddOrUpdateCongeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-conge', component: DetailsCongeComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CongeRoutingModule { }
