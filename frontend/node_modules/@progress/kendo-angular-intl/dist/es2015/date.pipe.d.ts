/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PipeTransform } from '@angular/core';
import { IntlService } from './intl.service';
import { DateFormatOptions } from '@telerik/kendo-intl';
/**
 * Formats a date value to a string based on the requested format.
 * This pipe uses the [IntlService]({% slug api_intl_intlservice %}).
 *
 * @example
 * ```ng-template-no-run
 * <ul>
 *    <li>{{date | kendoDate }}</li>
 *    <li>{{milliseconds | kendoDate: 'M/dd/yyy' }}</li>
 *    <li>{{stringDate | kendoDate: 'G' }}</li>
 * </ul>
 * ```
 */
export declare class DatePipe implements PipeTransform {
    private intlService;
    /**
     * @hidden
     */
    constructor(intlService: IntlService);
    /**
     * Converts a `Date` object into a string based on the specified format.
     * If no format is provided, the default short date format is used.
     *
     * @param value - The date to format.
     * @param format - The format string or options.
     * @param localeId - (Optional) The ID of the locale which will be used instead of the default one.
     * @return - The formatted date.
     */
    transform(value: any, format?: String | DateFormatOptions, localeId?: string): any;
    private normalize;
}
