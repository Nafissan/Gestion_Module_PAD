import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListNiveauHierarchiqueComponent } from './list-niveau-hierarchique/list-niveau-hierarchique.component';
import { AuthGuard } from '../../../shared/services/authguard.service';
import { AddNiveauHierarchiqueComponent } from './add-niveau-hierarchique/add-niveau-hierarchique.component';


const routes: Routes = [
  {
    path: '', component: ListNiveauHierarchiqueComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-niveau-hierarchique', component: ListNiveauHierarchiqueComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-niveau-hierarchique', component: AddNiveauHierarchiqueComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NiveauHierarchiqueRoutingModule { }
