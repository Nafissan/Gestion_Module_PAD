import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAbsenceComponent } from './list-absence/list-absence.component';
import { AddAbsenceComponent } from './add-absence/add-absence.component';
import { AuthGuard } from '../../../shared/services/authguard.service';


const routes: Routes = [
  {
    path: '', component: ListAbsenceComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-absence', component: ListAbsenceComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-absence', component: AddAbsenceComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsenceRoutingModule { }
