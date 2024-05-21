import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembreRoutingModule } from './membre/membre-routing.module';
import {  GestionAssuranceRoutingModule } from './gestion-activite-routing.module';


@NgModule({
  declarations: [],
  imports: [
  CommonModule,
   MembreRoutingModule,
   GestionAssuranceRoutingModule,
  ]
})
export class GestionAssuranceModule { }
