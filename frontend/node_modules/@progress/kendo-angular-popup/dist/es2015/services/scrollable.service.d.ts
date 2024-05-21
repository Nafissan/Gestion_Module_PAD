/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, NgZone } from '@angular/core';
import { DOMService } from './dom.service';
/**
 * @hidden
 */
export declare const THRESHOLD_DIFF = 1;
/**
 * @hidden
 */
export declare class ScrollableService {
    private _dom;
    private _zone;
    private element;
    private subscription;
    constructor(_dom: DOMService, _zone: NgZone);
    forElement(element: ElementRef): ScrollableService;
    subscribe(callback: Function): void;
    unsubscribe(): void;
    isVisible(elem: any, container: any): boolean;
}
