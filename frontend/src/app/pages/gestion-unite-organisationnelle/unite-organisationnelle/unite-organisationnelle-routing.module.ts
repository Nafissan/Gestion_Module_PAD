import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUniteOrganisationnelleComponent } from './add-unite-organisationnelle/add-unite-organisationnelle.component';
import { AuthGuard } from '../../../shared/services/authguard.service';
import { ListUniteOrganisationnelleComponent } from './list-unite-organisationnelle/list-unite-organisationnelle.component';
import { DetailsNiveauHierarchiqueComponent } from '../niveau-hierarchique/details-niveau-hierarchique/details-niveau-hierarchique.component';
import { TreeComponent } from './tree/tree.component';



const routes: Routes = [
  {
    path: '', component: TreeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-unite-organisationnelle', component: ListUniteOrganisationnelleComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-unite-organisationnelle', component: AddUniteOrganisationnelleComponent, canActivate: [AuthGuard],
  },

  {
    path: 'details-unite-organisationnelle', component: DetailsNiveauHierarchiqueComponent, canActivate: [AuthGuard]
  },
  
  {
    path: 'tree', component: TreeComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniteOrganisationnelleRoutingModule { }
