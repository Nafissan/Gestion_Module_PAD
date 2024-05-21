import { ListNotificationComponent } from './list-notification/list-notification.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AddOrUpdateNotificationComponent } from './add-or-update-notification/add-or-update-notification.component';


const routes: Routes = [

  {
    path: '', component: ListNotificationComponent, canActivate: [AuthGuard],
  },
  {
    path: 'list-notification', component: ListNotificationComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-notification', component: AddOrUpdateNotificationComponent, canActivate: [AuthGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
      