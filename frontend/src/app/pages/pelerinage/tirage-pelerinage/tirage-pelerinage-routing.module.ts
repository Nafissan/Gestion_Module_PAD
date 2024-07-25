import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTiragePelerinageComponent } from './list-tirage-pelerinage/list-tirage-pelerinage.component';
import { DetailsTiragePelerinageComponent } from './details-tirage-pelerinage/details-tirage-pelerinage.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';


const routes: Routes = [
  {
    path: '', component: ListTiragePelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'liste-tirage-pelerinage', component: ListTiragePelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-tirage-pelerinage', component: DetailsTiragePelerinageComponent, canActivate: [AuthGuard],
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiragePelerinageRoutingModule { }
