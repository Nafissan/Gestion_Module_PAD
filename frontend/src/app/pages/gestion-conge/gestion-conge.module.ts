import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionCongeRoutingModule } from './gestion-conge-routing.module';
import { DossierCongeModule } from './dossier-conge/dossier-conge.module';
import { PlanningCongeModule } from './planning-conge/planning-conge.module';
import { CongeModule } from './conge/conge.module';
import { SuiviCongeModule } from './suivi-conge/suivi-conge.module';
import { PlanningDirectionModule } from './planning-direction/planning-direction.module';
import { EnvoiPlanningModule } from './envoi-planning/envoi-planning.module';
import { ValiderPlanningModule } from './valider-planning/valider-planning.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GestionCongeRoutingModule,
    DossierCongeModule,
    PlanningCongeModule,
    CongeModule,
    SuiviCongeModule,
    PlanningDirectionModule,
    EnvoiPlanningModule,
    ValiderPlanningModule,
  ],
})
export class GestionCongeModule { }
