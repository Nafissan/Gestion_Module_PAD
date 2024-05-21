import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../shared/services/authguard.service';
import { AddMotifAbsenceComponent } from './add-motif-absence/add-motif-absence.component';
import { ListMotifAbsenceComponent } from './list-motif-absence/list-motif-absence.component';


const routes: Routes = [
  {
    path: '', component: ListMotifAbsenceComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-motif-absence', component: ListMotifAbsenceComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-motif-absence', component: AddMotifAbsenceComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotifAbsenceRoutingModule { }
