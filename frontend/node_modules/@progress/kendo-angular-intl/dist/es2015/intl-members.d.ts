/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Locale } from './locale-data.interface';
export { DateFieldNameOptions, DateFormatNameOptions, DateFormatOptions, NumberFormatOptions, DateFormatPart } from '@telerik/kendo-intl';
/**
 * @hidden
 */
export declare const dateFormatNames: Function;
/**
 * @hidden
 */
export declare const dateFieldName: Function;
/**
 * @hidden
 */
export declare const firstDay: Function;
/**
 * @hidden
 */
export declare const format: Function;
/**
 * @hidden
 */
export declare const formatDate: Function;
/**
 * @hidden
 */
export declare const formatNumber: Function;
/**
 * @hidden
 */
export declare const load: Function;
/**
 * @hidden
 */
export declare const numberSymbols: Function;
/**
 * @hidden
 */
export declare const parseDate: Function;
/**
 * @hidden
 */
export declare const parseNumber: Function;
/**
 * @hidden
 */
export declare const splitDateFormat: Function;
/**
 * @hidden
 */
export declare const toString: Function;
/**
 * @hidden
 */
export declare const weekendRange: Function;
/**
 * Sets a pre-built locale.
 *
 * @params data - The pre-built locale data.
 */
export declare const setData: (data: any) => void;
/**
 * Retrieves the locale data for the specified locale.
 *
 * @params locale - The locale id.
 * @returns data - The locale data.
 */
export declare const localeData: (locale: string) => Locale;
