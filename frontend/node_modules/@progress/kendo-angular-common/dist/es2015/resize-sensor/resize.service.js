/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
import { isDocumentAvailable } from '../utils';
export class ResizeService {
    constructor(resizeBatchService) {
        this.resizeBatchService = resizeBatchService;
        this.resize = new EventEmitter();
        this.acceptedSize = false;
        this.state = 0 /* Initial */;
    }
    acceptSize(size = this.measure()) {
        this.lastWidth = size.width;
        this.lastHeight = size.height;
        this.acceptedSize = true;
    }
    checkChanges() {
        if (!isDocumentAvailable()) {
            return;
        }
        if (this.state === 0 /* Initial */) {
            this.state = 1 /* Initializing */;
            // batch initial measure
            this.resizeBatchService.schedule(this, this.init);
        }
    }
    destroy() {
        this.resizeBatchService.cancel(this);
    }
    checkSize() {
        if (!this.parentElement) {
            return;
        }
        const { width, height } = this.measure();
        const sameSize = width === this.lastWidth && height === this.lastHeight;
        if (sameSize) {
            return;
        }
        this.lastWidth = width;
        this.lastHeight = height;
        this.acceptedSize = false;
        this.resize.emit();
        return true;
    }
    initSize() {
        const size = this.measure();
        this.lastWidth = size.width;
        this.lastHeight = size.height;
    }
    measure() {
        let width = 0;
        let height = 0;
        if (this.parentElement) {
            height = this.parentElement.offsetHeight;
            width = this.parentElement.offsetWidth;
        }
        return { height, width };
    }
}
