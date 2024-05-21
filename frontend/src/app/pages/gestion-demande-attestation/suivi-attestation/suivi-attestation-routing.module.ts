import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeSuiviAttestationComponent } from './liste-suivi-attestation/liste-suivi-attestation.component';
import { AddSuiviAttestationComponent } from './add-suivi-attestation/add-suivi-attestation.component';
import { DetailsSuiviAttestationComponent } from './details-suivi-attestation/details-suivi-attestation.component';
import { AuthGuard } from '../../../shared/services/authguard.service';




const routes: Routes = [
  {
    path: '', component: ListeSuiviAttestationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'liste-suivi-attestation', component: ListeSuiviAttestationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-suivi-attestation', component: AddSuiviAttestationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'details-suivi-attestation', component: DetailsSuiviAttestationComponent, canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuiviAttestationRoutingModule { }
