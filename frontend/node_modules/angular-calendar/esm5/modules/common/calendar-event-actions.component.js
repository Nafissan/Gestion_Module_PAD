import { __decorate, __metadata } from "tslib";
import { Component, Input, TemplateRef } from '@angular/core';
var CalendarEventActionsComponent = /** @class */ (function () {
    function CalendarEventActionsComponent() {
        this.trackByActionId = function (index, action) {
            return action.id ? action.id : action;
        };
    }
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CalendarEventActionsComponent.prototype, "event", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], CalendarEventActionsComponent.prototype, "customTemplate", void 0);
    CalendarEventActionsComponent = __decorate([
        Component({
            selector: 'mwl-calendar-event-actions',
            template: "\n    <ng-template\n      #defaultTemplate\n      let-event=\"event\"\n      let-trackByActionId=\"trackByActionId\"\n    >\n      <span *ngIf=\"event.actions\" class=\"cal-event-actions\">\n        <a\n          class=\"cal-event-action\"\n          href=\"javascript:;\"\n          *ngFor=\"let action of event.actions; trackBy: trackByActionId\"\n          (mwlClick)=\"action.onClick({ event: event, sourceEvent: $event })\"\n          (mwlKeydownEnter)=\"\n            action.onClick({ event: event, sourceEvent: $event })\n          \"\n          [ngClass]=\"action.cssClass\"\n          [innerHtml]=\"action.label\"\n          tabindex=\"0\"\n          role=\"button\"\n          [attr.aria-label]=\"\n            { action: action } | calendarA11y: 'actionButtonLabel'\n          \"\n        >\n        </a>\n      </span>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        event: event,\n        trackByActionId: trackByActionId\n      }\"\n    >\n    </ng-template>\n  "
        })
    ], CalendarEventActionsComponent);
    return CalendarEventActionsComponent;
}());
export { CalendarEventActionsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZXZlbnQtYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZXZlbnQtYWN0aW9ucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXlDOUQ7SUFBQTtRQUtFLG9CQUFlLEdBQUcsVUFBQyxLQUFhLEVBQUUsTUFBbUI7WUFDbkQsT0FBQSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNO1FBQTlCLENBQThCLENBQUM7SUFDbkMsQ0FBQztJQU5VO1FBQVIsS0FBSyxFQUFFOztnRUFBc0I7SUFFckI7UUFBUixLQUFLLEVBQUU7a0NBQWlCLFdBQVc7eUVBQU07SUFIL0IsNkJBQTZCO1FBdEN6QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLFFBQVEsRUFBRSxxakNBa0NUO1NBQ0YsQ0FBQztPQUNXLDZCQUE2QixDQU96QztJQUFELG9DQUFDO0NBQUEsQUFQRCxJQU9DO1NBUFksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQsIEV2ZW50QWN0aW9uIH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtZXZlbnQ9XCJldmVudFwiXG4gICAgICBsZXQtdHJhY2tCeUFjdGlvbklkPVwidHJhY2tCeUFjdGlvbklkXCJcbiAgICA+XG4gICAgICA8c3BhbiAqbmdJZj1cImV2ZW50LmFjdGlvbnNcIiBjbGFzcz1cImNhbC1ldmVudC1hY3Rpb25zXCI+XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtYWN0aW9uXCJcbiAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDo7XCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGV2ZW50LmFjdGlvbnM7IHRyYWNrQnk6IHRyYWNrQnlBY3Rpb25JZFwiXG4gICAgICAgICAgKG13bENsaWNrKT1cImFjdGlvbi5vbkNsaWNrKHsgZXZlbnQ6IGV2ZW50LCBzb3VyY2VFdmVudDogJGV2ZW50IH0pXCJcbiAgICAgICAgICAobXdsS2V5ZG93bkVudGVyKT1cIlxuICAgICAgICAgICAgYWN0aW9uLm9uQ2xpY2soeyBldmVudDogZXZlbnQsIHNvdXJjZUV2ZW50OiAkZXZlbnQgfSlcbiAgICAgICAgICBcIlxuICAgICAgICAgIFtuZ0NsYXNzXT1cImFjdGlvbi5jc3NDbGFzc1wiXG4gICAgICAgICAgW2lubmVySHRtbF09XCJhY3Rpb24ubGFiZWxcIlxuICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICAgICAgICAgIHsgYWN0aW9uOiBhY3Rpb24gfSB8IGNhbGVuZGFyQTExeTogJ2FjdGlvbkJ1dHRvbkxhYmVsJ1xuICAgICAgICAgIFwiXG4gICAgICAgID5cbiAgICAgICAgPC9hPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjdXN0b21UZW1wbGF0ZSB8fCBkZWZhdWx0VGVtcGxhdGVcIlxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICB0cmFja0J5QWN0aW9uSWQ6IHRyYWNrQnlBY3Rpb25JZFxuICAgICAgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRXZlbnRBY3Rpb25zQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgdHJhY2tCeUFjdGlvbklkID0gKGluZGV4OiBudW1iZXIsIGFjdGlvbjogRXZlbnRBY3Rpb24pID0+XG4gICAgYWN0aW9uLmlkID8gYWN0aW9uLmlkIDogYWN0aW9uO1xufVxuIl19