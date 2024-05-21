/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:deprecation
import { ResizeService } from './resize.service';
import { fromEvent, merge } from 'rxjs';
const div = style => {
    const el = document.createElement('div');
    el.style.cssText = style;
    return el;
};
const ɵ0 = div;
const computedProp = (elem, prop) => getComputedStyle(elem, null).getPropertyValue(prop);
const ɵ1 = computedProp;
const WRAP_STYLE = 'position: absolute; display: block; left: 0; top: 0; right: 0; bottom: 0; z-index: -1;' +
    'overflow: hidden; visibility: hidden;';
const EXPAND_CHILD_STYLE = 'position: absolute; left: 0; top: 0; transition: 0s;';
const SHRINK_CHILD_STYLE = EXPAND_CHILD_STYLE + 'width: 200%; height: 200%;';
export class ResizeCompatService extends ResizeService {
    constructor(resizeBatchService, element, ngZone) {
        super(resizeBatchService);
        this.element = element;
        this.ngZone = ngZone;
    }
    checkChanges() {
        if (this.state === 2 /* Initialized */) {
            if (!this.resizeBatchService.isScheduled(this)) {
                this.resizeBatchService.schedule(this, this.checkSize);
            }
            return;
        }
        super.checkChanges();
    }
    destroy() {
        super.destroy();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.expand) {
            const element = this.element.nativeElement;
            element.removeChild(this.expand);
            element.removeChild(this.shrink);
            this.expand.removeChild(this.expandChild);
            this.expand = this.expandChild = this.shrink = this.element = null;
        }
    }
    checkSize() {
        if (super.checkSize()) {
            this.reset();
            return true;
        }
    }
    init() {
        const parentElement = this.parentElement = this.element.nativeElement.parentElement;
        if (computedProp(parentElement, 'position') === 'static') {
            parentElement.style.position = 'relative';
        }
        this.state = 2 /* Initialized */;
        this.render();
        this.reset();
        this.initSize();
        this.subscribe();
    }
    render() {
        const element = this.element.nativeElement;
        element.style.cssText = WRAP_STYLE;
        element.setAttribute('dir', 'ltr');
        this.expand = div(WRAP_STYLE);
        this.expandChild = div(EXPAND_CHILD_STYLE);
        this.expand.appendChild(this.expandChild);
        element.appendChild(this.expand);
        this.shrink = div(WRAP_STYLE);
        const shrinkChild = div(SHRINK_CHILD_STYLE);
        this.shrink.appendChild(shrinkChild);
        element.appendChild(this.shrink);
    }
    reset() {
        const expandChild = this.expandChild;
        expandChild.style.width = 100000 + 'px';
        expandChild.style.height = 100000 + 'px';
        const expand = this.expand;
        expand.scrollLeft = 100000;
        expand.scrollTop = 100000;
        const shrink = this.shrink;
        shrink.scrollLeft = 100000;
        shrink.scrollTop = 100000;
    }
    subscribe() {
        this.ngZone.runOutsideAngular(() => {
            this.subscription = merge(fromEvent(this.shrink, 'scroll'), fromEvent(this.expand, 'scroll'))
                .subscribe(() => {
                this.checkSize();
            });
        });
    }
}
export { ɵ0, ɵ1 };
