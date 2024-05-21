/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ResizeService } from './resize.service';
const HAS_OBSERVER = typeof ResizeObserver !== 'undefined';
/**
 * @hidden
 */
export class ResizeObserverService extends ResizeService {
    constructor(resizeBatchService, element, ngZone) {
        super(resizeBatchService);
        this.element = element;
        this.ngZone = ngZone;
    }
    static supported() {
        return HAS_OBSERVER;
    }
    destroy() {
        super.destroy();
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
        this.parentElement = null;
    }
    init() {
        this.parentElement = this.element.nativeElement.parentElement;
        this.initSize();
        this.state = 2 /* Initialized */;
        this.ngZone.runOutsideAngular(() => {
            this.resizeObserver = new ResizeObserver(() => {
                this.checkSize();
            });
            this.resizeObserver.observe(this.parentElement);
        });
    }
}
