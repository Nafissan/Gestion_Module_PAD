import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../shared/services/authguard.service';
import { ListEvenementComponent } from './list-evenement/list-evenement.component'
import { AddOrUpdateEvenementComponent } from './add-or-update-evenement/add-or-update-evenement.component'
import { DetailsEvenementComponent } from './details-evenement/details-evenement.component'
import { CalendrierEvenementComponent } from './calendrier-evenement/calendrier-evenement.component';







const routes: Routes = [
  {
    path: '', component: ListEvenementComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-evenement', component: ListEvenementComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-evenement', component: AddOrUpdateEvenementComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-evenement', component: DetailsEvenementComponent, canActivate: [AuthGuard],
  },
  {
    path: 'calendrier-evenement', component: CalendrierEvenementComponent, canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvenementRoutingModule { }
