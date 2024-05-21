import { __decorate, __metadata, __param } from "tslib";
import { Pipe, LOCALE_ID, Inject } from '@angular/core';
import { CalendarDateFormatter } from './calendar-date-formatter.provider';
/**
 * This pipe is primarily for rendering the current view title. Example usage:
 * ```typescript
 * // where `viewDate` is a `Date` and view is `'month' | 'week' | 'day'`
 * {{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}
 * ```
 */
let CalendarDatePipe = class CalendarDatePipe {
    constructor(dateFormatter, locale) {
        this.dateFormatter = dateFormatter;
        this.locale = locale;
    }
    transform(date, method, locale = this.locale, weekStartsOn = 0, excludeDays = [], daysInWeek) {
        if (typeof this.dateFormatter[method] === 'undefined') {
            const allowedMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(CalendarDateFormatter.prototype)).filter((iMethod) => iMethod !== 'constructor');
            throw new Error(`${method} is not a valid date formatter. Can only be one of ${allowedMethods.join(', ')}`);
        }
        return this.dateFormatter[method]({
            date,
            locale,
            weekStartsOn,
            excludeDays,
            daysInWeek,
        });
    }
};
CalendarDatePipe.ctorParameters = () => [
    { type: CalendarDateFormatter },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
CalendarDatePipe = __decorate([
    Pipe({
        name: 'calendarDate',
    }),
    __param(1, Inject(LOCALE_ID)),
    __metadata("design:paramtypes", [CalendarDateFormatter, String])
], CalendarDatePipe);
export { CalendarDatePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF0ZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NhbGVuZGFyLWRhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUUzRTs7Ozs7O0dBTUc7QUFJSCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUMzQixZQUNVLGFBQW9DLEVBQ2pCLE1BQWM7UUFEakMsa0JBQWEsR0FBYixhQUFhLENBQXVCO1FBQ2pCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDeEMsQ0FBQztJQUVKLFNBQVMsQ0FDUCxJQUFVLEVBQ1YsTUFBYyxFQUNkLFNBQWlCLElBQUksQ0FBQyxNQUFNLEVBQzVCLGVBQXVCLENBQUMsRUFDeEIsY0FBd0IsRUFBRSxFQUMxQixVQUFtQjtRQUVuQixJQUFJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFXLEVBQUU7WUFDckQsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUMvQyxNQUFNLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUN2RCxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxLQUFLLGFBQWEsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sSUFBSSxLQUFLLENBQ2IsR0FBRyxNQUFNLHNEQUFzRCxjQUFjLENBQUMsSUFBSSxDQUNoRixJQUFJLENBQ0wsRUFBRSxDQUNKLENBQUM7U0FDSDtRQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQyxJQUFJO1lBQ0osTUFBTTtZQUNOLFlBQVk7WUFDWixXQUFXO1lBQ1gsVUFBVTtTQUNYLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBOztZQTlCMEIscUJBQXFCO3lDQUMzQyxNQUFNLFNBQUMsU0FBUzs7QUFIUixnQkFBZ0I7SUFINUIsSUFBSSxDQUFDO1FBQ0osSUFBSSxFQUFFLGNBQWM7S0FDckIsQ0FBQztJQUlHLFdBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO3FDQURLLHFCQUFxQjtHQUZuQyxnQkFBZ0IsQ0FnQzVCO1NBaENZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0sIExPQ0FMRV9JRCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhckRhdGVGb3JtYXR0ZXIgfSBmcm9tICcuL2NhbGVuZGFyLWRhdGUtZm9ybWF0dGVyLnByb3ZpZGVyJztcblxuLyoqXG4gKiBUaGlzIHBpcGUgaXMgcHJpbWFyaWx5IGZvciByZW5kZXJpbmcgdGhlIGN1cnJlbnQgdmlldyB0aXRsZS4gRXhhbXBsZSB1c2FnZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIHdoZXJlIGB2aWV3RGF0ZWAgaXMgYSBgRGF0ZWAgYW5kIHZpZXcgaXMgYCdtb250aCcgfCAnd2VlaycgfCAnZGF5J2BcbiAqIHt7IHZpZXdEYXRlIHwgY2FsZW5kYXJEYXRlOih2aWV3ICsgJ1ZpZXdUaXRsZScpOidlbicgfX1cbiAqIGBgYFxuICovXG5AUGlwZSh7XG4gIG5hbWU6ICdjYWxlbmRhckRhdGUnLFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGF0ZUZvcm1hdHRlcjogQ2FsZW5kYXJEYXRlRm9ybWF0dGVyLFxuICAgIEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIGxvY2FsZTogc3RyaW5nXG4gICkge31cblxuICB0cmFuc2Zvcm0oXG4gICAgZGF0ZTogRGF0ZSxcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICBsb2NhbGU6IHN0cmluZyA9IHRoaXMubG9jYWxlLFxuICAgIHdlZWtTdGFydHNPbjogbnVtYmVyID0gMCxcbiAgICBleGNsdWRlRGF5czogbnVtYmVyW10gPSBbXSxcbiAgICBkYXlzSW5XZWVrPzogbnVtYmVyXG4gICk6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmRhdGVGb3JtYXR0ZXJbbWV0aG9kXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IGFsbG93ZWRNZXRob2RzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoXG4gICAgICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihDYWxlbmRhckRhdGVGb3JtYXR0ZXIucHJvdG90eXBlKVxuICAgICAgKS5maWx0ZXIoKGlNZXRob2QpID0+IGlNZXRob2QgIT09ICdjb25zdHJ1Y3RvcicpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgJHttZXRob2R9IGlzIG5vdCBhIHZhbGlkIGRhdGUgZm9ybWF0dGVyLiBDYW4gb25seSBiZSBvbmUgb2YgJHthbGxvd2VkTWV0aG9kcy5qb2luKFxuICAgICAgICAgICcsICdcbiAgICAgICAgKX1gXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyW21ldGhvZF0oe1xuICAgICAgZGF0ZSxcbiAgICAgIGxvY2FsZSxcbiAgICAgIHdlZWtTdGFydHNPbixcbiAgICAgIGV4Y2x1ZGVEYXlzLFxuICAgICAgZGF5c0luV2VlayxcbiAgICB9KTtcbiAgfVxufVxuIl19