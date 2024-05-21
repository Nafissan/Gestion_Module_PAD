/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Defines the possible collision behavior when the Popup is not fully visible.
 *
 * The available options are:
 * - `fit`&mdash;Moves the Popup horizontally until it is fully displayed in the viewport.
 * - `flip`&mdash;Flips the Popup position based on the origin and the position properties.
 */
export declare type CollisionType = 'fit' | 'flip';
