/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { Align } from './align.interface';
import { Collision } from './collision.interface';
import { Margin } from './margin.interface';
import { Offset } from './offset.interface';
import { PositionMode } from './position-mode';
import { PopupAnimation } from './popup-animation.interface';
/**
 * The settings for the Popup when the Popup is opened through `PopupService`.
 *
 * For an example on sample usage, refer to the
 * [`PopupService.open`]({% slug api_popup_popupservice %}#toc-open) method.
 */
export interface PopupSettings {
    /**
     * Controls the Popup animation. By default, the open and close animations are enabled
     * ([see example]({% slug animations_popup %})).
     */
    animate?: boolean | PopupAnimation;
    /**
     * Specifies the element which will be used as an anchor. The Popup opens next to that element.
     */
    anchor?: ElementRef;
    /**
     * Defines the container to which the Popup will be appended.
     */
    appendTo?: ViewContainerRef;
    /**
     * Specifies the anchor pivot point
     * ([see example]({% slug alignmentpositioning_popup %})).
     */
    anchorAlign?: Align;
    /**
     * Defines the content of the Popup.
     */
    content?: TemplateRef<any> | Function;
    /**
     * Configures the collision behavior of the Popup
     * ([see example]({% slug viewportboundarydetection_popup %}).
     */
    collision?: Collision;
    /**
     * Configures the margin value that will be added to the popup dimensions
     * in pixels and leaves a blank space between the popup and the anchor.
     */
    margin?: Margin;
    /**
     * Specifies the position mode of the component. By default, the Popup uses fixed positioning.
     * To make the Popup acquire absolute positioning, set this option to `absolute`.
     *
     * > If you need to support mobile browsers with the zoom option, use the `absolute` positioning of the Popup.
     */
    positionMode?: PositionMode;
    /**
     * Specifies the pivot point of the Popup ([see example]({% slug alignmentpositioning_popup %})).
     */
    popupAlign?: Align;
    /**
     * Specifies a list of CSS classes that will be added to the internal animated element
     * ([see example]({% slug appearance_popup %})).
     *
     * > To style the content of the Popup, use this property binding.
     */
    popupClass?: string | Array<string> | Object;
    /**
     * Specifies the absolute position of the element
     * ([see example]({% slug alignmentpositioning_popup %}#toc-aligning-to-absolute-points)).
     * The Popup opens next to that point. The pivot point of the Popup is defined by the `popupAlign` configuration option.
     * The boundary detection is applied by using the window viewport.
     */
    offset?: Offset;
}
