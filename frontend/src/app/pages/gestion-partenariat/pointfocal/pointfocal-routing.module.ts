import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../shared/services/authguard.service';
import {ListPointfocalComponent} from './list-pointfocal/list-pointfocal.component'
import {AddOrUpdatePointfocalComponent } from './add-or-update-pointfocal/add-or-update-pointfocal.component'
import {DetailsPointfocalComponent} from './details-pointfocal/details-pointfocal.component'

const routes: Routes = [
  {
    path: '', component: ListPointfocalComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-pointfocal', component: ListPointfocalComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-pointfocal', component: AddOrUpdatePointfocalComponent , canActivate: [AuthGuard],
  },
  {
    path: 'details-pointfocal', component: DetailsPointfocalComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointfocalRoutingModule { }
