import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AddAquisitionLaitComponent } from './add-aquisition-lait/add-aquisition-lait.component';


const routes: Routes = [

  {
    path: '', component: AddAquisitionLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-acquisition-lait', component: AddAquisitionLaitComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcquisitionLaitRoutingModule { }
