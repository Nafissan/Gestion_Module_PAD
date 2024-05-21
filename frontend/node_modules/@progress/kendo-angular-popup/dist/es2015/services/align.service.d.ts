/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DOMService } from './dom.service';
import { OffsetPosition as Offset } from '@progress/kendo-popup-common';
import { AlignElementSettings } from '../models/align-element-settings.interface';
/**
 * @hidden
 */
export declare class AlignService {
    private _dom;
    private scale;
    constructor(_dom: DOMService, scale?: number);
    alignElement(settings: AlignElementSettings): Offset;
    private absoluteRect;
    private elementScrollPosition;
    private relativeRect;
}
