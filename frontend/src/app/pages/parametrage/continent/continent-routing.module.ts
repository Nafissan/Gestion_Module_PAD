import { Routes, RouterModule } from '@angular/router';
import { ListContinentComponent } from './list-continent/list-continent.component';
import { AddContinentComponent } from './add-continent/add-continent.component';
import { DetailsContinentComponent } from './details-continent/details-continent.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../../shared/services/authguard.service';


export const routes: Routes = [
  {
    path: '', component: ListContinentComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-continent', component: ListContinentComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-continent', component: AddContinentComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-continent', component: DetailsContinentComponent, canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContinentRoutingModule { }

