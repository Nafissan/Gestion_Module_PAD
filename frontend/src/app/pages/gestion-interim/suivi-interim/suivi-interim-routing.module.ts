import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSuiviInterimComponent } from './list-suivi-interim/list-suivi-interim.component';

import { ListInterimComponent } from '../interim/list-interim/list-interim.component';
import { AuthGuard } from '../../../shared/services/authguard.service';


export const routes: Routes = [
  {
    path: '', component: ListSuiviInterimComponent, canActivate: [AuthGuard],
  },
  // {
  //   path: '', component: DossierInterimComponent
  // },
  {
    path: 'list-interim', component: ListInterimComponent, canActivate: [AuthGuard],
  }
  
  // {
  //   path: 'details-interim', component: DetailsInterimComponent
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuiviInterimRoutingModule { }
