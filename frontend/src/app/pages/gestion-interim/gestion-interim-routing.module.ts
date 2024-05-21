import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'interim',
    loadChildren: () => import('./interim/interim.module').then(m => m.InterimModule),
    pathMatch: 'full'
  },  
  {
    path: 'etape-interim',
    loadChildren: () => import('./etape-interim/etape-interim.module').then(m => m.EtapeInterimModule),
    pathMatch: 'full'
  }, 
  {
    path: 'suivi-interim/:id',
    loadChildren: () => import('./suivi-interim/suivi-interim.module').then(m => m.SuiviInterimModule),
    pathMatch: 'full'
  }, 
  {
    path: 'suivi-interim',
    loadChildren: () => import('./suivi-interim/suivi-interim.module').then(m => m.SuiviInterimModule),
    pathMatch: 'full'
  }
  , 
  {
    path: 'dossier-interim',
    loadChildren: () => import('./dossier-interim/dossier-interim.module').then(m => m.DossierInterimModule),
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionInterimRoutingModule { }
