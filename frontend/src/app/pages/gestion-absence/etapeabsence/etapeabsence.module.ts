import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtapeabsenceRoutingModule } from './etapeabsence-routing.module';
import { DetailsEtapeabsenceComponent } from './details-etapeabsence/details-etapeabsence.component';
import { AddEtapeabsenceComponent } from './add-etapeabsence/add-etapeabsence.component';
import { ListEtapeabsenceComponent } from './list-etapeabsence/list-etapeabsence.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { RejeterAbsenceComponent } from './rejeter-absence/rejeter-absence.component';
import { HistoriqueAbsenceComponent } from './historique-absence/historique-absence.component';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { ImputerAbsenceComponent } from './imputer-absence/imputer-absence.component';
import { DemandeTraiteeComponent } from './demande-traitee/demande-traitee.component';


@NgModule({
  declarations: [DetailsEtapeabsenceComponent, AddEtapeabsenceComponent, ListEtapeabsenceComponent, RejeterAbsenceComponent, HistoriqueAbsenceComponent, ImputerAbsenceComponent, DemandeTraiteeComponent],
  imports: [
    CommonModule,
    EtapeabsenceRoutingModule,
    MaterialModule,
    FurySharedModule,
    FuryCardModule,
    MatTabsModule,
    PageLayoutDemoContentModule,
    MatExpansionModule,
    FormsModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
  ],
  exports:[
    ListEtapeabsenceComponent, DemandeTraiteeComponent
  ]
})
export class EtapeabsenceModule { }
