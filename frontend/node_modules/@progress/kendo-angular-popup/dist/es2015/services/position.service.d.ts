/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PositionElementSettings } from '../models/position-element-settings.interface';
import { Position } from '../models/position.interface';
import { DOMService } from './dom.service';
/**
 * @hidden
 */
export declare class PositionService {
    private _dom;
    private scale;
    constructor(_dom: DOMService, scale?: number);
    positionElement(settings: PositionElementSettings): Position;
}
