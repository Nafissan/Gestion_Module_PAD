import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDossierColonieComponent } from './add-dossier-colonie/add-dossier-colonie.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';


const routes: Routes = [
 
  {
    path: 'add-dossier-colonie', component: AddDossierColonieComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossierColonieRoutingModule { }
