import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DotationLaitRoutingModule } from './dotation-lait-routing.module';
import { DemandeLaitModule } from './demande-lait/demande-lait.module';
import { SuiviDemandeLaitModule } from './suivi-demande-lait/suivi-demande-lait.module';
import { SuiviStockLaitModule } from './suivi-stock-lait/suivi-stock-lait.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DotationLaitRoutingModule,
    DemandeLaitModule,
    SuiviDemandeLaitModule,
    SuiviStockLaitModule
  ]
})
export class DotationLaitModule { }
