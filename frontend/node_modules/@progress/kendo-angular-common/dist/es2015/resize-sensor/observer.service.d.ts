/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, NgZone } from '@angular/core';
import { ResizeService } from './resize.service';
import { ResizeBatchService } from './resize-batch.service';
/**
 * @hidden
 */
export declare class ResizeObserverService extends ResizeService {
    private element;
    private ngZone;
    private resizeObserver;
    static supported(): boolean;
    constructor(resizeBatchService: ResizeBatchService, element: ElementRef, ngZone: NgZone);
    destroy(): void;
    protected init(): void;
}
