/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { MarginSettings } from '@progress/kendo-popup-common';
/**
 * Defines the horizontal and the vertical margin offset of the component.
 */
export interface Margin extends MarginSettings {
    /**
     * Defines the possible horizontal margin value.
     */
    horizontal: number;
    /**
     * Defines the possible vertical margin value.
     */
    vertical: number;
}
