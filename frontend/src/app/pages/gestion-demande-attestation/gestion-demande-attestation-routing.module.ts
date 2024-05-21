import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'suivi-attestation',
    loadChildren: () => import('./suivi-attestation/suivi-attestation.module').then(m => m.SuiviAttestationModule),
    pathMatch: 'full'
  },
  {
    path: 'demande-attestation',
    loadChildren: () => import('./demande-attestation/demande-attestation.module').then(m => m.DemandeAttestationModule),
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionDemandeAttestationRoutingModule { }
