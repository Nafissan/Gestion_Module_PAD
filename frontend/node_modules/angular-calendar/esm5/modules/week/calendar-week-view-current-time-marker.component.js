import { __decorate, __metadata } from "tslib";
import { Component, Input, NgZone, OnChanges, SimpleChanges, TemplateRef, } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { switchMapTo, startWith, map, switchMap } from 'rxjs/operators';
import { DateAdapter } from '../../date-adapters/date-adapter';
var CalendarWeekViewCurrentTimeMarkerComponent = /** @class */ (function () {
    function CalendarWeekViewCurrentTimeMarkerComponent(dateAdapter, zone) {
        var _this = this;
        this.dateAdapter = dateAdapter;
        this.zone = zone;
        this.columnDate$ = new BehaviorSubject(this.columnDate);
        this.marker$ = this.zone.onStable.pipe(switchMap(function () { return interval(60 * 1000); }), startWith(0), switchMapTo(this.columnDate$), map(function (columnDate) {
            var startOfDay = _this.dateAdapter.setMinutes(_this.dateAdapter.setHours(columnDate, _this.dayStartHour), _this.dayStartMinute);
            var endOfDay = _this.dateAdapter.setMinutes(_this.dateAdapter.setHours(columnDate, _this.dayEndHour), _this.dayEndMinute);
            var hourHeightModifier = (_this.hourSegments * _this.hourSegmentHeight) / 60;
            var now = new Date();
            return {
                isVisible: _this.dateAdapter.isSameDay(columnDate, now) &&
                    now >= startOfDay &&
                    now <= endOfDay,
                top: _this.dateAdapter.differenceInMinutes(now, startOfDay) *
                    hourHeightModifier,
            };
        }));
    }
    CalendarWeekViewCurrentTimeMarkerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.columnDate) {
            this.columnDate$.next(changes.columnDate.currentValue);
        }
    };
    CalendarWeekViewCurrentTimeMarkerComponent.ctorParameters = function () { return [
        { type: DateAdapter },
        { type: NgZone }
    ]; };
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
            template: "\n    <ng-template\n      #defaultTemplate\n      let-columnDate=\"columnDate\"\n      let-dayStartHour=\"dayStartHour\"\n      let-dayStartMinute=\"dayStartMinute\"\n      let-dayEndHour=\"dayEndHour\"\n      let-dayEndMinute=\"dayEndMinute\"\n      let-isVisible=\"isVisible\"\n      let-topPx=\"topPx\"\n    >\n      <div\n        class=\"cal-current-time-marker\"\n        *ngIf=\"isVisible\"\n        [style.top.px]=\"topPx\"\n      ></div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        columnDate: columnDate,\n        dayStartHour: dayStartHour,\n        dayStartMinute: dayStartMinute,\n        dayEndHour: dayEndHour,\n        dayEndMinute: dayEndMinute,\n        isVisible: (marker$ | async)?.isVisible,\n        topPx: (marker$ | async)?.top\n      }\"\n    >\n    </ng-template>\n  "
        }),
        __metadata("design:paramtypes", [DateAdapter, NgZone])
    ], CalendarWeekViewCurrentTimeMarkerComponent);
    return CalendarWeekViewCurrentTimeMarkerComponent;
}());
export { CalendarWeekViewCurrentTimeMarkerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvd2Vlay9jYWxlbmRhci13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsYUFBYSxFQUNiLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBb0MvRDtJQWtERSxvREFBb0IsV0FBd0IsRUFBVSxJQUFZO1FBQWxFLGlCQUFzRTtRQUFsRCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7UUFqQ2xFLGdCQUFXLEdBQUcsSUFBSSxlQUFlLENBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXpELFlBQU8sR0FHRixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQzFCLFNBQVMsQ0FBQyxjQUFNLE9BQUEsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQyxFQUNwQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ1osV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFDN0IsR0FBRyxDQUFDLFVBQUMsVUFBVTtZQUNiLElBQU0sVUFBVSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUM1QyxLQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxFQUN4RCxLQUFJLENBQUMsY0FBYyxDQUNwQixDQUFDO1lBQ0YsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQzFDLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQ3RELEtBQUksQ0FBQyxZQUFZLENBQ2xCLENBQUM7WUFDRixJQUFNLGtCQUFrQixHQUN0QixDQUFDLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3BELElBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdkIsT0FBTztnQkFDTCxTQUFTLEVBQ1AsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQztvQkFDM0MsR0FBRyxJQUFJLFVBQVU7b0JBQ2pCLEdBQUcsSUFBSSxRQUFRO2dCQUNqQixHQUFHLEVBQ0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDO29CQUNyRCxrQkFBa0I7YUFDckIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7SUFFbUUsQ0FBQztJQUV0RSxnRUFBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDOztnQkFOZ0MsV0FBVztnQkFBZ0IsTUFBTTs7SUFqRHpEO1FBQVIsS0FBSyxFQUFFO2tDQUFhLElBQUk7a0ZBQUM7SUFFakI7UUFBUixLQUFLLEVBQUU7O29GQUFzQjtJQUVyQjtRQUFSLEtBQUssRUFBRTs7c0ZBQXdCO0lBRXZCO1FBQVIsS0FBSyxFQUFFOztrRkFBb0I7SUFFbkI7UUFBUixLQUFLLEVBQUU7O29GQUFzQjtJQUVyQjtRQUFSLEtBQUssRUFBRTs7b0ZBQXNCO0lBRXJCO1FBQVIsS0FBSyxFQUFFOzt5RkFBMkI7SUFFMUI7UUFBUixLQUFLLEVBQUU7a0NBQWlCLFdBQVc7c0ZBQU07SUFmL0IsMENBQTBDO1FBbEN0RCxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNENBQTRDO1lBQ3RELFFBQVEsRUFBRSxrNEJBOEJUO1NBQ0YsQ0FBQzt5Q0FtRGlDLFdBQVcsRUFBZ0IsTUFBTTtPQWxEdkQsMENBQTBDLENBeUR0RDtJQUFELGlEQUFDO0NBQUEsQUF6REQsSUF5REM7U0F6RFksMENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgaW50ZXJ2YWwsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcFRvLCBzdGFydFdpdGgsIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuLi8uLi9kYXRlLWFkYXB0ZXJzL2RhdGUtYWRhcHRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci13ZWVrLXZpZXctY3VycmVudC10aW1lLW1hcmtlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtY29sdW1uRGF0ZT1cImNvbHVtbkRhdGVcIlxuICAgICAgbGV0LWRheVN0YXJ0SG91cj1cImRheVN0YXJ0SG91clwiXG4gICAgICBsZXQtZGF5U3RhcnRNaW51dGU9XCJkYXlTdGFydE1pbnV0ZVwiXG4gICAgICBsZXQtZGF5RW5kSG91cj1cImRheUVuZEhvdXJcIlxuICAgICAgbGV0LWRheUVuZE1pbnV0ZT1cImRheUVuZE1pbnV0ZVwiXG4gICAgICBsZXQtaXNWaXNpYmxlPVwiaXNWaXNpYmxlXCJcbiAgICAgIGxldC10b3BQeD1cInRvcFB4XCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwiY2FsLWN1cnJlbnQtdGltZS1tYXJrZXJcIlxuICAgICAgICAqbmdJZj1cImlzVmlzaWJsZVwiXG4gICAgICAgIFtzdHlsZS50b3AucHhdPVwidG9wUHhcIlxuICAgICAgPjwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgY29sdW1uRGF0ZTogY29sdW1uRGF0ZSxcbiAgICAgICAgZGF5U3RhcnRIb3VyOiBkYXlTdGFydEhvdXIsXG4gICAgICAgIGRheVN0YXJ0TWludXRlOiBkYXlTdGFydE1pbnV0ZSxcbiAgICAgICAgZGF5RW5kSG91cjogZGF5RW5kSG91cixcbiAgICAgICAgZGF5RW5kTWludXRlOiBkYXlFbmRNaW51dGUsXG4gICAgICAgIGlzVmlzaWJsZTogKG1hcmtlciQgfCBhc3luYyk/LmlzVmlzaWJsZSxcbiAgICAgICAgdG9wUHg6IChtYXJrZXIkIHwgYXN5bmMpPy50b3BcbiAgICAgIH1cIlxuICAgID5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhcldlZWtWaWV3Q3VycmVudFRpbWVNYXJrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjb2x1bW5EYXRlOiBEYXRlO1xuXG4gIEBJbnB1dCgpIGRheVN0YXJ0SG91cjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGRheVN0YXJ0TWludXRlOiBudW1iZXI7XG5cbiAgQElucHV0KCkgZGF5RW5kSG91cjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGRheUVuZE1pbnV0ZTogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50czogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50SGVpZ2h0OiBudW1iZXI7XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY29sdW1uRGF0ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGU+KHRoaXMuY29sdW1uRGF0ZSk7XG5cbiAgbWFya2VyJDogT2JzZXJ2YWJsZTx7XG4gICAgaXNWaXNpYmxlOiBib29sZWFuO1xuICAgIHRvcDogbnVtYmVyO1xuICB9PiA9IHRoaXMuem9uZS5vblN0YWJsZS5waXBlKFxuICAgIHN3aXRjaE1hcCgoKSA9PiBpbnRlcnZhbCg2MCAqIDEwMDApKSxcbiAgICBzdGFydFdpdGgoMCksXG4gICAgc3dpdGNoTWFwVG8odGhpcy5jb2x1bW5EYXRlJCksXG4gICAgbWFwKChjb2x1bW5EYXRlKSA9PiB7XG4gICAgICBjb25zdCBzdGFydE9mRGF5ID0gdGhpcy5kYXRlQWRhcHRlci5zZXRNaW51dGVzKFxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLnNldEhvdXJzKGNvbHVtbkRhdGUsIHRoaXMuZGF5U3RhcnRIb3VyKSxcbiAgICAgICAgdGhpcy5kYXlTdGFydE1pbnV0ZVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGVuZE9mRGF5ID0gdGhpcy5kYXRlQWRhcHRlci5zZXRNaW51dGVzKFxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLnNldEhvdXJzKGNvbHVtbkRhdGUsIHRoaXMuZGF5RW5kSG91ciksXG4gICAgICAgIHRoaXMuZGF5RW5kTWludXRlXG4gICAgICApO1xuICAgICAgY29uc3QgaG91ckhlaWdodE1vZGlmaWVyID1cbiAgICAgICAgKHRoaXMuaG91clNlZ21lbnRzICogdGhpcy5ob3VyU2VnbWVudEhlaWdodCkgLyA2MDtcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc1Zpc2libGU6XG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5pc1NhbWVEYXkoY29sdW1uRGF0ZSwgbm93KSAmJlxuICAgICAgICAgIG5vdyA+PSBzdGFydE9mRGF5ICYmXG4gICAgICAgICAgbm93IDw9IGVuZE9mRGF5LFxuICAgICAgICB0b3A6XG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5kaWZmZXJlbmNlSW5NaW51dGVzKG5vdywgc3RhcnRPZkRheSkgKlxuICAgICAgICAgIGhvdXJIZWlnaHRNb2RpZmllcixcbiAgICAgIH07XG4gICAgfSlcbiAgKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlciwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmNvbHVtbkRhdGUpIHtcbiAgICAgIHRoaXMuY29sdW1uRGF0ZSQubmV4dChjaGFuZ2VzLmNvbHVtbkRhdGUuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==