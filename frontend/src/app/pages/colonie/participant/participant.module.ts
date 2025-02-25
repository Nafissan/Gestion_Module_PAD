import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipantRoutingModule } from './participant-routing.module';
import { ListeParticipantComponent } from './liste-participant/liste-participant.component';
import { AddOrUpdateParticipantComponent } from './add-or-update-participant/add-or-update-participant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { ReadFileParticipantComponent } from './read-file-participant/read-file-participant.component';
import { DetailsParticipantComponent } from './details-participant/details-participant.component';


@NgModule({
  declarations: [ListeParticipantComponent, AddOrUpdateParticipantComponent, ReadFileParticipantComponent, DetailsParticipantComponent],
  imports: [
    CommonModule,
    ParticipantRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    FuryCardModule,
    MatTabsModule,
    PageLayoutDemoContentModule,
    MatExpansionModule,
    // Core
    ListModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
  ],

  
})
export class ParticipantModule { }
