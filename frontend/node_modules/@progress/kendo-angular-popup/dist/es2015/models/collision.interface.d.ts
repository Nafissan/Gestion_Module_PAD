/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { CollisionType } from './collision.type';
/**
 * Defines the horizontal and vertical collision behavior of the component.
 */
export interface Collision {
    /**
     * Defines the horizontal collision behavior of the component.
     */
    horizontal: CollisionType;
    /**
     * Defines the vertical collision behavior of the component.
     */
    vertical: CollisionType;
}
