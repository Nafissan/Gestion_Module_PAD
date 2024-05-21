import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListInterimComponent } from './list-interim/list-interim.component';
import { DossierInterimComponent } from './dossier-interim/dossier-interim.component';
import { AuthGuard } from '../../../shared/services/authguard.service';


const routes: Routes = [
  // {
  //   path: '', component: ListSuiviInterimComponent
  // },
  {
    path: '', component: DossierInterimComponent, canActivate: [AuthGuard]
  },
  {
    path: 'list-interim', component: ListInterimComponent, canActivate: [AuthGuard]
  },
  {
    path: 'dossier-interim', component: DossierInterimComponent, canActivate: [AuthGuard]
  }
  
  // {
  //   path: 'details-interim', component: DetailsInterimComponent
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossierInterimRoutingModule { }
