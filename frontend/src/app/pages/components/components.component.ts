import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../../layout/layout.service';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DialogsComponent } from './dialogs/dialogs.component';
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
import { ScrollbarComponent } from '../../../@fury/shared/scrollbar/scrollbar.component';
import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../@fury/animations/fade-in-right.animation';
import { ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'fury-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation]
})
export class ComponentsComponent implements OnInit {

  menuWidth = '250px';

  @ViewChild(AutocompleteComponent, { read: ElementRef, static: true }) private autocomplete: ElementRef;
  @ViewChild(ButtonsComponent, { read: ElementRef, static: true }) private buttons: ElementRef;
  @ViewChild(CardsComponent, { read: ElementRef, static: true }) private cards: ElementRef;
  @ViewChild(CheckboxComponent, { read: ElementRef, static: true }) private checkbox: ElementRef;
  @ViewChild(DialogsComponent, { read: ElementRef, static: true }) private dialogs: ElementRef;
  @ViewChild(GridListComponent, { read: ElementRef, static: true }) private gridList: ElementRef;
  @ViewChild(InputComponent, { read: ElementRef, static: true }) private input: ElementRef;
  @ViewChild(ListsComponent, { read: ElementRef, static: true }) private lists: ElementRef;
  @ViewChild(MenuComponent, { read: ElementRef, static: true }) private menu: ElementRef;
  @ViewChild(ProgressComponent, { read: ElementRef, static: true }) private progress: ElementRef;
  @ViewChild(ProgressSpinnerComponent, { read: ElementRef, static: true }) private progressSpinner: ElementRef;
  @ViewChild(RadioComponent, { read: ElementRef, static: true }) private radio: ElementRef;
  @ViewChild(SliderComponent, { read: ElementRef, static: true }) private slider: ElementRef;
  @ViewChild(SlideToggleComponent, { read: ElementRef, static: true }) private slideToggle: ElementRef;
  @ViewChild(SnackBarComponent, { read: ElementRef, static: true }) private snackBar: ElementRef;
  @ViewChild(TooltipComponent, { read: ElementRef, static: true }) private tooltip: ElementRef;

  @ViewChild('contentScroll', { read: ScrollbarComponent }) private contentScroll: ScrollbarComponent;

  constructor(private layoutService: LayoutService,
              private scrollDispatcher: ScrollDispatcher,
              private elem: ElementRef) {
  }

  ngOnInit() {
  }

  scrollTo(elem: string) {
    this.scrollDispatcher.getAncestorScrollContainers(this.elem)[1].scrollTo({
      top: this[elem].nativeElement.offsetTop - 64 - 24,
      behavior: 'smooth'
    });
  }
}
