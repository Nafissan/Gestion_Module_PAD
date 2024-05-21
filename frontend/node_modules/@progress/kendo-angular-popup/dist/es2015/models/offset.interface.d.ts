/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OffsetPosition } from '@progress/kendo-popup-common';
/**
 * The offset position of the Popup.
 */
export interface Offset extends OffsetPosition {
    /**
     * Defines the top position of the Popup.
     */
    top: number;
    /**
     * Defines the left position of the Popup.
     */
    left: number;
}
