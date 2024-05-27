import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeParticipantComponent } from './liste-participant/liste-participant.component';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AddOrUpdateParticipantComponent } from './add-or-update-participant/add-or-update-participant.component';
import { ReadFileParticipantComponent } from './read-file-participant/read-file-participant.component';


const routes: Routes = [
  {
    path: '', component: ListeParticipantComponent, canActivate: [AuthGuard],
  },
  {
    path: 'liste-participant-colonie', component: ListeParticipantComponent, canActivate: [AuthGuard],
  },
  {
    path: 'add-participant-colonie', component: AddOrUpdateParticipantComponent, canActivate: [AuthGuard],
  },
  { path: 'read-fiche-social', component: ReadFileParticipantComponent , canActivate: [AuthGuard] }, 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantRoutingModule { }
