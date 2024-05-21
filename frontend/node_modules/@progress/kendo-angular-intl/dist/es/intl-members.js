/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as intl from '@telerik/kendo-intl';
import { errorSolutions } from './error-solutions';
function formatMessage(error) {
    var message = error.message;
    var errorSolution = errorSolutions[Object.keys(errorSolutions).filter(function (key) { return message.indexOf(key) === 0; })[0]];
    return errorSolution ? message + " " + errorSolution : message;
}
function intlMethod(fn) {
    return function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
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
export var dateFormatNames = intlMethod(intl.dateFormatNames);
/**
 * @hidden
 */
export var dateFieldName = intlMethod(intl.dateFieldName);
/**
 * @hidden
 */
export var firstDay = intlMethod(intl.firstDay);
/**
 * @hidden
 */
export var format = intlMethod(intl.format);
/**
 * @hidden
 */
export var formatDate = intlMethod(intl.formatDate);
/**
 * @hidden
 */
export var formatNumber = intlMethod(intl.formatNumber);
/**
 * @hidden
 */
export var load = intlMethod(intl.load);
/**
 * @hidden
 */
export var numberSymbols = intlMethod(intl.numberSymbols);
/**
 * @hidden
 */
export var parseDate = intlMethod(intl.parseDate);
/**
 * @hidden
 */
export var parseNumber = intlMethod(intl.parseNumber);
/**
 * @hidden
 */
export var splitDateFormat = intlMethod(intl.splitDateFormat);
/**
 * @hidden
 */
export var toString = intlMethod(intl.toString);
/**
 * @hidden
 */
export var weekendRange = intlMethod(intl.weekendRange);
/**
 * Sets a pre-built locale.
 *
 * @params data - The pre-built locale data.
 */
export var setData = function (data) { return intl.setData(data); };
/**
 * Retrieves the locale data for the specified locale.
 *
 * @params locale - The locale id.
 * @returns data - The locale data.
 */
export var localeData = function (locale) {
    try {
        return intl.localeInfo(locale);
    }
    catch (error) {
        error.message = formatMessage(error);
        throw error;
    }
};
