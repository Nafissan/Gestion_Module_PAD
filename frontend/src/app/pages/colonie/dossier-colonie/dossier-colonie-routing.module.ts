import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDossierColonieComponent } from './add-dossier-colonie/add-dossier-colonie.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { ListeDossierColonieComponent } from './liste-dossier-colonie/liste-dossier-colonie.component';
import { DetailsDossierColonieComponent } from './details-dossier-colonie/details-dossier-colonie.component';


const routes: Routes = [
  {
    path: '', component: ListeDossierColonieComponent, canActivate: [AuthGuard],
  },
  {
    path: 'liste-dossier-colonie', component: ListeDossierColonieComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-dossier-colonie', component: AddDossierColonieComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-dossier-colonie', component: DetailsDossierColonieComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossierColonieRoutingModule { }
