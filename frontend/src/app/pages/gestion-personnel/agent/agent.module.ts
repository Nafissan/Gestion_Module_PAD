import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { CreateUpdateAgentComponent } from './create-update-agent/create-update-agent.component';
import { ListAgentComponent } from './list-agent/list-agent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ImportAgentComponent } from './import-agent/import-agent.component';
import { MatTableExporterModule } from 'mat-table-exporter';


@NgModule({
  declarations: [CreateUpdateAgentComponent, ListAgentComponent, ImportAgentComponent],
  imports: [
    CommonModule,
    AgentRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    MatTableExporterModule,
    // Core
    ListModule,
    BreadcrumbsModule,
    ReactiveFormsModule,
  ]
})
export class AgentModule { }
