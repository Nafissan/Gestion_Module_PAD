import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeHistoriqueColonieComponent } from './liste-historique-colonie/liste-historique-colonie.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { ReadHistoriqueColonieComponent } from './read-historique-colonie/read-historique-colonie.component';


const routes: Routes = [
  {
    path: '', component: ListeHistoriqueColonieComponent, canActivate: [AuthGuard],
  },
  {
    path: 'liste-historique-colonie', component: ListeHistoriqueColonieComponent, canActivate: [AuthGuard],
  },
  { path: 'read-historique-colonie', component: ReadHistoriqueColonieComponent , canActivate: [AuthGuard] }, 



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriqueColonieRoutingModule { }
