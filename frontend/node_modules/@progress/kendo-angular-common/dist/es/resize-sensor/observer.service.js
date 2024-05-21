/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { ResizeService } from './resize.service';
var HAS_OBSERVER = typeof ResizeObserver !== 'undefined';
/**
 * @hidden
 */
var ResizeObserverService = /** @class */ (function (_super) {
    tslib_1.__extends(ResizeObserverService, _super);
    function ResizeObserverService(resizeBatchService, element, ngZone) {
        var _this = _super.call(this, resizeBatchService) || this;
        _this.element = element;
        _this.ngZone = ngZone;
        return _this;
    }
    ResizeObserverService.supported = function () {
        return HAS_OBSERVER;
    };
    ResizeObserverService.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
        this.parentElement = null;
    };
    ResizeObserverService.prototype.init = function () {
        var _this = this;
        this.parentElement = this.element.nativeElement.parentElement;
        this.initSize();
        this.state = 2 /* Initialized */;
        this.ngZone.runOutsideAngular(function () {
            _this.resizeObserver = new ResizeObserver(function () {
                _this.checkSize();
            });
            _this.resizeObserver.observe(_this.parentElement);
        });
    };
    return ResizeObserverService;
}(ResizeService));
export { ResizeObserverService };
