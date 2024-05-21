import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListInterimComponent } from './list-interim/list-interim.component';
import { AddInterimComponent } from './add-interim/add-interim.component';
import { DetailsInterimComponent } from './details-interim/details-interim.component';
import { AuthGuard } from '../../../shared/services/authguard.service';
export const routes: Routes = [
  {
    path: '', component: ListInterimComponent
  },
  {
    path: 'list-interim', component: ListInterimComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-interim', component: AddInterimComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-interim', component: DetailsInterimComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterimRoutingModule { }
