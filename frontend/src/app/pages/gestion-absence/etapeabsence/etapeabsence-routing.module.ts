import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEtapeabsenceComponent } from './list-etapeabsence/list-etapeabsence.component';
import { AuthGuard } from '../../../shared/services/authguard.service';
import { AddEtapeabsenceComponent } from './add-etapeabsence/add-etapeabsence.component';
import { DemandeTraiteeComponent } from './demande-traitee/demande-traitee.component';
import { DetailsAbsenceComponent } from '../absence/details-absence/details-absence.component';


const routes: Routes = [
  {
    path: '', component: ListEtapeabsenceComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-etapeabsence', component: ListEtapeabsenceComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-etapeabsence', component: AddEtapeabsenceComponent, canActivate: [AuthGuard],
  },
  {
    path: 'demande-traitee', component: DemandeTraiteeComponent, canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtapeabsenceRoutingModule { }
