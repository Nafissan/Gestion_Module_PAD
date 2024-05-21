/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, NgZone } from '@angular/core';
import { ResizeBatchService } from './resize-batch.service';
import { ResizeService } from './resize.service';
export declare class ResizeCompatService extends ResizeService {
    private element;
    private ngZone;
    private expand;
    private expandChild;
    private shrink;
    private subscription;
    constructor(resizeBatchService: ResizeBatchService, element: ElementRef, ngZone: NgZone);
    checkChanges(): void;
    destroy(): void;
    protected checkSize(): boolean;
    protected init(): void;
    private render;
    private reset;
    private subscribe;
}
