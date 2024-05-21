/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { AfterViewInit, ElementRef, EventEmitter, OnInit, OnChanges, OnDestroy, NgZone, Renderer2, TemplateRef } from '@angular/core';
import { Align } from './models/align.interface';
import { Collision } from './models/collision.interface';
import { Offset } from './models/offset.interface';
import { Margin } from './models/margin.interface';
import { PositionMode } from './models/position-mode';
import { PopupAnimation } from './models/popup-animation.interface';
import { AlignService } from './services/align.service';
import { DOMService } from './services/dom.service';
import { PositionService } from './services/position.service';
import { ResizeService } from './services/resize.service';
import { ScrollableService } from './services/scrollable.service';
import { AnimationService } from './services/animation.service';
import { ResizeSensorComponent } from '@progress/kendo-angular-common';
/**
 * Represents the [Kendo UI Popup component for Angular]({% slug overview_popup %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <button #anchor (click)="show=!show">Toggle</button>
 *  <kendo-popup *ngIf="show" [anchor]="anchor">
 *      <strong>Popup content!</strong>
 *  </kendo-popup>
 * `
 * })
 * class AppComponent {
 *   public show: boolean = false;
 * }
 * ```
 */
export declare class PopupComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {
    container: ElementRef;
    private _alignService;
    domService: DOMService;
    private _positionService;
    private _resizeService;
    private _scrollableService;
    private animationService;
    private _renderer;
    private _zone;
    /**
     * Controls the Popup animation. By default, the opening and closing animations
     * are enabled ([see example]({% slug animations_popup %})).
     */
    animate: boolean | PopupAnimation;
    /**
     * Specifies the element that will be used as an anchor. The Popup opens next to that element.
     * ([see example]({% slug alignmentpositioning_popup %}#toc-aligning-to-components)).
     */
    anchor: ElementRef;
    /**
     * Specifies the anchor pivot point
     * ([see example]({% slug alignmentpositioning_popup %}#toc-positioning)).
     */
    anchorAlign: Align;
    /**
     * Configures the collision behavior of the Popup
     * ([see example]({% slug viewportboundarydetection_popup %})).
     */
    collision: Collision;
    /**
     * Specifies the pivot point of the Popup
     * ([see example]({% slug alignmentpositioning_popup %}#toc-positioning)).
     */
    popupAlign: Align;
    /**
     * Controls whether the component will copy the `anchor` font styles.
     */
    copyAnchorStyles: boolean;
    /**
     * Specifies a list of CSS classes that will be added to the internal
     * animated element ([see example]({% slug appearance_popup %})).
     *
     * > To style the content of the Popup, use this property binding.
     */
    popupClass: string | Array<string> | Object;
    /**
     * Specifies the position mode of the component. By default, the Popup uses fixed positioning.
     * To make the Popup acquire absolute positioning, set this option to `absolute`.
     *
     * > If you need to support mobile browsers with the zoom option,
     * use the `absolute` positioning of the Popup.
     *
     * @example
     * ```html
     * <style>
     *  .parent-content {
     *     position: relative;
     *     width: 200px;
     *     height: 200px;
     *     overflow: auto;
     *     margin: 200px auto;
     *     border: 1px solid red;
     *  }
     *  .content {
     *     position: relative;
     *     width: 100px;
     *     height: 100px;
     *     overflow: auto;
     *     margin: 300px;
     *     border: 1px solid blue;
     *  }
     *  .anchor {
     *     position: absolute;
     *     top: 200px;
     *     left: 200px;
     *  }
     * </style>
     * ```
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *   <div class="example-config">
     *      Position mode:
     *      <label><input type="radio" value="fixed" [(ngModel)]="mode" /> Fixed</label>
     *      <label><input type="radio" value="absolute" [(ngModel)]="mode" /> Absolute</label>
     *   </div>
     *   <div class="example-config">
     *       Append to
     *       <label>
     *           <input type="radio" name="place" [value]="1" [(ngModel)]="checked" />
     *           Root component
     *       </label>
     *       <label>
     *           <input type="radio" name="place" [value]="2" [(ngModel)]="checked" />
     *           <span style="color: red">Red Container</span>
     *       </label>
     *       <label>
     *           <input type="radio" name="place" [value]="3" [(ngModel)]="checked" />
     *           <span style="color: blue">Blue Container</span>
     *       </label>
     *   </div>
     *   <div class="example">
     *     <div class="parent-content" [scrollLeft]="250" [scrollTop]="230">
     *         <div class="content" [scrollLeft]="170" [scrollTop]="165">
     *           <button #anchor class="anchor" (click)="show = !show">Toggle</button>
     *           <kendo-popup [positionMode]="mode" [anchor]="anchor" (anchorViewportLeave)="show=false" *ngIf="show && checked === 3">
     *             <ul>
     *                 <li>Item1</li>
     *                 <li>Item2</li>
     *                 <li>Item3</li>
     *             </ul>
     *           </kendo-popup>
     *           <span style="position: absolute; top: 400px; left: 400px">Bottom/Right</span>
     *         </div>
     *         <kendo-popup [positionMode]="mode" [anchor]="anchor" (anchorViewportLeave)="show=false" *ngIf="show && checked === 2">
     *           <ul>
     *               <li>Item1</li>
     *               <li>Item2</li>
     *               <li>Item3</li>
     *           </ul>
     *         </kendo-popup>
     *         <span style="position: absolute; top: 600px; left: 600px">Bottom/Right</span>
     *     </div>
     *     <kendo-popup [positionMode]="mode" [anchor]="anchor" (anchorViewportLeave)="show=false" *ngIf="show && checked === 1">
     *       <ul>
     *           <li>Item1</li>
     *           <li>Item2</li>
     *           <li>Item3</li>
     *       </ul>
     *     </kendo-popup>
     *   </div>
     * `
     * })
     * class AppComponent {
     *   public checked: number = 3;
     *   public mode: string = 'absolute';
     *   public show: boolean = true;
     * }
     * ```
     */
    positionMode: PositionMode;
    /**
     * Specifies the absolute position of the element
     * ([see example]({% slug alignmentpositioning_popup %}#toc-aligning-to-absolute-points)).
     * The Popup opens next to that point. The Popup pivot point is defined by the `popupAlign` configuration option.
     * The boundary detection is applied by using the window viewport.
     */
    offset: Offset;
    /**
     * Specifies the margin value that will be added to the popup dimensions in pixels and leaves a blank space
     * between the popup and the anchor ([see example]({% slug alignmentpositioning_popup %}#toc-adding-a-margin)).
     */
    margin: Margin;
    /**
     * Fires when the anchor is scrolled outside the screen boundaries.
     * ([see example]({% slug closing_popup %}#toc-after-leaving-the-viewport)).
     */
    anchorViewportLeave: EventEmitter<any>;
    /**
     * Fires after the component is closed.
     */
    close: EventEmitter<any>;
    /**
     * Fires after the component is opened and the opening animation ends.
     */
    open: EventEmitter<any>;
    /**
     * Fires after the component is opened and the Popup is positioned.
     */
    positionChange: EventEmitter<any>;
    /**
     * @hidden
     */
    contentContainer: ElementRef;
    /**
     * @hidden
     */
    resizeSensor: ResizeSensorComponent;
    /**
     * @hidden
     */
    content: TemplateRef<any>;
    private resolvedPromise;
    private _currentOffset;
    private animationSubscriptions;
    private repositionSubscription;
    private initialCheck;
    constructor(container: ElementRef, _alignService: AlignService, domService: DOMService, _positionService: PositionService, _resizeService: ResizeService, _scrollableService: ScrollableService, animationService: AnimationService, _renderer: Renderer2, _zone: NgZone);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    onResize(): void;
    private onAnimationStart;
    private onAnimationEnd;
    private currentOffset;
    private setZIndex;
    private reposition;
    private position;
    private onScroll;
    private copyFontStyles;
    private updateFixedClass;
    private setContainerStyle;
    private unsubscribeReposition;
}
