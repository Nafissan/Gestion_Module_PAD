/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
export const isChanged = (propertyName, changes, skipFirstChange = true) => (typeof changes[propertyName] !== 'undefined' &&
    (!changes[propertyName].isFirstChange() || !skipFirstChange) &&
    changes[propertyName].previousValue !== changes[propertyName].currentValue);
