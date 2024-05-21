import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFonctionComponent } from './add-fonction/add-fonction.component';
import { ListFonctionComponent } from './list-fonction/list-fonction.component';
import { AuthGuard } from '../../../shared/services/authguard.service';




const routes: Routes = [
  {
    path: '', component: ListFonctionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-fonction', component: ListFonctionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-fonction', component: AddFonctionComponent, canActivate: [AuthGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FonctionRoutingModule { }
