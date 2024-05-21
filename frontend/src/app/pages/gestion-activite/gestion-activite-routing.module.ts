import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'activite',
    loadChildren: () => import('./activite/activite.module').then(m => m.ActiviteModule),
    pathMatch: 'full'
  },
  {
    path: 'evenement',
    loadChildren: () => import('./evenement/evenement.module').then(m => m.EvenementModule),
    pathMatch: 'full'
  },
  // {
  //   path: 'evenement-calendrier',
  //   loadChildren: () => import('./evenement/calendrier/calendrier.module').then(m => m.CalendrierModule),
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionActiviteRoutingModule { }
