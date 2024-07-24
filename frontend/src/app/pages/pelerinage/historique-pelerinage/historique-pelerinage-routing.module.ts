import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListHistoriquePelerinageComponent } from './list-historique-pelerinage/list-historique-pelerinage.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { ReadFileHistoriquePelerinageComponent } from './read-file-historique-pelerinage/read-file-historique-pelerinage.component';
import { ListPelerinPelerinageComponent } from './list-pelerin-pelerinage/list-pelerin-pelerinage.component';
import { DetailsHistoriquePelerinageComponent } from './details-historique-pelerinage/details-historique-pelerinage.component';


const routes: Routes = [
  {
    path: '', component: ListHistoriquePelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'liste-historique-pelerinage', component: ListHistoriquePelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'liste-pelerin-pelerinage', component: ListPelerinPelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-historique-pelerinage', component: DetailsHistoriquePelerinageComponent, canActivate: [AuthGuard],
  },
  { path: 'read-file-historique-pelerinage', component: ReadFileHistoriquePelerinageComponent , canActivate: [AuthGuard] }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriquePelerinageRoutingModule { }
