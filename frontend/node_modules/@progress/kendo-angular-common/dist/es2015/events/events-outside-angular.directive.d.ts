/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnInit, OnDestroy, ElementRef, Renderer2, NgZone } from '@angular/core';
/**
 * @hidden
 */
export declare class EventsOutsideAngularDirective implements OnInit, OnDestroy {
    private element;
    private ngZone;
    private renderer;
    events: any;
    scope: any;
    protected subscriptions: any[];
    constructor(element: ElementRef, ngZone: NgZone, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
