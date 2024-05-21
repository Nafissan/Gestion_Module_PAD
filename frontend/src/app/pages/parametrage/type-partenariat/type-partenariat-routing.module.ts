import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AddTypePartenariatComponent } from './add-type-partenariat/add-type-partenariat.component';
import { DetailsTypePartenariatComponent } from './details-type-partenariat/details-type-partenariat.component';
import { ListTypePartenariatComponent } from './list-type-partenariat/list-type-partenariat.component';


export const routes: Routes = [
  {
    path: '', component: ListTypePartenariatComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-type-partenariat', component: ListTypePartenariatComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-type-partenariat', component: AddTypePartenariatComponent, canActivate: [AuthGuard],
  },
  {
    path: 'details-type-partenariat', component: DetailsTypePartenariatComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypePartenariatRoutingModule { }
