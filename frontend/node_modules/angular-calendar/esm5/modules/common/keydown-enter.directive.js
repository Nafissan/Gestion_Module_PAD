import { __decorate, __metadata } from "tslib";
import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
var KeydownEnterDirective = /** @class */ (function () {
    function KeydownEnterDirective() {
        this.keydown = new EventEmitter(); // tslint:disable-line
    }
    KeydownEnterDirective.prototype.onKeyPress = function (event) {
        if (event.keyCode === 13 || event.which === 13 || event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.keydown.emit(event);
        }
    };
    __decorate([
        Output('mwlKeydownEnter'),
        __metadata("design:type", Object)
    ], KeydownEnterDirective.prototype, "keydown", void 0);
    __decorate([
        HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], KeydownEnterDirective.prototype, "onKeyPress", null);
    KeydownEnterDirective = __decorate([
        Directive({
            selector: '[mwlKeydownEnter]',
        })
    ], KeydownEnterDirective);
    return KeydownEnterDirective;
}());
export { KeydownEnterDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5ZG93bi1lbnRlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24va2V5ZG93bi1lbnRlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLOUU7SUFBQTtRQUM2QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQyxDQUFDLHNCQUFzQjtJQVV0RixDQUFDO0lBUEMsMENBQVUsR0FBVixVQUFXLEtBQVU7UUFDbkIsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLE9BQU8sRUFBRTtZQUN2RSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQVQwQjtRQUExQixNQUFNLENBQUMsaUJBQWlCLENBQUM7OzBEQUFtQztJQUc3RDtRQURDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OzsyREFPbkM7SUFWVSxxQkFBcUI7UUFIakMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtTQUM5QixDQUFDO09BQ1cscUJBQXFCLENBV2pDO0lBQUQsNEJBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bEtleWRvd25FbnRlcl0nLFxufSlcbmV4cG9ydCBjbGFzcyBLZXlkb3duRW50ZXJEaXJlY3RpdmUge1xuICBAT3V0cHV0KCdtd2xLZXlkb3duRW50ZXInKSBrZXlkb3duID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlQcmVzcyhldmVudDogYW55KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzIHx8IGV2ZW50LndoaWNoID09PSAxMyB8fCBldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMua2V5ZG93bi5lbWl0KGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==