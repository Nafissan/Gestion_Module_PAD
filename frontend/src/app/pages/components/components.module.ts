import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { HighlightModule } from '../../../@fury/shared/highlightjs/highlight.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ScrollbarModule } from '../../../@fury/shared/scrollbar/scrollbar.module';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { DemoDialogComponent, DialogsComponent } from './dialogs/dialogs.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { InputComponent } from './input/input.component';
import { ListsComponent } from './lists/lists.component';
import { MenuComponent } from './menu/menu.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ProgressComponent } from './progress/progress.component';
import { RadioComponent } from './radio/radio.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { SliderComponent } from './slider/slider.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { FurySharedModule } from '../../../@fury/fury-shared.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    FurySharedModule,
    ReactiveFormsModule,
    MaterialModule,

    // Core
    HighlightModule,
    ScrollbarModule,
    BreadcrumbsModule
  ],
  declarations: [
    ComponentsComponent,
    AutocompleteComponent,
    ButtonsComponent,
    CardsComponent,
    CheckboxComponent,
    DialogsComponent,
    DemoDialogComponent,
    InputComponent,
    GridListComponent,
    ListsComponent,
    MenuComponent,
    ProgressComponent,
    ProgressSpinnerComponent,
    RadioComponent,
    SliderComponent,
    SnackBarComponent,
    TooltipComponent,
    SlideToggleComponent,
  ],
  entryComponents: [DemoDialogComponent]
})
export class ComponentsModule {
}
