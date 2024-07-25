import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'dossier-pelerinage',
    loadChildren: () => import('./dossier-pelerinage/dossier-pelerinage.module').then(m => m.DossierPelerinageModule),
    pathMatch: 'full'
  },
  {
    path: 'pelerin-pelerinage',
    loadChildren: () => import('./pelerin-pelerinage/pelerin-pelerinage.module').then(m => m.PelerinPelerinageModule),
  },
  {
    path: 'satisfaction-pelerinage',
    loadChildren: () => import('./satisfaction-pelerinage/satisfaction-pelerinage.module').then(m => m.SatisfactionPelerinageModule),
    pathMatch: 'full'
  },
  {
    path: 'statistique-pelerinage',
    loadChildren: () => import('./statistique-pelerinage/statistique-pelerinage.module').then(m => m.StatistiquePelerinageModule),
    pathMatch: 'full'
  },
  {
    path: 'historique-pelerinage',
    loadChildren: () => import('./historique-pelerinage/historique-pelerinage.module').then(m => m.HistoriquePelerinageModule),
    pathMatch: 'full'
  },
  {
    path: 'substitut-pelerinage',
    loadChildren: () => import('./substitut-pelerinage/substitut-pelerinage.module').then(m => m.SubstitutPelerinageModule),
  },
  {
    path: 'tirage-pelerinage',
    loadChildren: () => import('./tirage-pelerinage/tirage-pelerinage.module').then(m => m.TiragePelerinageModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PelerinageRoutingModule { }
