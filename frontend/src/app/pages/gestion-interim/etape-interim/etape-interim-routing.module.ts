import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEtapeInterimComponent } from './list-etape-interim/list-etape-interim.component';
import { AddEtapeInterimComponent } from './add-etape-interim/add-etape-interim.component';
import { DetailsEtapeInterimComponent } from './details-etape-interim/details-etape-interim.component';
import { AuthGuard } from '../../../shared/services/authguard.service';

  export const routes: Routes = [
    {
      path: '', component: ListEtapeInterimComponent
    },
    {
      path: 'list-etape-interim', component: ListEtapeInterimComponent, canActivate: [AuthGuard],
    },
    {
      path: 'add-etape-interim', component: AddEtapeInterimComponent, canActivate: [AuthGuard],
    },
    {
      path: 'details-etape-interim', component: DetailsEtapeInterimComponent, canActivate: [AuthGuard],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtapeInterimRoutingModule { }
