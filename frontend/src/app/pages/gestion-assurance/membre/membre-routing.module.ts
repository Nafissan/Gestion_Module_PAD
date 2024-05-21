import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../shared/services/authguard.service';
import {ListMembreComponent} from './list-membre/list-membre.component'
import {AddOrUpdateMembreComponent} from './add-or-update-membre/add-or-update-membre.component'
import {DetailsMembreComponent} from './details-membre/details-membre.component'
import { VoirMembreComponent } from './voir-membre/voir-membre.component';

const routes: Routes = [
  {
    path: '', component: ListMembreComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-membre', component: ListMembreComponent, canActivate: [AuthGuard],
  },
  {
    path: 'voir-membre/:id', component: VoirMembreComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-membre', component: AddOrUpdateMembreComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-membre', component: DetailsMembreComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembreRoutingModule { }
