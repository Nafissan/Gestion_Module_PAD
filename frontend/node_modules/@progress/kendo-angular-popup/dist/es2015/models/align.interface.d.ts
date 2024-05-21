/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { AlignStrategy } from '@progress/kendo-popup-common';
/**
 * Defines the horizontal and vertical align point of the component.
 */
export interface Align extends AlignStrategy {
    /**
     * Defines the possible horizontal point values that are relative to the anchor or the Popup.
     *
     * The available options are:
     * - `left`&mdash;Uses the leftmost point of the `anchor` element.
     * - `center`&mdash;Uses the center point of the `anchor` element.
     * - `right`&mdash;Uses the rightmost point of the `anchor` element.
     */
    horizontal: 'left' | 'center' | 'right';
    /**
     * Defines the possible vertical point values that are relative to the anchor or the Popup.
     *
     * The available options are:
     * - `top`&mdash;Uses the top point of the `anchor` element.
     * - `center`&mdash;Uses the center point of the `anchor` element.
     * - `bottom`&mdash;Uses the bottom point of the `anchor` element.
     */
    vertical: 'top' | 'center' | 'bottom';
}
