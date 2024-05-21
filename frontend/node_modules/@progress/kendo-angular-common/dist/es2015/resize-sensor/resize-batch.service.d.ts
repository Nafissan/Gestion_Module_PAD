/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgZone, OnDestroy } from '@angular/core';
/**
 * @hidden
 */
export declare class ResizeBatchService implements OnDestroy {
    private ngZone;
    private scheduled;
    private resolvedPromise;
    private subscription;
    constructor(ngZone: NgZone);
    schedule(instance: any, method: any): void;
    isScheduled(instance: any): boolean;
    cancel(instance: any): void;
    ngOnDestroy(): void;
    private unsubscribe;
    private flush;
}
