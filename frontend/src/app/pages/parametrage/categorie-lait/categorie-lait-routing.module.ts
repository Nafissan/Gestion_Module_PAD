import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AddOrUpdateCategorieLaitComponent } from './add-or-update-categorie-lait/add-or-update-categorie-lait.component';
import { ListCategorieLaitComponent } from './list-categorie-lait/list-categorie-lait.component';

const routes: Routes = [
  {
    path: '', component: ListCategorieLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-categorie-lait', component: ListCategorieLaitComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-categorie-lait', component: AddOrUpdateCategorieLaitComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorieLaitRoutingModule { }
