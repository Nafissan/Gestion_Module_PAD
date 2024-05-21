import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAgentComponent } from './list-agent/list-agent.component';
import { CreateUpdateAgentComponent } from './create-update-agent/create-update-agent.component';
import { AuthGuard } from '../../../shared/services/authguard.service';


export const routes: Routes = [
  {
    path: '', component: ListAgentComponent, canActivate: [AuthGuard]
  },
  {
    path: 'list-agent', component: ListAgentComponent, canActivate: [AuthGuard],
  },
  {
    path: 'create-update-agent', component: CreateUpdateAgentComponent, canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
