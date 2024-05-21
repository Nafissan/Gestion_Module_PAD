import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametrageRoutingModule } from './parametrage-routing.module';
import { ContinentModule } from './continent/continent.module';
import { PaysModule } from './pays/pays.module';
import { ZoneModule } from './zone/zone.module';
import { TypePartenariatModule } from './type-partenariat/type-partenariat.module';
import { VilleModule } from './ville/ville.module';
import { TypeDotationLaitModule } from './type-dotation-lait/type-dotation-lait.module';
import { FournisseurLaitModule } from './fournisseur-lait/fournisseur-lait.module';
import { MarqueLaitModule } from './marque-lait/marque-lait.module';
import { CategorieLaitModule } from './categorie-lait/categorie-lait.module';
import { DomaineModule } from './domaine/domaine.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ParametrageRoutingModule,
    ContinentModule,
    PaysModule,
    ZoneModule,
    TypePartenariatModule,
    VilleModule,
    TypeDotationLaitModule,
    FournisseurLaitModule,
    MarqueLaitModule,
    CategorieLaitModule,
    DomaineModule,
  ]
})
export class  ParametrageModule { }
