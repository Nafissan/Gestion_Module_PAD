/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PipeTransform } from '@angular/core';
import { IntlService } from './intl.service';
import { NumberFormatOptions } from '@telerik/kendo-intl';
/**
 * Formats a number value to a string based on the requested format.
 * This pipe uses the [`IntlService`]({% slug api_intl_intlservice %}).
 *
 * @example
 * ```ng-template-no-run
 *   <ul>
 *     <li>{{decimal | kendoNumber:'c' }}</li>
 *     <li>{{stringNumber | kendoNumber:'p' }}</li>
 *     <li>{{int | kendoNumber:'##.00' }}</li>
 *  </ul>
 * ```
 */
export declare class NumberPipe implements PipeTransform {
    private intlService;
    /**
     * @hidden
     */
    constructor(intlService: IntlService);
    /**
     * Converts a `Number` object into a string based on the specified format.
     * If no format is provided, the value is formatted as decimal number using the
     * [`"n"`](https://github.com/telerik/kendo-intl/blob/master/docs/num-formatting/index.md#standard) format.
     *
     * @param value - The numer that will be formatted.
     * @param format - The format string or options.
     * @param localeId - (Optional) The locale ID that will be used in place of the default one.
     * @return - The formatted number.
     */
    transform(value: any, format?: string | NumberFormatOptions, localeId?: string): any;
}
