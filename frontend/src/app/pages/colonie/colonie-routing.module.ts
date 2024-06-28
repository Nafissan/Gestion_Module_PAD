import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'dossier-colonie',
    loadChildren: () => import('./dossier-colonie/dossier-colonie.module').then(m => m.DossierColonieModule),
    pathMatch: 'full'
  },
  {
    path: 'participant',
    loadChildren: () => import('./participant/participant.module').then(m => m.ParticipantModule),
  },
  {
    path: 'satisfaction',
    loadChildren: () => import('./satisfaction/satisfaction.module').then(m => m.SatisfactionModule),
    pathMatch: 'full'
  },
  {
    path: 'suivi-colonie',
    loadChildren: () => import('./suivi-colonie/suivi-colonie.module').then(m => m.SuiviColonieModule),
    pathMatch: 'full'
  },
  {
    path: 'historique-colonie',
    loadChildren: () => import('./historique-colonie/historique-colonie.module').then(m => m.HistoriqueColonieModule),
    pathMatch: 'full'
  },
  {
    path: 'tableau-statistique',
    loadChildren: () => import('./tableau-statistique/tableau-statistique.module').then(m => m.TableauStatistiqueModule),
    pathMatch: 'full'
  },
  {
    path: 'colon',
    loadChildren: () => import('./colon/colon.module').then(m => m.ColonModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColonieRoutingModule { }
