import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPelerinPelerinageComponent } from './list-pelerin-pelerinage/list-pelerin-pelerinage.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { DetailsPelerinPelerinageComponent } from './details-pelerin-pelerinage/details-pelerin-pelerinage.component';
import { AddOrUpdatePelerinPelerinageComponent } from './add-or-update-pelerin-pelerinage/add-or-update-pelerin-pelerinage.component';
import { ReadFilePelerinPelerinageComponent } from './read-file-pelerin-pelerinage/read-file-pelerin-pelerinage.component';


const routes: Routes = [
  {
    path: '', component: ListPelerinPelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'liste-pelerin-pelerinage', component: ListPelerinPelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-pelerin-pelerinage', component: DetailsPelerinPelerinageComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-pelerin-pelerinage', component: AddOrUpdatePelerinPelerinageComponent, canActivate: [AuthGuard],
  },
  { path: 'read-file-pelerin', component: ReadFilePelerinPelerinageComponent , canActivate: [AuthGuard] }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PelerinPelerinageRoutingModule { }
