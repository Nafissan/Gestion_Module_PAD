import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSuiviCongeComponent } from './list-suivi-conge/list-suivi-conge.component';
import { ValidationCongeComponent } from './validation-conge/validation-conge.component';
import { AuthGuard } from '../../../shared/services/authguard.service';


const routes: Routes = [
  {
    path: '', component: ListSuiviCongeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'list-suivi-conge', component: ListSuiviCongeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'validation-conge', component: ValidationCongeComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuiviCongeRoutingModule { }
