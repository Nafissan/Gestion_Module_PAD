import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuideRoutingModule } from './guide-routing.module';
import { GuideComponent } from './guide.component';
import { MatTreeModule } from '@angular/material/tree';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [GuideComponent],
  imports: [
    CommonModule,
    GuideRoutingModule,
    MaterialModule,
    MatTreeModule,
    FormsModule
    
  ]
})
export class GuideModule { }
