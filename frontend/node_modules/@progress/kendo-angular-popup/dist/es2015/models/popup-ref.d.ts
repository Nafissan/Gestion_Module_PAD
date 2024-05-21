/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ComponentRef, EventEmitter } from '@angular/core';
import { PopupComponent } from '../popup.component';
/**
 * Holds references to the object instance of the Popup.
 * Controls the Popups which are opened through `PopupService`
 * ([see example]({% slug api_popup_popupservice %}#toc-open)).
 */
export interface PopupRef {
    /**
     * A reference to the Popup instance.
     */
    popup: ComponentRef<PopupComponent>;
    /**
     * A reference to the HTML element of the Popup.
     */
    popupElement: HTMLElement;
    /**
     * A reference to the child component of the Popup. Available when the
     * Popup is opened with [`content`]({% slug service_popup %}#toc-using-components).
     */
    content: ComponentRef<any>;
    /**
     * Closes and destroys the Popup.
     */
    close: Function;
    /**
     * Fires when the anchor is scrolled outside the screen boundaries
     * ([see example]({% slug closing_popup %}#toc-after-leaving-the-viewport)).
     */
    popupAnchorViewportLeave: EventEmitter<any>;
    /**
     * Fires after the component is closed.
     */
    popupClose: EventEmitter<any>;
    /**
     * Fires after the component is opened and the opening animation ends.
     */
    popupOpen: EventEmitter<any>;
    /**
     * Fires after the component is opened and the Popup is positioned.
     */
    popupPositionChange: EventEmitter<any>;
}
