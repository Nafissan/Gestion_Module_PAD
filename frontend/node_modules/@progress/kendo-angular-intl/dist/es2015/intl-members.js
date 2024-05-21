/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as intl from '@telerik/kendo-intl';
import { errorSolutions } from './error-solutions';
function formatMessage(error) {
    const message = error.message;
    const errorSolution = errorSolutions[Object.keys(errorSolutions).filter(key => message.indexOf(key) === 0)[0]];
    return errorSolution ? `${message} ${errorSolution}` : message;
}
function intlMethod(fn) {
    return function (...values) {
        try {
            return fn.apply(null, values);
        }
        catch (error) {
            error.message = formatMessage(error);
            throw error;
        }
    };
}
/**
 * @hidden
 */
export const dateFormatNames = intlMethod(intl.dateFormatNames);
/**
 * @hidden
 */
export const dateFieldName = intlMethod(intl.dateFieldName);
/**
 * @hidden
 */
export const firstDay = intlMethod(intl.firstDay);
/**
 * @hidden
 */
export const format = intlMethod(intl.format);
/**
 * @hidden
 */
export const formatDate = intlMethod(intl.formatDate);
/**
 * @hidden
 */
export const formatNumber = intlMethod(intl.formatNumber);
/**
 * @hidden
 */
export const load = intlMethod(intl.load);
/**
 * @hidden
 */
export const numberSymbols = intlMethod(intl.numberSymbols);
/**
 * @hidden
 */
export const parseDate = intlMethod(intl.parseDate);
/**
 * @hidden
 */
export const parseNumber = intlMethod(intl.parseNumber);
/**
 * @hidden
 */
export const splitDateFormat = intlMethod(intl.splitDateFormat);
/**
 * @hidden
 */
export const toString = intlMethod(intl.toString);
/**
 * @hidden
 */
export const weekendRange = intlMethod(intl.weekendRange);
/**
 * Sets a pre-built locale.
 *
 * @params data - The pre-built locale data.
 */
export const setData = (data) => intl.setData(data);
/**
 * Retrieves the locale data for the specified locale.
 *
 * @params locale - The locale id.
 * @returns data - The locale data.
 */
export const localeData = (locale) => {
    try {
        return intl.localeInfo(locale);
    }
    catch (error) {
        error.message = formatMessage(error);
        throw error;
    }
};
