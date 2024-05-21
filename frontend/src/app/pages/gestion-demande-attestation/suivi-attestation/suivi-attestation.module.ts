import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { SuiviAttestationRoutingModule } from './suivi-attestation-routing.module';
import { AddSuiviAttestationComponent } from './add-suivi-attestation/add-suivi-attestation.component';
import { DetailsSuiviAttestationComponent } from './details-suivi-attestation/details-suivi-attestation.component';
import { ListeSuiviAttestationComponent } from './liste-suivi-attestation/liste-suivi-attestation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Agent } from '../../../shared/model/agent.model';
import { JoindreAttestationComponent } from './joindre-attestation/joindre-attestation.component';
import { DownloadAttestationComponent } from './download-attestation/download-attestation.component';

@NgModule({
  declarations: [AddSuiviAttestationComponent, DetailsSuiviAttestationComponent, ListeSuiviAttestationComponent, JoindreAttestationComponent, DownloadAttestationComponent],
  imports: [
    CommonModule,
    SuiviAttestationRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    FuryCardModule,
    MatTabsModule,
    MatExpansionModule,
    PageLayoutDemoContentModule,

    // Core
    ListModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
  ],
  exports : [ListeSuiviAttestationComponent]
})
export class SuiviAttestationModule { 
  agent: Agent;
}
