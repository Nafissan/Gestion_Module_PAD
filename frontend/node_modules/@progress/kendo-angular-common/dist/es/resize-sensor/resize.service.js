/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
import { isDocumentAvailable } from '../utils';
var ResizeService = /** @class */ (function () {
    function ResizeService(resizeBatchService) {
        this.resizeBatchService = resizeBatchService;
        this.resize = new EventEmitter();
        this.acceptedSize = false;
        this.state = 0 /* Initial */;
    }
    ResizeService.prototype.acceptSize = function (size) {
        if (size === void 0) { size = this.measure(); }
        this.lastWidth = size.width;
        this.lastHeight = size.height;
        this.acceptedSize = true;
    };
    ResizeService.prototype.checkChanges = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        if (this.state === 0 /* Initial */) {
            this.state = 1 /* Initializing */;
            // batch initial measure
            this.resizeBatchService.schedule(this, this.init);
        }
    };
    ResizeService.prototype.destroy = function () {
        this.resizeBatchService.cancel(this);
    };
    ResizeService.prototype.checkSize = function () {
        if (!this.parentElement) {
            return;
        }
        var _a = this.measure(), width = _a.width, height = _a.height;
        var sameSize = width === this.lastWidth && height === this.lastHeight;
        if (sameSize) {
            return;
        }
        this.lastWidth = width;
        this.lastHeight = height;
        this.acceptedSize = false;
        this.resize.emit();
        return true;
    };
    ResizeService.prototype.initSize = function () {
        var size = this.measure();
        this.lastWidth = size.width;
        this.lastHeight = size.height;
    };
    ResizeService.prototype.measure = function () {
        var width = 0;
        var height = 0;
        if (this.parentElement) {
            height = this.parentElement.offsetHeight;
            width = this.parentElement.offsetWidth;
        }
        return { height: height, width: width };
    };
    return ResizeService;
}());
export { ResizeService };
