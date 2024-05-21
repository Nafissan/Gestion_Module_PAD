import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAttestationComponent } from './list-attestation/list-attestation.component';
import { AddAttestationComponent } from './add-attestation/add-attestation.component';
import { DetailDemandeAttestationComponent } from './detail-demande-attestation/detail-demande-attestation.component';
import { AuthGuard } from '../../../shared/services/authguard.service';




const routes: Routes = [
  {
    path: '', component: ListAttestationComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-attestation', component: ListAttestationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-attestation', component: AddAttestationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'details-demande-attestation', component: DetailDemandeAttestationComponent, canActivate: [AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandeAttestationRoutingModule { }
