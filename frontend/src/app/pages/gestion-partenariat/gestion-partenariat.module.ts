import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionPartenariatRoutingModule } from './gestion-partenariat-routing.module';
import { PartenariatModule } from './partenariat/partenariat.module';
import { ConventionModule } from './convention/convention.module';
import { PlanProspectionModule } from './plan-prospection/plan-prospection.module';
import { ComiteModule } from './comite/comite.module';
import { PointfocalModule } from './pointfocal/pointfocal.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GestionPartenariatRoutingModule,
    PartenariatModule,
    ConventionModule,
    PlanProspectionModule,
    ComiteModule,
    PointfocalModule,    
  ]
})
export class GestionPartenariatModule { }
