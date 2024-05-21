import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path: 'continent',
    loadChildren: () => import('./continent/continent.module').then(m => m.ContinentModule),
    pathMatch: 'full'
  },
  {
    path: 'pays',
    loadChildren: () => import('./pays/pays.module').then(m => m.PaysModule),
    pathMatch: 'full'
  },
  {

    path: 'zone',
    loadChildren: () => import('./zone/zone.module').then(m => m.ZoneModule),
  },
  {

    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
  },
  {
    path: 'type-partenariat',
    loadChildren: () => import('./type-partenariat/type-partenariat.module').then(m => m.TypePartenariatModule),
    pathMatch: 'full'
  },
  {
    path: 'ville',
    loadChildren: () => import('./ville/ville.module').then(m => m.VilleModule),
    pathMatch: 'full'
  },
  {
    path: 'type-dotation-lait',
    loadChildren: () => import('./type-dotation-lait/type-dotation-lait.module').then(m => m.TypeDotationLaitModule),
    pathMatch: 'full'
  },
  {
    path: 'fournisseur-lait',
    loadChildren: () => import('./fournisseur-lait/fournisseur-lait.module').then(m => m.FournisseurLaitModule),
    pathMatch: 'full'
  },
  {
    path: 'marque-lait',
    loadChildren: () => import('./marque-lait/marque-lait.module').then(m => m.MarqueLaitModule),
    pathMatch: 'full'
  },
  {
    path: 'categorie-lait',
    loadChildren: () => import('./categorie-lait/categorie-lait.module').then(m => m.CategorieLaitModule),
    pathMatch: 'full'
  },
  {
    path: 'domaine',
    loadChildren: () => import('./domaine/domaine.module').then(m => m.DomaineModule),
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrageRoutingModule { }
