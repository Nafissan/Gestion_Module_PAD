import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDossierAbsenceComponent } from './list-dossier-absence/list-dossier-absence.component';
import { AuthGuard } from '../../../shared/services/authguard.service';
import { AddAbsenceComponent } from '../absence/add-absence/add-absence.component';


const routes: Routes = [
  {
    path: '', component: ListDossierAbsenceComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-dossier-absence', component: ListDossierAbsenceComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-dossier-absence', component: AddAbsenceComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossierAbsenceRoutingModule { }
