import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'compte',
    loadChildren: () => import('./compte/compte.module').then(m => m.CompteModule),
    pathMatch: 'full'
  },  
  {
    path: 'role',
    loadChildren: () => import('./role/role.module').then(m => m.RoleModule),
    pathMatch: 'full'
  },  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionUtilisateursRoutingModule { }
