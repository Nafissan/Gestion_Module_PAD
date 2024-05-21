import { __decorate, __metadata } from "tslib";
import { Component, Input, NgZone, OnChanges, SimpleChanges, TemplateRef, } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { switchMapTo, startWith, map, switchMap } from 'rxjs/operators';
import { DateAdapter } from '../../date-adapters/date-adapter';
let CalendarWeekViewCurrentTimeMarkerComponent = class CalendarWeekViewCurrentTimeMarkerComponent {
    constructor(dateAdapter, zone) {
        this.dateAdapter = dateAdapter;
        this.zone = zone;
        this.columnDate$ = new BehaviorSubject(this.columnDate);
        this.marker$ = this.zone.onStable.pipe(switchMap(() => interval(60 * 1000)), startWith(0), switchMapTo(this.columnDate$), map((columnDate) => {
            const startOfDay = this.dateAdapter.setMinutes(this.dateAdapter.setHours(columnDate, this.dayStartHour), this.dayStartMinute);
            const endOfDay = this.dateAdapter.setMinutes(this.dateAdapter.setHours(columnDate, this.dayEndHour), this.dayEndMinute);
            const hourHeightModifier = (this.hourSegments * this.hourSegmentHeight) / 60;
            const now = new Date();
            return {
                isVisible: this.dateAdapter.isSameDay(columnDate, now) &&
                    now >= startOfDay &&
                    now <= endOfDay,
                top: this.dateAdapter.differenceInMinutes(now, startOfDay) *
                    hourHeightModifier,
            };
        }));
    }
    ngOnChanges(changes) {
        if (changes.columnDate) {
            this.columnDate$.next(changes.columnDate.currentValue);
        }
    }
};
CalendarWeekViewCurrentTimeMarkerComponent.ctorParameters = () => [
    { type: DateAdapter },
    { type: NgZone }
];
__decorate([
    Input(),
    __metadata("design:type", Date)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "columnDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayStartHour", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayStartMinute", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayEndHour", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "dayEndMinute", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "hourSegments", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "hourSegmentHeight", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarWeekViewCurrentTimeMarkerComponent.prototype, "customTemplate", void 0);
CalendarWeekViewCurrentTimeMarkerComponent = __decorate([
    Component({
        selector: 'mwl-calendar-week-view-current-time-marker',
        template: `
    <ng-template
      #defaultTemplate
      let-columnDate="columnDate"
      let-dayStartHour="dayStartHour"
      let-dayStartMinute="dayStartMinute"
      let-dayEndHour="dayEndHour"
      let-dayEndMinute="dayEndMinute"
      let-isVisible="isVisible"
      let-topPx="topPx"
    >
      <div
        class="cal-current-time-marker"
        *ngIf="isVisible"
        [style.top.px]="topPx"
      ></div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        columnDate: columnDate,
        dayStartHour: dayStartHour,
        dayStartMinute: dayStartMinute,
        dayEndHour: dayEndHour,
        dayEndMinute: dayEndMinute,
        isVisible: (marker$ | async)?.isVisible,
        topPx: (marker$ | async)?.top
      }"
    >
    </ng-template>
  `
    }),
    __metadata("design:paramtypes", [DateAdapter, NgZone])
], CalendarWeekViewCurrentTimeMarkerComponent);
export { CalendarWeekViewCurrentTimeMarkerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvd2Vlay9jYWxlbmRhci13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsYUFBYSxFQUNiLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBb0MvRCxJQUFhLDBDQUEwQyxHQUF2RCxNQUFhLDBDQUEwQztJQWtEckQsWUFBb0IsV0FBd0IsRUFBVSxJQUFZO1FBQTlDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQWpDbEUsZ0JBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFekQsWUFBTyxHQUdGLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDMUIsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFDcEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUNaLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQzdCLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ2pCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUN4RCxJQUFJLENBQUMsY0FBYyxDQUNwQixDQUFDO1lBQ0YsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQ3RELElBQUksQ0FBQyxZQUFZLENBQ2xCLENBQUM7WUFDRixNQUFNLGtCQUFrQixHQUN0QixDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3BELE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdkIsT0FBTztnQkFDTCxTQUFTLEVBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQztvQkFDM0MsR0FBRyxJQUFJLFVBQVU7b0JBQ2pCLEdBQUcsSUFBSSxRQUFRO2dCQUNqQixHQUFHLEVBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDO29CQUNyRCxrQkFBa0I7YUFDckIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7SUFFbUUsQ0FBQztJQUV0RSxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUFQa0MsV0FBVztZQUFnQixNQUFNOztBQWpEekQ7SUFBUixLQUFLLEVBQUU7OEJBQWEsSUFBSTs4RUFBQztBQUVqQjtJQUFSLEtBQUssRUFBRTs7Z0ZBQXNCO0FBRXJCO0lBQVIsS0FBSyxFQUFFOztrRkFBd0I7QUFFdkI7SUFBUixLQUFLLEVBQUU7OzhFQUFvQjtBQUVuQjtJQUFSLEtBQUssRUFBRTs7Z0ZBQXNCO0FBRXJCO0lBQVIsS0FBSyxFQUFFOztnRkFBc0I7QUFFckI7SUFBUixLQUFLLEVBQUU7O3FGQUEyQjtBQUUxQjtJQUFSLEtBQUssRUFBRTs4QkFBaUIsV0FBVztrRkFBTTtBQWYvQiwwQ0FBMEM7SUFsQ3RELFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw0Q0FBNEM7UUFDdEQsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4QlQ7S0FDRixDQUFDO3FDQW1EaUMsV0FBVyxFQUFnQixNQUFNO0dBbER2RCwwQ0FBMEMsQ0F5RHREO1NBekRZLDBDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGludGVydmFsLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXBUbywgc3RhcnRXaXRoLCBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi4vLi4vZGF0ZS1hZGFwdGVycy9kYXRlLWFkYXB0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWNvbHVtbkRhdGU9XCJjb2x1bW5EYXRlXCJcbiAgICAgIGxldC1kYXlTdGFydEhvdXI9XCJkYXlTdGFydEhvdXJcIlxuICAgICAgbGV0LWRheVN0YXJ0TWludXRlPVwiZGF5U3RhcnRNaW51dGVcIlxuICAgICAgbGV0LWRheUVuZEhvdXI9XCJkYXlFbmRIb3VyXCJcbiAgICAgIGxldC1kYXlFbmRNaW51dGU9XCJkYXlFbmRNaW51dGVcIlxuICAgICAgbGV0LWlzVmlzaWJsZT1cImlzVmlzaWJsZVwiXG4gICAgICBsZXQtdG9wUHg9XCJ0b3BQeFwiXG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImNhbC1jdXJyZW50LXRpbWUtbWFya2VyXCJcbiAgICAgICAgKm5nSWY9XCJpc1Zpc2libGVcIlxuICAgICAgICBbc3R5bGUudG9wLnB4XT1cInRvcFB4XCJcbiAgICAgID48L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGNvbHVtbkRhdGU6IGNvbHVtbkRhdGUsXG4gICAgICAgIGRheVN0YXJ0SG91cjogZGF5U3RhcnRIb3VyLFxuICAgICAgICBkYXlTdGFydE1pbnV0ZTogZGF5U3RhcnRNaW51dGUsXG4gICAgICAgIGRheUVuZEhvdXI6IGRheUVuZEhvdXIsXG4gICAgICAgIGRheUVuZE1pbnV0ZTogZGF5RW5kTWludXRlLFxuICAgICAgICBpc1Zpc2libGU6IChtYXJrZXIkIHwgYXN5bmMpPy5pc1Zpc2libGUsXG4gICAgICAgIHRvcFB4OiAobWFya2VyJCB8IGFzeW5jKT8udG9wXG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJXZWVrVmlld0N1cnJlbnRUaW1lTWFya2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgY29sdW1uRGF0ZTogRGF0ZTtcblxuICBASW5wdXQoKSBkYXlTdGFydEhvdXI6IG51bWJlcjtcblxuICBASW5wdXQoKSBkYXlTdGFydE1pbnV0ZTogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGRheUVuZEhvdXI6IG51bWJlcjtcblxuICBASW5wdXQoKSBkYXlFbmRNaW51dGU6IG51bWJlcjtcblxuICBASW5wdXQoKSBob3VyU2VnbWVudHM6IG51bWJlcjtcblxuICBASW5wdXQoKSBob3VyU2VnbWVudEhlaWdodDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbHVtbkRhdGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXRlPih0aGlzLmNvbHVtbkRhdGUpO1xuXG4gIG1hcmtlciQ6IE9ic2VydmFibGU8e1xuICAgIGlzVmlzaWJsZTogYm9vbGVhbjtcbiAgICB0b3A6IG51bWJlcjtcbiAgfT4gPSB0aGlzLnpvbmUub25TdGFibGUucGlwZShcbiAgICBzd2l0Y2hNYXAoKCkgPT4gaW50ZXJ2YWwoNjAgKiAxMDAwKSksXG4gICAgc3RhcnRXaXRoKDApLFxuICAgIHN3aXRjaE1hcFRvKHRoaXMuY29sdW1uRGF0ZSQpLFxuICAgIG1hcCgoY29sdW1uRGF0ZSkgPT4ge1xuICAgICAgY29uc3Qgc3RhcnRPZkRheSA9IHRoaXMuZGF0ZUFkYXB0ZXIuc2V0TWludXRlcyhcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5zZXRIb3Vycyhjb2x1bW5EYXRlLCB0aGlzLmRheVN0YXJ0SG91ciksXG4gICAgICAgIHRoaXMuZGF5U3RhcnRNaW51dGVcbiAgICAgICk7XG4gICAgICBjb25zdCBlbmRPZkRheSA9IHRoaXMuZGF0ZUFkYXB0ZXIuc2V0TWludXRlcyhcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5zZXRIb3Vycyhjb2x1bW5EYXRlLCB0aGlzLmRheUVuZEhvdXIpLFxuICAgICAgICB0aGlzLmRheUVuZE1pbnV0ZVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGhvdXJIZWlnaHRNb2RpZmllciA9XG4gICAgICAgICh0aGlzLmhvdXJTZWdtZW50cyAqIHRoaXMuaG91clNlZ21lbnRIZWlnaHQpIC8gNjA7XG4gICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXNWaXNpYmxlOlxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuaXNTYW1lRGF5KGNvbHVtbkRhdGUsIG5vdykgJiZcbiAgICAgICAgICBub3cgPj0gc3RhcnRPZkRheSAmJlxuICAgICAgICAgIG5vdyA8PSBlbmRPZkRheSxcbiAgICAgICAgdG9wOlxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuZGlmZmVyZW5jZUluTWludXRlcyhub3csIHN0YXJ0T2ZEYXkpICpcbiAgICAgICAgICBob3VySGVpZ2h0TW9kaWZpZXIsXG4gICAgICB9O1xuICAgIH0pXG4gICk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXIsIHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5jb2x1bW5EYXRlKSB7XG4gICAgICB0aGlzLmNvbHVtbkRhdGUkLm5leHQoY2hhbmdlcy5jb2x1bW5EYXRlLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICB9XG59XG4iXX0=