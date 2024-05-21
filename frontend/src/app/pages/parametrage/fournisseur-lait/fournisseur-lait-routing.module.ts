import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';

const routes: Routes = [
  {
    path: '', component: ListFournisseurComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-fournisseur-lait', component: ListFournisseurComponent, canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurLaitRoutingModule { }
