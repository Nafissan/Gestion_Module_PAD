/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, OnDestroy, AfterViewChecked, ElementRef, NgZone } from '@angular/core';
import { ResizeBatchService } from './resize-batch.service';
/**
 * Resize Sensor Component
 *
 * Triggers a "resize" event whenever the parent DOM element size changes.
 */
export declare class ResizeSensorComponent implements OnDestroy, AfterViewChecked {
    /**
     * The maximum number of resize events to emit per second.
     *
     * Defaults to 10.
     */
    rateLimit: number;
    /**
     * Fires when the parent DOM element has been resized.
     */
    resize: EventEmitter<any>;
    private subscription;
    private resizeService;
    constructor(resizeBatchService: ResizeBatchService, element: ElementRef, ngZone: NgZone);
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    acceptSize(size?: any): void;
}
