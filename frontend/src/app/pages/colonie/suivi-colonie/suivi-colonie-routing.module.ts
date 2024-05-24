import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeRapportProspectionComponent } from './liste-rapport-prospection/liste-rapport-prospection.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AddOrUpdateRapportProspectionComponent } from './add-or-update-rapport-prospection/add-or-update-rapport-prospection.component';
import { DetailsRapportProspectionComponent } from './details-rapport-prospection/details-rapport-prospection.component';
import { ValidationDchComponent } from './validation-dch/validation-dch.component';


const routes: Routes = [
  {
    path: '', component: ListeRapportProspectionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'liste-rapport-prospection', component: ListeRapportProspectionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-rapport-prospection', component: AddOrUpdateRapportProspectionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-rapport-prospection', component: DetailsRapportProspectionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'vadilder-rapport-prospection', component: ValidationDchComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuiviColonieRoutingModule { }
