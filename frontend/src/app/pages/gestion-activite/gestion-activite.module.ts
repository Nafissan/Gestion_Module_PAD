import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionActiviteRoutingModule } from './gestion-activite-routing.module';
import { ActiviteRoutingModule } from './activite/activite-routing.module';
import { EvenementRoutingModule } from './evenement/evenement-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GestionActiviteRoutingModule,
    ActiviteRoutingModule,
    EvenementRoutingModule,
    
  ]
})
export class GestionActiviteModule { }
