import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConventionsComponent } from './conventions/conventions.component';


const routes: Routes = [
  {
    path : '', 
    component : ConventionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsPartenariatRoutingModule { }
