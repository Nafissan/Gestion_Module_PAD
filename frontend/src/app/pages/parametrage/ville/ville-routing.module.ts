import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AddVilleComponent } from './add-ville/add-ville.component';
import { DetailsVilleComponent } from './details-ville/details-ville.component';
import { ListVilleComponent } from './list-ville/list-ville.component';


export const routes: Routes = [
  {
    path: '', component: ListVilleComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-ville', component: ListVilleComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-ville', component: AddVilleComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-ville', component: DetailsVilleComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VilleRoutingModule { }
