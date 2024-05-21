import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesCongesComponent } from './mes-conges/mes-conges.component';
import { MesAbsencesComponent } from './mes-absences/mes-absences.component';
import { EspaceSalariesPadRoutingModule } from './espace-salaries-pad-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from '@angular/material/core';
import { momentAdapterFactory } from '../apps/calendar/calendar.module';
import { ScrollbarModule } from 'src/@fury/shared/scrollbar/scrollbar.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { InformationsAgentsComponent } from './informations-agents/informations-agents.component';
import { MesInterimsComponent } from './mes-interims/mes-interims.component';
import { MesDemandesAtestationComponent } from './mes-demandes-atestation/mes-demandes-atestation.component';
import { AjoutDemandeCongeComponent } from './ajout-demande-conge/ajout-demande-conge.component';
import { AjoutDemandeAbsenceComponent } from './ajout-demande-absence/ajout-demande-absence.component';
import { AjoutDemandeAttestationComponent } from './ajout-demande-attestation/ajout-demande-attestation.component';
import { AjoutDemandeInterimComponent } from './ajout-demande-interim/ajout-demande-interim.component';


@NgModule({
  declarations: [MesAbsencesComponent,MesCongesComponent, InformationsAgentsComponent,
     MesInterimsComponent, MesDemandesAtestationComponent,AjoutDemandeAbsenceComponent,
     AjoutDemandeCongeComponent, AjoutDemandeAttestationComponent, AjoutDemandeInterimComponent,
     ],
  imports: [
    CommonModule,
    EspaceSalariesPadRoutingModule,
    FormsModule,
    MaterialModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    FurySharedModule,
    FuryCardModule,
    MatTabsModule,
    PageLayoutDemoContentModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory
    }),
    ScrollbarModule,
    // Core
    ListModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
  ]
})
export class EspaceSalariesPadModule { }
