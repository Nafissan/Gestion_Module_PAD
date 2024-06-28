import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColonieRoutingModule } from './colonie-routing.module';
import { DossierColonieModule } from './dossier-colonie/dossier-colonie.module';
import { ParticipantModule } from './participant/participant.module';
import { SatisfactionModule } from './satisfaction/satisfaction.module';
import { SuiviColonieModule } from './suivi-colonie/suivi-colonie.module';
import { HistoriqueColonieModule } from './historique-colonie/historique-colonie.module';
import { TableauStatistiqueModule } from './tableau-statistique/tableau-statistique.module';
import { ColonModule } from './colon/colon.module';


@NgModule({
  declarations: [
],
  imports: [
    CommonModule,
    ColonieRoutingModule,
    DossierColonieModule,
    ParticipantModule,
    SatisfactionModule,
    SuiviColonieModule,
    HistoriqueColonieModule,
    TableauStatistiqueModule,
    ColonModule
  ]
})
export class ColonieModule { }
