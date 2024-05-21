import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashbord-accueil/dashbord-accueil.module').then(m => m.DashbordAccueilModule),
    pathMatch: 'full'
  },
  {
    path: 'dashbord-accueil',
    loadChildren: () => import('./dashbord-accueil/dashbord-accueil.module').then(m => m.DashbordAccueilModule),
   
  },
  {
    path: 'dashbord-conge',
    loadChildren: () => import('./dashbord-conge/dashbord-conge.module').then(m => m.DashbordCongeModule),

  },
  {
    path: 'dashbord-absence',
    loadChildren: () => import('./dashbord-absence/dashbord-absence.module').then(m => m.DashbordAbsenceModule),
  },
  {
    path: 'dashbord-attestation',
    loadChildren: () => import('./dashbord-attestation/dashbord-attestation.module').then(m => m.DashbordAttestationModule),
  },
  {
    path: 'dashbord-interim',
    loadChildren: () => import('./dashbord-interim/dashbord-interim.module').then(m => m.DashbordInterimModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
