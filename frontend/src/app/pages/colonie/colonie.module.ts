import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColonieRoutingModule } from './colonie-routing.module';
import { DossierColonieModule } from './dossier-colonie/dossier-colonie.module';
import { ParticipantModule } from './participant/participant.module';
import { SatisfactionModule } from './satisfaction/satisfaction.module';
import { SuiviColonieModule } from './suivi-colonie/suivi-colonie.module';


@NgModule({
  declarations: [
],
  imports: [
    CommonModule,
    ColonieRoutingModule,
    DossierColonieModule,
    ParticipantModule,
    SatisfactionModule,
    SuiviColonieModule
  ]
})
export class ColonieModule { }
