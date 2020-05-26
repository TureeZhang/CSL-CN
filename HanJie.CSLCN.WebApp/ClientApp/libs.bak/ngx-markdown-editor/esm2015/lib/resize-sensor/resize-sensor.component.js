/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, NgZone, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
export class MarkdownEditorResizeSensorComponent {
    /**
     * @param {?} _ngZone
     */
    constructor(_ngZone) {
        this._ngZone = _ngZone;
        this.interval = 500;
        this.resize = new EventEmitter();
        this.sizeInfo = {
            width: 0,
            height: 0
        };
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.sizeInfo = {
            width: this.resizeSensor.nativeElement.offsetWidth,
            height: this.resizeSensor.nativeElement.offsetHeight
        };
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.detectSize();
            }, this.interval);
        });
    }
    /**
     * @private
     * @return {?}
     */
    detectSize() {
        /** @type {?} */
        let width = this.resizeSensor.nativeElement.offsetWidth;
        /** @type {?} */
        let height = this.resizeSensor.nativeElement.offsetHeight;
        if (this.sizeInfo.width !== width || this.sizeInfo.height !== height) {
            this.sizeInfo = {
                width: width,
                height: height
            };
            this.resize.emit(this.sizeInfo);
        }
        setTimeout(() => {
            this.detectSize();
        }, this.interval);
    }
}
MarkdownEditorResizeSensorComponent.decorators = [
    { type: Component, args: [{
                selector: 'md-editor-resize-sensor',
                template: "<div class=\"md-editor-resize-sensor\" #resizeSensor></div>\r\n",
                styles: [".md-editor-resize-sensor{position:absolute;left:0;right:0;top:0;bottom:0;z-index:-1}"]
            }] }
];
/** @nocollapse */
MarkdownEditorResizeSensorComponent.ctorParameters = () => [
    { type: NgZone }
];
MarkdownEditorResizeSensorComponent.propDecorators = {
    resizeSensor: [{ type: ViewChild, args: ['resizeSensor',] }],
    interval: [{ type: Input }],
    resize: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    MarkdownEditorResizeSensorComponent.prototype.resizeSensor;
    /** @type {?} */
    MarkdownEditorResizeSensorComponent.prototype.interval;
    /** @type {?} */
    MarkdownEditorResizeSensorComponent.prototype.resize;
    /**
     * @type {?}
     * @private
     */
    MarkdownEditorResizeSensorComponent.prototype.sizeInfo;
    /**
     * @type {?}
     * @private
     */
    MarkdownEditorResizeSensorComponent.prototype._ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLXNlbnNvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWFya2Rvd24tZWRpdG9yLyIsInNvdXJjZXMiOlsibGliL3Jlc2l6ZS1zZW5zb3IvcmVzaXplLXNlbnNvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRdEcsTUFBTSxPQUFPLG1DQUFtQzs7OztJQVk5QyxZQUFvQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQVIxQixhQUFRLEdBQVcsR0FBRyxDQUFDO1FBQ3RCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUV0RCxhQUFRLEdBQVE7WUFDdEIsS0FBSyxFQUFFLENBQUM7WUFDUixNQUFNLEVBQUUsQ0FBQztTQUNWLENBQUE7SUFJRCxDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsV0FBVztZQUNsRCxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsWUFBWTtTQUNyRCxDQUFBO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDbEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDcEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRU8sVUFBVTs7WUFDWixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsV0FBVzs7WUFDbkQsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFlBQVk7UUFDekQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFO1lBQ3BFLElBQUksQ0FBQyxRQUFRLEdBQUc7Z0JBQ2QsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osTUFBTSxFQUFFLE1BQU07YUFDZixDQUFBO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7OztZQS9DRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsMkVBQW1DOzthQUVwQzs7OztZQU5tQixNQUFNOzs7MkJBVXZCLFNBQVMsU0FBQyxjQUFjO3VCQUV4QixLQUFLO3FCQUNMLE1BQU07Ozs7SUFIUCwyREFBb0Q7O0lBRXBELHVEQUFnQzs7SUFDaEMscURBQThEOzs7OztJQUU5RCx1REFHQzs7Ozs7SUFFVyxzREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE5nWm9uZSwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWQtZWRpdG9yLXJlc2l6ZS1zZW5zb3InLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9yZXNpemUtc2Vuc29yLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Jlc2l6ZS1zZW5zb3Iuc2NzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTWFya2Rvd25FZGl0b3JSZXNpemVTZW5zb3JDb21wb25lbnQge1xyXG5cclxuICBAVmlld0NoaWxkKCdyZXNpemVTZW5zb3InKSByZXNpemVTZW5zb3I6IEVsZW1lbnRSZWY7XHJcblxyXG4gIEBJbnB1dCgpIGludGVydmFsOiBudW1iZXIgPSA1MDA7XHJcbiAgQE91dHB1dCgpIHJlc2l6ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgcHJpdmF0ZSBzaXplSW5mbzogYW55ID0ge1xyXG4gICAgd2lkdGg6IDAsXHJcbiAgICBoZWlnaHQ6IDBcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5zaXplSW5mbyA9IHtcclxuICAgICAgd2lkdGg6IHRoaXMucmVzaXplU2Vuc29yLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsXHJcbiAgICAgIGhlaWdodDogdGhpcy5yZXNpemVTZW5zb3IubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHRcclxuICAgIH1cclxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZGV0ZWN0U2l6ZSgpO1xyXG4gICAgICB9LCB0aGlzLmludGVydmFsKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZXRlY3RTaXplKCkge1xyXG4gICAgbGV0IHdpZHRoID0gdGhpcy5yZXNpemVTZW5zb3IubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgIGxldCBoZWlnaHQgPSB0aGlzLnJlc2l6ZVNlbnNvci5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgIGlmICh0aGlzLnNpemVJbmZvLndpZHRoICE9PSB3aWR0aCB8fCB0aGlzLnNpemVJbmZvLmhlaWdodCAhPT0gaGVpZ2h0KSB7XHJcbiAgICAgIHRoaXMuc2l6ZUluZm8gPSB7XHJcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIGhlaWdodDogaGVpZ2h0XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZXNpemUuZW1pdCh0aGlzLnNpemVJbmZvKTtcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmRldGVjdFNpemUoKTtcclxuICAgIH0sIHRoaXMuaW50ZXJ2YWwpO1xyXG4gIH1cclxufVxyXG4iXX0=