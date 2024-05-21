import { Routes, RouterModule } from '@angular/router';
import { ListDossierCongeComponent } from './list-dossier-conge/list-dossier-conge.component';
import { AddDossierCongeComponent } from './add-dossier-conge/add-dossier-conge.component';
import { DetailsDossierCongeComponent } from './details-dossier-conge/details-dossier-conge.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../../shared/services/authguard.service';


export const routes: Routes = [
  {
    path: '', component: ListDossierCongeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-dossier-conge', component: ListDossierCongeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-dossier-conge', component: AddDossierCongeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-dossier-conge', component: DetailsDossierCongeComponent, canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossierCongeRoutingModule { }

