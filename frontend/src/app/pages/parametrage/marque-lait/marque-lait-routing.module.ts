import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { ListMarqueLaitComponent } from './list-marque-lait/list-marque-lait.component';


const routes: Routes = [
  {
    path: '', component: ListMarqueLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-marque-lait', component: ListMarqueLaitComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarqueLaitRoutingModule { }
