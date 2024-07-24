import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDossierPelerinageComponent } from './list-dossier-pelerinage/list-dossier-pelerinage.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AddOrUpdateDossierPelerinageComponent } from './add-or-update-dossier-pelerinage/add-or-update-dossier-pelerinage.component';
import { DetailsDossierPelerinageComponent } from './details-dossier-pelerinage/details-dossier-pelerinage.component';
import { ReadFileDossierPelerinageComponent } from './read-file-dossier-pelerinage/read-file-dossier-pelerinage.component';


const routes: Routes = [
  {
    path: '', component: ListDossierPelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'liste-dossier-pelerinage', component: ListDossierPelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-or-update-dossier-pelerinage', component: AddOrUpdateDossierPelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-dossier-pelerinage', component: DetailsDossierPelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'read-file-dossier-pelerinage', component: ReadFileDossierPelerinageComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DossierPelerinageRoutingModule { }
