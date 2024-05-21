import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanProspectionRoutingModule } from './plan-prospection-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListPlanProspectionComponent } from './list-plan-prospection/list-plan-prospection.component';
import { AddOrUpdatePlanProspectionComponent } from './add-or-update-plan-prospection/add-or-update-plan-prospection.component';
import {DetailsPlanProspectionComponent } from './details-plan-prospection/details-plan-prospection.component';
import { ListBesoinComponent } from './suivi-plan-prospection/list-besoin/list-besoin.component';
import { AddOrUpdateBesoinComponent } from './suivi-plan-prospection/add-or-update-besoin/add-or-update-besoin.component';
import { DetailsBesoinComponent } from './suivi-plan-prospection/details-besoin/details-besoin.component';
import { ListProspectComponent } from './suivi-prospect/list-prospect/list-prospect.component';
import { AddOrUpdateActionComponent } from './suivi-prospect/add-or-update-action/add-or-update-action.component';

@NgModule({
  declarations: [ListPlanProspectionComponent,AddOrUpdatePlanProspectionComponent,DetailsPlanProspectionComponent, AddOrUpdateBesoinComponent, DetailsBesoinComponent, ListBesoinComponent, ListProspectComponent, AddOrUpdateActionComponent],
  imports: [
    CommonModule,
    
    PlanProspectionRoutingModule,
    CommonModule,
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
    
  ]
})
export class PlanProspectionModule { }
