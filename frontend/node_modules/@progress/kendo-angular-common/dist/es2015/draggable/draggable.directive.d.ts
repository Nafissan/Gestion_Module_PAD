/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, ElementRef, OnDestroy, OnInit, OnChanges, NgZone } from '@angular/core';
export declare class DraggableDirective implements OnInit, OnChanges, OnDestroy {
    private element;
    private ngZone;
    enableDrag: boolean;
    kendoPress: EventEmitter<any>;
    kendoDrag: EventEmitter<any>;
    kendoRelease: EventEmitter<any>;
    private draggable;
    constructor(element: ElementRef, ngZone: NgZone);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    private toggleDraggable;
    private destroyDraggable;
}
