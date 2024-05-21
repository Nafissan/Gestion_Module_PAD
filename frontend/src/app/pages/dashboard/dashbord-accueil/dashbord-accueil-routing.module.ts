import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordAccueilRoutingModule { }
