import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'partenariat',
    loadChildren: () => import('./partenariat/partenariat.module').then(m => m.PartenariatModule),
    pathMatch: 'full'
  },

  {
    path: 'convention',
    loadChildren: () => import('./convention/convention.module').then(m => m.ConventionModule),
    pathMatch: 'full'
  },

  {
    path: 'plan-prospection',
    loadChildren: () => import('./plan-prospection/plan-prospection.module').then(m => m.PlanProspectionModule),
    pathMatch: 'full'
  },
  {
    path: 'comite',
    loadChildren: () => import('./comite/comite.module').then(m => m.ComiteModule),
    pathMatch: 'full'
  },
  {
    path: 'pointfocal',
    loadChildren: () => import('./pointfocal/pointfocal.module').then(m => m.PointfocalModule),
    pathMatch: 'full'
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionPartenariatRoutingModule { }
