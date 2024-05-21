import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxMailListComponent } from './inbox-mail-list/inbox-mail-list.component';
import { InboxMailComponent } from './inbox-mail/inbox-mail.component';
import { InboxComponent } from './inbox.component';

const routes: Routes = [
  {
    path: '',
    component: InboxComponent,
    children: [
      {
        path: '',
        redirectTo: 'primary',
        pathMatch: 'full',
        data: {
          scrollDisabled: true
        }
      },
      {
        path: ':category',
        component: InboxMailListComponent,
        data: {
          scrollDisabled: true
        }
      },
      {
        path: 'mail/:id',
        component: InboxMailComponent,
        data: {
          scrollDisabled: true
        }
      }
    ],
    data: {
      scrollDisabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule {
}
