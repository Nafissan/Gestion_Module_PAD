import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'niveau-hierarchique',
    loadChildren: () => import('./niveau-hierarchique/niveau-hierarchique.module').then(m => m.NiveauHierarchiqueModule),
    pathMatch: 'full'
  },

  {
    path: 'unite-organisationnelle',
    loadChildren: () => import('./unite-organisationnelle/unite-organisationnelle.module').then(m => m.UniteOrganisationnelleModule),
    pathMatch: 'full'
  },

  {
    path: 'fonction',
    loadChildren: () => import('./fonction/fonction.module').then(m => m.FonctionModule),
    pathMatch: 'full'
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionUniteOrganisationnelleRoutingModule { }
