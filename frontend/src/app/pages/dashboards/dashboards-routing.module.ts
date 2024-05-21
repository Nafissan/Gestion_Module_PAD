import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';


const routes: Routes = [
  {
    path: 'partenariat',
    loadChildren: () => import('./dashboards-partenariat/dashboards-partenariat.module').then(m => m.DashboardsPartenariatModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
