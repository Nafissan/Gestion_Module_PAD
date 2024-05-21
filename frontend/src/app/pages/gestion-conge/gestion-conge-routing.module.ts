import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'conge',
    loadChildren: () => import('./conge/conge.module').then(m => m.CongeModule),
    pathMatch: 'full'
  },
  {
    path: 'dossier-conge',
    loadChildren: () => import('./dossier-conge/dossier-conge.module').then(m => m.DossierCongeModule),
    pathMatch: 'full'
  },
  {
    path: 'planning-direction',
    loadChildren: () => import('./planning-direction/planning-direction.module').then(m => m.PlanningDirectionModule),
    pathMatch: 'full'
  },
  {
    path: 'planning-conge/:id',
    loadChildren: () => import('./planning-conge/planning-conge.module').then(m => m.PlanningCongeModule),
    pathMatch: 'full'
  },
  {
    path: 'suivi-conge',
    loadChildren: () => import('./suivi-conge/suivi-conge.module').then(m => m.SuiviCongeModule),
    pathMatch: 'full'
  },
  {
    path: 'envoi-planning',
    loadChildren: () => import('./envoi-planning/envoi-planning.module').then(m => m.EnvoiPlanningModule),
    pathMatch: 'full'
  },
  {
    path: 'valider-planning',
    loadChildren: () => import('./valider-planning/valider-planning.module').then(m => m.ValiderPlanningModule),
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionCongeRoutingModule { }
