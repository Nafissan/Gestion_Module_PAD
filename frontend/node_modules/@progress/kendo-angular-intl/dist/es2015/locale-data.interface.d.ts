/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Describes the number symbols of the locale.
 */
export interface LocaleNumberSymbols {
    /**
     * The decimal separator.
     */
    decimal?: string;
    /**
     * The group separator.
     */
    group?: string;
    /**
     * The percent sign.
     */
    percentSign?: string;
}
/**
 * Describes a currency of a locale.
 */
export interface LocaleCurrency {
    /**
     * The display name of the currency.
     */
    displayName?: string;
    /**
     * The currency symbol.
     */
    symbol?: string;
    /**
     * The narrow currency symbol.
     */
    "symbol-alt-narrow"?: string;
}
/**
 * Describes the currencies of the locale.
 */
export interface LocaleCurrencies {
    /**
     * The currency data with the currency code as a key (field name).
     */
    [propName: string]: LocaleCurrency;
}
/**
 * Describes the number data of the locale.
 */
export interface LocaleNumbers {
    /**
     * The number symbols of the locale.
     */
    symbols?: LocaleNumberSymbols;
    /**
     * The currencies of the locale.
     */
    currencies?: LocaleCurrencies;
    /**
     * The default currency of the locale.
     */
    localeCurrency: string;
}
/**
 * Describes the calendar data of the locale.
 */
export interface LocaleCalendarPatterns {
    /**
     * The short-date pattern.
     */
    d?: string;
    /**
     * The long-date pattern.
     */
    D?: string;
    /**
     * The abbreviated month and day pattern.
     */
    m?: string;
    /**
     * The wide month and day pattern.
     */
    M?: string;
    /**
     * The abbreviated month and year pattern.
     */
    y?: string;
    /**
     * The wide month and year pattern.
     */
    Y?: string;
    /**
     * The full date and time pattern.
     */
    F?: string;
    /**
     * The short general date and time pattern.
     */
    g?: string;
    /**
     * The long general date and time pattern.
     */
    G?: string;
    /**
     * The short time pattern.
     */
    t?: string;
    /**
     * The long time pattern.
     */
    T?: string;
    /**
     * The universal sortable local date and time pattern.
     */
    s?: string;
    /**
     * The universal sortable UTC date and time pattern.
     */
    u?: string;
}
/**
 * Describes the date and time formats of the locale.
 */
export interface LocaleDateTimeFormats {
    /**
     * The full date-time format.
     */
    full?: string;
    /**
     * The long date-time format.
     */
    long?: string;
    /**
     * The medium date-time format.
     */
    medium?: string;
    /**
     * The short date-time format.
     */
    short?: string;
    /**
     * The skeleton formats of the locale.
     */
    availableFormats?: any;
}
/**
 * Describes the time formats of the locale.
 */
export interface LocaleTimeFormats {
    /**
     * The full time format.
     */
    full?: string;
    /**
     * The long time format.
     */
    long?: string;
    /**
     * The medium time format.
     */
    medium?: string;
    /**
     * The short time format.
     */
    short?: string;
}
/**
 * Describes the date formats of the locale.
 */
export interface LocaleDateFormats {
    /**
     * The full date format.
     */
    full?: string;
    /**
     * The long date format.
     */
    long?: string;
    /**
     * The medium date format.
     */
    medium?: string;
    /**
     * The short date format.
     */
    short?: string;
}
/**
 * Describes the name types of the locale date formats.
 */
export interface LocaleDateFormatNames {
    /**
     * An array with the abbreviated names.
     */
    abbreviated?: string[];
    /**
     * An array with the narrow names.
     */
    narrow?: string[];
    /**
     * An array with the short names.
     */
    short?: string[];
    /**
     * An array with the wide names.
     */
    wide?: string[];
}
/**
 * Describes the date-format names of the locale.
 */
export interface LocaleDateFormatNameTypes {
    /**
     * The default format names.
     */
    format?: LocaleDateFormatNames;
    /**
     * The standalone format names.
     */
    'stand-alone'?: LocaleDateFormatNames;
}
/**
 * Describes the day-period names of the locale.
 */
export interface LocaleDayPeriodNames {
    /**
     * The Ante meridiem name.
     */
    am?: string;
    /**
     * The Post meridiem name.
     */
    pm?: string;
}
/**
 * Describes the data for the day-period names of the locale.
 */
export interface LocaleDayPeriodNameTypes {
    /**
     * The default format names.
     */
    format?: LocaleDayPeriodNames;
    /**
     * The standalone format names.
     */
    'stand-alone'?: LocaleDayPeriodNames;
}
/**
 * Describes the date-field names of the locale.
 */
export interface LocaleDateFieldNames {
    /**
     * The wide field name.
     */
    wide?: string;
    /**
     * The short field name.
     */
    short?: string;
    /**
     * The narrow field name.
     */
    narrow?: string;
}
/**
 * Describes the data for the date-field names of the locale.
 */
export interface LocaleDateFieldNameTypes {
    /**
     * The field names for an era.
     */
    era?: LocaleDateFieldNames;
    /**
     * The field names for a year.
     */
    year?: LocaleDateFieldNames;
    /**
     * The field names for a quarter.
     */
    quarter?: LocaleDateFieldNames;
    /**
     * The field names for a month.
     */
    month?: LocaleDateFieldNames;
    /**
     * The field names for a week.
     */
    week?: LocaleDateFieldNames;
    /**
     * The field names for a day.
     */
    day?: LocaleDateFieldNames;
    /**
     * The field names for a weekday.
     */
    weekday?: LocaleDateFieldNames;
    /**
     * The field names for a day period.
     */
    dayperiod?: LocaleDateFieldNames;
    /**
     * The field names for an hour.
     */
    hour?: LocaleDateFieldNames;
    /**
     * The field names for a minute.
     */
    minute?: LocaleDateFieldNames;
    /**
     * The field names for a second.
     */
    second?: LocaleDateFieldNames;
    /**
     * The field names for a zone.
     */
    zone?: LocaleDateFieldNames;
}
/**
 * Describes the calendar data of the locale.
 */
export interface LocaleCalendar {
    /**
     * The GMT format of the locale.
     */
    gmtFormat?: string;
    /**
     * The zero (offset) GMT format of the locale.
     */
    gmtZeroFormat?: string;
    /**
     * The predefined patterns of the locale.
     */
    patterns?: LocaleCalendarPatterns;
    /**
     * The date and time formats of the locale.
     */
    dateTimeFormats?: LocaleDateTimeFormats;
    /**
     * The time formats of the locale.
     */
    timeFormats?: LocaleTimeFormats;
    /**
     * The date formats of the locale.
     */
    dateFormats?: LocaleDateFormats;
    /**
     * The data for the day names of the locale.
     */
    days?: LocaleDateFormatNameTypes;
    /**
     * The data for the day-period names of the locale.
     */
    dayPeriods?: LocaleDayPeriodNameTypes;
    /**
     * The data for the month names of the locale.
     */
    months?: LocaleDateFormatNameTypes;
    /**
     * The data for the quarter names of the locale.
     */
    quarters?: LocaleDateFormatNameTypes;
    /**
     * The data for the era names of the locale.
     */
    eras?: LocaleDateFormatNameTypes;
    /**
     * The date-field names of the locale.
     */
    dateFields: LocaleDateFieldNameTypes;
}
/**
 * Describes the data of the locale.
 */
export interface Locale {
    /**
     * The name of the locale.
     */
    name?: string;
    /**
     * The territory of the locale.
     */
    territory?: string;
    /**
     * The numbers data of the locale.
     */
    numbers?: LocaleNumbers;
    /**
     * The calendar data of the locale.
     */
    calendar?: LocaleCalendar;
}
