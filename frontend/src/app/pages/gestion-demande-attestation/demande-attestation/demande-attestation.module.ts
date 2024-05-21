import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandeAttestationRoutingModule } from './demande-attestation-routing.module';
import { AddAttestationComponent } from './add-attestation/add-attestation.component';
import { ListAttestationComponent } from './list-attestation/list-attestation.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { DetailDemandeAttestationComponent } from './detail-demande-attestation/detail-demande-attestation.component';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { ValiderAttestationComponent } from './valider-attestation/valider-attestation.component';
import { RejeterAttestationComponent } from './rejeter-attestation/rejeter-attestation.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [AddAttestationComponent, ListAttestationComponent, DetailDemandeAttestationComponent, ValiderAttestationComponent,RejeterAttestationComponent],
  imports: [
    CommonModule,
    DemandeAttestationRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    FuryCardModule,
    MatTabsModule,
    PageLayoutDemoContentModule,
     // Core
     MatExpansionModule,
     ListModule,
     BreadcrumbsModule,
     ReactiveFormsModule,
  ],
  exports : [ListAttestationComponent]
})
export class DemandeAttestationModule { }
