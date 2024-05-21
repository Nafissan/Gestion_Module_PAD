/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:deprecation
import * as tslib_1 from "tslib";
import { ResizeService } from './resize.service';
import { fromEvent, merge } from 'rxjs';
var div = function (style) {
    var el = document.createElement('div');
    el.style.cssText = style;
    return el;
};
var ɵ0 = div;
var computedProp = function (elem, prop) {
    return getComputedStyle(elem, null).getPropertyValue(prop);
};
var ɵ1 = computedProp;
var WRAP_STYLE = 'position: absolute; display: block; left: 0; top: 0; right: 0; bottom: 0; z-index: -1;' +
    'overflow: hidden; visibility: hidden;';
var EXPAND_CHILD_STYLE = 'position: absolute; left: 0; top: 0; transition: 0s;';
var SHRINK_CHILD_STYLE = EXPAND_CHILD_STYLE + 'width: 200%; height: 200%;';
var ResizeCompatService = /** @class */ (function (_super) {
    tslib_1.__extends(ResizeCompatService, _super);
    function ResizeCompatService(resizeBatchService, element, ngZone) {
        var _this = _super.call(this, resizeBatchService) || this;
        _this.element = element;
        _this.ngZone = ngZone;
        return _this;
    }
    ResizeCompatService.prototype.checkChanges = function () {
        if (this.state === 2 /* Initialized */) {
            if (!this.resizeBatchService.isScheduled(this)) {
                this.resizeBatchService.schedule(this, this.checkSize);
            }
            return;
        }
        _super.prototype.checkChanges.call(this);
    };
    ResizeCompatService.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.expand) {
            var element = this.element.nativeElement;
            element.removeChild(this.expand);
            element.removeChild(this.shrink);
            this.expand.removeChild(this.expandChild);
            this.expand = this.expandChild = this.shrink = this.element = null;
        }
    };
    ResizeCompatService.prototype.checkSize = function () {
        if (_super.prototype.checkSize.call(this)) {
            this.reset();
            return true;
        }
    };
    ResizeCompatService.prototype.init = function () {
        var parentElement = this.parentElement = this.element.nativeElement.parentElement;
        if (computedProp(parentElement, 'position') === 'static') {
            parentElement.style.position = 'relative';
        }
        this.state = 2 /* Initialized */;
        this.render();
        this.reset();
        this.initSize();
        this.subscribe();
    };
    ResizeCompatService.prototype.render = function () {
        var element = this.element.nativeElement;
        element.style.cssText = WRAP_STYLE;
        element.setAttribute('dir', 'ltr');
        this.expand = div(WRAP_STYLE);
        this.expandChild = div(EXPAND_CHILD_STYLE);
        this.expand.appendChild(this.expandChild);
        element.appendChild(this.expand);
        this.shrink = div(WRAP_STYLE);
        var shrinkChild = div(SHRINK_CHILD_STYLE);
        this.shrink.appendChild(shrinkChild);
        element.appendChild(this.shrink);
    };
    ResizeCompatService.prototype.reset = function () {
        var expandChild = this.expandChild;
        expandChild.style.width = 100000 + 'px';
        expandChild.style.height = 100000 + 'px';
        var expand = this.expand;
        expand.scrollLeft = 100000;
        expand.scrollTop = 100000;
        var shrink = this.shrink;
        shrink.scrollLeft = 100000;
        shrink.scrollTop = 100000;
    };
    ResizeCompatService.prototype.subscribe = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.subscription = merge(fromEvent(_this.shrink, 'scroll'), fromEvent(_this.expand, 'scroll'))
                .subscribe(function () {
                _this.checkSize();
            });
        });
    };
    return ResizeCompatService;
}(ResizeService));
export { ResizeCompatService };
export { ɵ0, ɵ1 };
