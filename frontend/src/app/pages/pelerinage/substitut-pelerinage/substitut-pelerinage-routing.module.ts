import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSubstitutPelerinageComponent } from './list-substitut-pelerinage/list-substitut-pelerinage.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { DetailSubstitutPelerinageComponent } from './detail-substitut-pelerinage/detail-substitut-pelerinage.component';


const routes: Routes = [
  {
    path: '', component: ListSubstitutPelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'liste-substitut-pelerinage', component: ListSubstitutPelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-substitut-pelerinage', component: DetailSubstitutPelerinageComponent, canActivate: [AuthGuard],
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubstitutPelerinageRoutingModule { }
