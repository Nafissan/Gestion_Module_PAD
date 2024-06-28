import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListColonComponent } from './list-colon/list-colon.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { DetailsColonComponent } from './details-colon/details-colon.component';
import { ReadFileColonComponent } from './read-file-colon/read-file-colon.component';


const routes: Routes = [
  {
    path: '', component: ListColonComponent, canActivate: [AuthGuard],
  },
  {
    path: 'liste-colon-colonie', component: ListColonComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-colon-colonie', component: DetailsColonComponent, canActivate: [AuthGuard],
  },
  { path: 'read-file-colon', component: ReadFileColonComponent , canActivate: [AuthGuard] }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColonRoutingModule { }
