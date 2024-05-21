/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { InjectionToken } from '@angular/core';
/**
 * A token that specifies the text direction of Kendo UI for Angular components.
 *
 * @example
 * {% embed_file rtl/app.module.ts preview %}
 * {% embed_file rtl/app.component.ts %}
 * {% embed_file shared/main.ts hidden %}
 *
 */
export const RTL = new InjectionToken("Kendo UI Right-to-Left token");
