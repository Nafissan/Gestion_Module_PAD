import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path: 'dossier-absence',
    loadChildren: () => import('./dossier-absence/dossier-absence.module').then(m => m.DossierAbsenceModule),
    pathMatch: 'full'
  },
  {
    path: 'absence',
    loadChildren: () => import('./absence/absence.module').then(m => m.AbsenceModule),
    pathMatch: 'full'
  },
  {
    path: 'etape-absence',
    loadChildren: () => import('./etapeabsence/etapeabsence.module').then(m => m.EtapeabsenceModule),
    // pathMatch: 'full'
  },
  {
    path: 'motif-absence',
    loadChildren: () => import('./motif-absence/motif-absence.module').then(m => m.MotifAbsenceModule),
    pathMatch: 'full'
  },
  {
    path: 'planning-absence',
    loadChildren: () => import('./planning-absence/planning-absence.module').then(m => m.PlanningAbsenceModule),
    pathMatch: 'full'
  },
  {
    path: 'suivi-absence',
    loadChildren: () => import('./suivi-absence/suivi-absence.module').then(m => m.SuiviAbsenceModule),
    pathMatch: 'full'
  },
  {
    path: 'valider-absence',
    loadChildren: () => import('./valider-absence/valider-absence.module').then(m => m.ValiderAbsenceModule),
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionAbsenceRoutingModule { }
