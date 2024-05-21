import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../shared/services/authguard.service';
import {ListPartenariatComponent} from './list-partenariat/list-partenariat.component'
import {AddOrUpdatePartenariatComponent} from './add-or-update-partenariat/add-or-update-partenariat.component'
import {DetailsPartenariatComponent} from './details-partenariat/details-partenariat.component'

const routes: Routes = [
  {
    path: '', component: ListPartenariatComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-partenariat', component: ListPartenariatComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-partenariat', component: AddOrUpdatePartenariatComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-partenariat', component: DetailsPartenariatComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartenariatRoutingModule { }
