import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DossierPelerinageModule} from './dossier-pelerinage/dossier-pelerinage.module'
import { PelerinageRoutingModule } from './pelerinage-routing.module';
import { HistoriquePelerinageModule} from './historique-pelerinage/historique-pelerinage.module'
import { SatisfactionPelerinageModule} from './satisfaction-pelerinage/satisfaction-pelerinage.module'
import { PelerinPelerinageModule} from './pelerin-pelerinage/pelerin-pelerinage.module'
import { StatistiquePelerinageModule} from './statistique-pelerinage/statistique-pelerinage.module'
import { SubstitutPelerinageModule} from './substitut-pelerinage/substitut-pelerinage.module'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PelerinageRoutingModule,
    DossierPelerinageModule,
    HistoriquePelerinageModule,
    PelerinPelerinageModule,
    SatisfactionPelerinageModule,
    StatistiquePelerinageModule,
    SubstitutPelerinageModule,

  ]
})
export class PelerinageModule { }
