import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authguard.service';
import { AjoutDemandeAbsenceComponent } from './ajout-demande-absence/ajout-demande-absence.component';
import { AjoutDemandeCongeComponent } from './ajout-demande-conge/ajout-demande-conge.component';
import { InformationsAgentsComponent } from './informations-agents/informations-agents.component';
import { MesAbsencesComponent } from './mes-absences/mes-absences.component';
import { MesCongesComponent } from './mes-conges/mes-conges.component';
import { MesDemandesAtestationComponent } from './mes-demandes-atestation/mes-demandes-atestation.component';
import { MesInterimsComponent } from './mes-interims/mes-interims.component';


const routes: Routes = [
  {
    path: '', component: InformationsAgentsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'informations-agents', component: InformationsAgentsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'mes-absences', component: MesAbsencesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ajout-demande-absence', component: AjoutDemandeAbsenceComponent, canActivate: [AuthGuard]
  },
  {
    path: 'ajout-demande-conge', component: AjoutDemandeCongeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'mes-conges', component: MesCongesComponent, canActivate: [AuthGuard]
  },
  {
    path: 'mes-interims', component: MesInterimsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'mes-demandes-atestation', component: MesDemandesAtestationComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceSalariesPadRoutingModule { }
