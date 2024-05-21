/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef } from '@angular/core';
import { AlignStrategy, MarginSettings, OffsetPosition } from '@progress/kendo-popup-common';
import { PositionMode } from './position-mode';
/**
 * @hidden
 */
export interface AlignElementSettings {
    anchor?: ElementRef;
    anchorAlign: AlignStrategy;
    element: ElementRef;
    elementAlign: AlignStrategy;
    margin?: MarginSettings;
    offset?: OffsetPosition;
    positionMode?: PositionMode;
}
