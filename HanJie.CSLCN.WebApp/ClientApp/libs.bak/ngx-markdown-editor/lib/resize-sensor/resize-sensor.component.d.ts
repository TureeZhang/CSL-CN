import { NgZone, ElementRef, EventEmitter } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class MarkdownEditorResizeSensorComponent {
    private _ngZone;
    resizeSensor: ElementRef;
    interval: number;
    resize: EventEmitter<any>;
    private sizeInfo;
    constructor(_ngZone: NgZone);
    ngAfterViewInit(): void;
    private detectSize;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MarkdownEditorResizeSensorComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MarkdownEditorResizeSensorComponent, "md-editor-resize-sensor", never, { "interval": "interval"; }, { "resize": "resize"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLXNlbnNvci5jb21wb25lbnQuZC50cyIsInNvdXJjZXMiOlsicmVzaXplLXNlbnNvci5jb21wb25lbnQuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdab25lLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWFya2Rvd25FZGl0b3JSZXNpemVTZW5zb3JDb21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBfbmdab25lO1xyXG4gICAgcmVzaXplU2Vuc29yOiBFbGVtZW50UmVmO1xyXG4gICAgaW50ZXJ2YWw6IG51bWJlcjtcclxuICAgIHJlc2l6ZTogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgICBwcml2YXRlIHNpemVJbmZvO1xyXG4gICAgY29uc3RydWN0b3IoX25nWm9uZTogTmdab25lKTtcclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBkZXRlY3RTaXplO1xyXG59XHJcbiJdfQ==