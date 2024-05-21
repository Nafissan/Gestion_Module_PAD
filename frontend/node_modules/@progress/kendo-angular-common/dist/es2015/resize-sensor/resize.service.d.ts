/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
import { ResizeBatchService } from './resize-batch.service';
export declare const enum ServiceState {
    Initial = 0,
    Initializing = 1,
    Initialized = 2
}
export declare abstract class ResizeService {
    protected resizeBatchService: ResizeBatchService;
    resize: EventEmitter<any>;
    acceptedSize: boolean;
    lastWidth: number;
    lastHeight: number;
    protected state: ServiceState;
    protected parentElement: any;
    protected abstract init(): void;
    constructor(resizeBatchService: ResizeBatchService);
    acceptSize(size?: any): void;
    checkChanges(): void;
    destroy(): void;
    protected checkSize(): boolean;
    protected initSize(): void;
    protected measure(): any;
}
