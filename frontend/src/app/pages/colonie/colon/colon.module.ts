import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListColonComponent } from './list-colon/list-colon.component';
import { DetailsColonComponent } from './details-colon/details-colon.component';
import { ReadFileColonComponent } from './read-file-colon/read-file-colon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';
import { FuryCardModule } from 'src/@fury/shared/card/card.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { PageLayoutDemoContentModule } from '../../page-layouts/components/page-layout-content/page-layout-demo-content.module';
import { ColonRoutingModule} from './colon-routing.module';


@NgModule({
  declarations: [ListColonComponent, DetailsColonComponent, ReadFileColonComponent],
  imports: [
    CommonModule,
    ColonRoutingModule,
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
export class ColonModule { }
