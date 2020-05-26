import { CommonModule } from '@angular/common';
import { __values } from 'tslib';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, ViewChild, forwardRef, Renderer, Attribute, Input, NgZone, Output, EventEmitter, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MarkdownEditorComponent = /** @class */ (function () {
    function MarkdownEditorComponent(required, maxlength, _renderer, _domSanitizer) {
        if (required === void 0) { required = false; }
        if (maxlength === void 0) { maxlength = -1; }
        this.required = required;
        this.maxlength = maxlength;
        this._renderer = _renderer;
        this._domSanitizer = _domSanitizer;
        this.hideToolbar = false;
        this.height = "300px";
        this._options = {};
        this.hideIcons = {};
        this.showPreviewPanel = true;
        this.isFullScreen = false;
        this.dragover = false;
        this.isUploading = false;
        this._defaultOption = {
            showBorder: true,
            hideIcons: [],
            scrollPastEnd: 0,
            enablePreviewContentClick: false,
            resizable: false
        };
        this._onChange = function (_) { };
        this._onTouched = function () { };
    }
    Object.defineProperty(MarkdownEditorComponent.prototype, "mode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mode || 'editor';
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value || (value.toLowerCase() !== 'editor' && value.toLowerCase() !== 'preview')) {
                value = 'editor';
            }
            this._mode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownEditorComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            return this._options || {};
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this._options = Object.assign(this._defaultOption, {}, value);
            this.hideIcons = {};
            if (this._options.hideIcons) {
                this._options.hideIcons.forEach(function (v) { return _this.hideIcons[v] = true; });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownEditorComponent.prototype, "markdownValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this._markdownValue || '';
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this._markdownValue = value;
            this._onChange(value);
            if (this.preRender && this.preRender instanceof Function) {
                value = this.preRender(value);
            }
            if (value !== null && value !== undefined) {
                if (this._renderMarkTimeout)
                    clearTimeout(this._renderMarkTimeout);
                this._renderMarkTimeout = setTimeout(function () {
                    /** @type {?} */
                    var html = marked(value || '', _this._markedOpt);
                    _this.previewHtml = _this._domSanitizer.bypassSecurityTrustHtml(html);
                }, 100);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownEditorComponent.prototype, "_hasUploadFunction", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.upload && this.upload instanceof Function;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MarkdownEditorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var markedRender = new marked.Renderer();
        markedRender.code = function (code, language) {
            /** @type {?} */
            var validLang = !!(language && hljs.getLanguage(language));
            /** @type {?} */
            var highlighted = validLang ? hljs.highlight(language, code).value : code;
            return "<pre style=\"padding: 0; border-radius: 0;\"><code class=\"hljs " + language + "\">" + highlighted + "</code></pre>";
        };
        markedRender.table = function (header, body) {
            return "<table class=\"table table-bordered\">\n<thead>\n" + header + "</thead>\n<tbody>\n" + body + "</tbody>\n</table>\n";
        };
        markedRender.listitem = function (text) {
            if (/^\s*\[[x ]\]\s*/.test(text)) {
                text = text
                    .replace(/^\s*\[ \]\s*/, '<i class="fa fa-square-o" style="margin: 0 0.2em 0.25em -1.6em;"></i> ')
                    .replace(/^\s*\[x\]\s*/, '<i class="fa fa-check-square" style="margin: 0 0.2em 0.25em -1.6em;"></i> ');
                return "<li style=\"list-style: none;\">" + text + "</li>";
            }
            else {
                return "<li>" + text + "</li>";
            }
        };
        /** @type {?} */
        var markedjsOpt = {
            renderer: markedRender,
            highlight: function (code) { return hljs.highlightAuto(code).value; }
        };
        this._markedOpt = Object.assign({}, this.options.markedjsOpt, markedjsOpt);
    };
    /**
     * @return {?}
     */
    MarkdownEditorComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var editorElement = this.aceEditorContainer.nativeElement;
        this._editor = ace.edit(editorElement);
        this._editor.$blockScrolling = Infinity;
        this._editor.getSession().setUseWrapMode(true);
        this._editor.getSession().setMode("ace/mode/markdown");
        this._editor.setValue(this.markdownValue || '', 1);
        this._editor.setOption('scrollPastEnd', this._options.scrollPastEnd || 0);
        this._editor.on("change", function (e) {
            /** @type {?} */
            var val = _this._editor.getValue();
            _this.markdownValue = val;
        });
    };
    /**
     * @return {?}
     */
    MarkdownEditorComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._editor && this._editor.destroy();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MarkdownEditorComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        setTimeout(function () {
            _this.markdownValue = value;
            if (typeof value !== 'undefined' && _this._editor) {
                _this._editor.setValue(value || '', 1);
            }
        }, 1);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MarkdownEditorComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MarkdownEditorComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    /**
     * @param {?} c
     * @return {?}
     */
    MarkdownEditorComponent.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        /** @type {?} */
        var result = null;
        if (this.required && this.markdownValue.length === 0) {
            result = { required: true };
        }
        if (this.maxlength > 0 && this.markdownValue.length > this.maxlength) {
            result = { maxlength: true };
        }
        return result;
    };
    /**
     * @param {?} type
     * @param {?=} customContent
     * @return {?}
     */
    MarkdownEditorComponent.prototype.insertContent = /**
     * @param {?} type
     * @param {?=} customContent
     * @return {?}
     */
    function (type, customContent) {
        if (!this._editor)
            return;
        /** @type {?} */
        var selectedText = this._editor.getSelectedText();
        /** @type {?} */
        var isSelected = !!selectedText;
        /** @type {?} */
        var startSize = 2;
        /** @type {?} */
        var initText = '';
        /** @type {?} */
        var range = this._editor.selection.getRange();
        switch (type) {
            case 'Bold':
                initText = 'Bold Text';
                selectedText = "**" + (selectedText || initText) + "**";
                break;
            case 'Italic':
                initText = 'Italic Text';
                selectedText = "*" + (selectedText || initText) + "*";
                startSize = 1;
                break;
            case 'Heading':
                initText = 'Heading';
                selectedText = "# " + (selectedText || initText);
                break;
            case 'Refrence':
                initText = 'Refrence';
                selectedText = "> " + (selectedText || initText);
                break;
            case 'Link':
                selectedText = "[](http://)";
                startSize = 1;
                break;
            case 'Image':
                selectedText = "![](http://)";
                break;
            case 'Ul':
                selectedText = "- " + (selectedText || initText);
                break;
            case 'Ol':
                selectedText = "1. " + (selectedText || initText);
                startSize = 3;
                break;
            case 'Code':
                initText = 'Source Code';
                selectedText = "```language\r\n" + (selectedText || initText) + "\r\n```";
                startSize = 3;
                break;
            case 'Custom':
                selectedText = customContent;
                startSize = 0;
                break;
        }
        this._editor.session.replace(range, selectedText);
        if (!isSelected) {
            range.start.column += startSize;
            range.end.column = range.start.column + initText.length;
            this._editor.selection.setRange(range);
        }
        this._editor.focus();
    };
    /**
     * @return {?}
     */
    MarkdownEditorComponent.prototype.togglePreview = /**
     * @return {?}
     */
    function () {
        this.showPreviewPanel = !this.showPreviewPanel;
        this.editorResize();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MarkdownEditorComponent.prototype.previewPanelClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.options.enablePreviewContentClick !== true) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
    /**
     * @return {?}
     */
    MarkdownEditorComponent.prototype.fullScreen = /**
     * @return {?}
     */
    function () {
        this.isFullScreen = !this.isFullScreen;
        this._renderer.setElementStyle(document.body, 'overflowY', this.isFullScreen ? 'hidden' : 'auto');
        this.editorResize();
    };
    /**
     * @param {?} size
     * @return {?}
     */
    MarkdownEditorComponent.prototype.mdEditorResize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.editorResize();
    };
    /**
     * @param {?=} timeOut
     * @return {?}
     */
    MarkdownEditorComponent.prototype.editorResize = /**
     * @param {?=} timeOut
     * @return {?}
     */
    function (timeOut) {
        var _this = this;
        if (timeOut === void 0) { timeOut = 100; }
        if (!this._editor)
            return;
        if (this._editorResizeTimer)
            clearTimeout(this._editorResizeTimer);
        this._editorResizeTimer = setTimeout(function () {
            _this._editor.resize();
            _this._editor.focus();
        }, timeOut);
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    MarkdownEditorComponent.prototype.onDragover = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.stopImmediatePropagation();
        evt.preventDefault();
        if (!this._hasUploadFunction)
            return;
        this.dragover = true;
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    MarkdownEditorComponent.prototype.onDrop = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        var _this = this;
        evt.stopImmediatePropagation();
        evt.preventDefault();
        if (!this._hasUploadFunction || this.isUploading)
            return;
        if (!evt.dataTransfer.files || evt.dataTransfer.files.length === 0) {
            this.dragover = false;
            return;
        }
        this.isUploading = true;
        Promise.resolve()
            .then(function () {
            return _this.upload(evt.dataTransfer.files);
        })
            .then(function (data) {
            var e_1, _a;
            if (Array.isArray(data)) {
                /** @type {?} */
                var msg = [];
                try {
                    for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                        var item = data_1_1.value;
                        /** @type {?} */
                        var tempMsg = "[" + item.name + "](" + item.url + ")";
                        if (item.isImg) {
                            tempMsg = "!" + tempMsg;
                        }
                        msg.push(tempMsg);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                _this.insertContent('Custom', msg.join('\r\n'));
            }
            else {
                console.warn('Invalid upload result. Please using follow this type `UploadResult`.');
            }
            _this.isUploading = false;
            _this.dragover = false;
        })
            .catch(function (err) {
            console.error(err);
            _this.isUploading = false;
            _this.dragover = false;
        });
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    MarkdownEditorComponent.prototype.onDragleave = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.stopImmediatePropagation();
        evt.preventDefault();
        if (!this._hasUploadFunction)
            return;
        this.dragover = false;
    };
    MarkdownEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'md-editor',
                    template: "<div class=\"md-editor-container\" [class.fullscreen]=\"isFullScreen\" [class.md-editor-resizable]=\"options?.resizable\"\r\n  [style.height]=\"height\">\r\n  <div class=\"md-layout\">\r\n    <div class=\"tool-bar\" *ngIf=\"!hideToolbar && mode != 'preview'\">\r\n      <div class=\"btn-group\">\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Bold\" (click)=\"insertContent('Bold')\"\r\n          *ngIf=\"!hideIcons.Bold\">\r\n          <i class=\"fa fa-bold\"></i>\r\n        </button>\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Italic\" (click)=\"insertContent('Italic')\"\r\n          *ngIf=\"!hideIcons.Italic\">\r\n          <i class=\"fa fa-italic\"></i>\r\n        </button>\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Heading\" (click)=\"insertContent('Heading')\"\r\n          *ngIf=\"!hideIcons.Heading\">\r\n          <i class=\"fa fa-header\"></i>\r\n        </button>\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Refrence\" (click)=\"insertContent('Refrence')\"\r\n          *ngIf=\"!hideIcons.Refrence\">\r\n          <i class=\"fa fa-quote-left\"></i>\r\n        </button>\r\n      </div>\r\n      <div class=\"btn-group\">\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Link\" (click)=\"insertContent('Link')\"\r\n          *ngIf=\"!hideIcons.Link\">\r\n          <i class=\"fa fa-link\"></i>\r\n        </button>\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Image\" (click)=\"insertContent('Image')\"\r\n          *ngIf=\"!hideIcons.Image\">\r\n          <i class=\"fa fa-image\"></i>\r\n        </button>\r\n      </div>\r\n      <div class=\"btn-group\">\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Unordered List\" (click)=\"insertContent('Ul')\"\r\n          *ngIf=\"!hideIcons.Ul\">\r\n          <i class=\"fa fa-list-ul\"></i>\r\n        </button>\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Ordered List\" (click)=\"insertContent('Ol')\"\r\n          *ngIf=\"!hideIcons.Ol\">\r\n          <i class=\"fa fa-list-ol\"></i>\r\n        </button>\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Code Block\" (click)=\"insertContent('Code')\"\r\n          *ngIf=\"!hideIcons.Code\">\r\n          <i class=\"fa fa-file-code-o\"></i>\r\n        </button>\r\n      </div>\r\n      <div class=\"btn-group\">\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\"\r\n          [attr.title]=\"showPreviewPanel ? 'Hide Preview' : 'Show Preview'\" (click)=\"togglePreview()\"\r\n          *ngIf=\"!hideIcons.TogglePreview\">\r\n          <i class=\"fa\" [class.fa-eye]=\"!showPreviewPanel\" [class.fa-eye-slash]=\"showPreviewPanel\"></i>\r\n        </button>\r\n      </div>\r\n      <div class=\"btn-group pull-right hide-split\">\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" [class.active]=\"isFullScreen\" (click)=\"fullScreen()\"\r\n          *ngIf=\"!hideIcons.FullScreen\">\r\n          <i class=\"fa fa-arrows-alt\"></i>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <div class=\"editor-container\">\r\n      <div [class.dragover]=\"dragover\" [style.display]=\"mode == 'preview' ? 'none' : null\"\r\n        (dragover)=\"onDragover($event)\">\r\n        <div class=\"drag-container\">\r\n          <div class=\"upload-loading\">\r\n            <i class=\"fa fa-upload\" *ngIf=\"!isUploading\"></i>\r\n            <i class=\"fa fa-spinner fa-pulse fa-fw\" *ngIf=\"isUploading\"></i>\r\n            <div class=\"text\">{{ isUploading ? 'Uploading' : 'Drag it here' }}</div>\r\n          </div>\r\n        </div>\r\n        <div class=\"drag-container drag-container-mask\" (drop)=\"onDrop($event)\" (dragleave)=\"onDragleave($event)\"></div>\r\n        <div class=\"editor-panel\">\r\n          <div class=\"ace-editor\" #aceEditor></div>\r\n        </div>\r\n      </div>\r\n      <div [style.display]=\"showPreviewPanel ? 'block' : 'none'\" (click)=\"previewPanelClick($event)\">\r\n        <div class=\"preview-panel\" [innerHtml]=\"previewHtml\"></div>\r\n      </div>\r\n    </div>\r\n    <div class=\"md-footer\" *ngIf=\"maxlength > 0 && mode != 'preview'\">\r\n      <div class=\"text-right length-view\">\r\n        {{ markdownValue?.length }} / {{ maxlength }}\r\n      </div>\r\n      <div class=\"resize-btn\"></div>\r\n    </div>\r\n  </div>\r\n  <md-editor-resize-sensor *ngIf=\"options?.resizable\" (resize)=\"mdEditorResize($event)\"></md-editor-resize-sensor>\r\n</div>\r\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return MarkdownEditorComponent; }),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(function () { return MarkdownEditorComponent; }),
                            multi: true
                        }
                    ],
                    styles: [".md-editor-container{position:relative;height:100%;margin-bottom:15px;border:1px solid rgba(0,0,0,.1)}.md-editor-container.fullscreen{margin:0;position:fixed;border:0;top:0;left:0;width:100%!important;height:100%!important;z-index:99999999}.md-editor-container.md-editor-resizable:not(.fullscreen){resize:both;overflow:auto;display:inline-block;width:100%}.md-editor-container.md-editor-resizable:not(.fullscreen) .md-footer{z-index:-1}.md-editor-container .md-layout{height:100%;display:flex;flex-direction:column}.md-editor-container .md-layout .tool-bar{background-color:#f5f5f5;border-bottom:1px solid rgba(0,0,0,.1)}.md-editor-container .md-layout .tool-bar .btn-group{padding:6px}.md-editor-container .md-layout .tool-bar .btn-group:first-child>.btn:first-child::before{display:none}.md-editor-container .md-layout .tool-bar .btn-group>.btn:first-child::before{content:' ';background-color:#a9a9a9;width:1px;height:24px;left:-9px;top:2px;position:absolute}.md-editor-container .md-layout .tool-bar .btn-group.hide-split>.btn:first-child::before{display:none}.md-editor-container .md-layout .tool-bar .btn{margin-bottom:0}.md-editor-container .md-layout .editor-container{flex:1;display:flex}.md-editor-container .md-layout .editor-container>div{flex:1}.md-editor-container .md-layout .editor-container>div .drag-container{display:none}.md-editor-container .md-layout .editor-container>div.dragover{position:relative}.md-editor-container .md-layout .editor-container>div.dragover .drag-container{display:block;position:absolute;left:0;top:0;right:0;bottom:0;z-index:10;background-color:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;font-size:50px;color:#fff}.md-editor-container .md-layout .editor-container>div.dragover .drag-container.drag-container-mask{background-color:transparent;z-index:11}.md-editor-container .md-layout .editor-container>div.dragover .drag-container .upload-loading{display:flex;flex-direction:column;align-items:center}.md-editor-container .md-layout .editor-container>div.dragover .drag-container .upload-loading .text{font-size:20px;margin-top:10px}.md-editor-container .md-layout .editor-container .editor-panel{height:100%}.md-editor-container .md-layout .editor-container .editor-panel .ace-editor{height:100%;min-height:100%}.md-editor-container .md-layout .preview-panel{height:100%;border-left:1px solid rgba(0,0,0,.1);background-color:#fff;padding:10px;overflow-y:auto}.md-editor-container .md-layout .md-footer{background-color:#f0f0f0;border-top:1px solid rgba(0,0,0,.1);display:flex;align-items:center}.md-editor-container .md-layout .md-footer .length-view{flex:1;padding:4px 2px 0;font-size:12px;line-height:16px}.md-editor-container .md-layout .md-footer .resize-btn{width:17px}"]
                }] }
    ];
    /** @nocollapse */
    MarkdownEditorComponent.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: Attribute, args: ['required',] }] },
        { type: Number, decorators: [{ type: Attribute, args: ['maxlength',] }] },
        { type: Renderer },
        { type: DomSanitizer }
    ]; };
    MarkdownEditorComponent.propDecorators = {
        aceEditorContainer: [{ type: ViewChild, args: ['aceEditor',] }],
        hideToolbar: [{ type: Input }],
        height: [{ type: Input }],
        preRender: [{ type: Input }],
        upload: [{ type: Input }],
        mode: [{ type: Input }],
        options: [{ type: Input }]
    };
    return MarkdownEditorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MarkdownEditorResizeSensorComponent = /** @class */ (function () {
    function MarkdownEditorResizeSensorComponent(_ngZone) {
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
    MarkdownEditorResizeSensorComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.sizeInfo = {
            width: this.resizeSensor.nativeElement.offsetWidth,
            height: this.resizeSensor.nativeElement.offsetHeight
        };
        this._ngZone.runOutsideAngular(function () {
            setTimeout(function () {
                _this.detectSize();
            }, _this.interval);
        });
    };
    /**
     * @private
     * @return {?}
     */
    MarkdownEditorResizeSensorComponent.prototype.detectSize = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var width = this.resizeSensor.nativeElement.offsetWidth;
        /** @type {?} */
        var height = this.resizeSensor.nativeElement.offsetHeight;
        if (this.sizeInfo.width !== width || this.sizeInfo.height !== height) {
            this.sizeInfo = {
                width: width,
                height: height
            };
            this.resize.emit(this.sizeInfo);
        }
        setTimeout(function () {
            _this.detectSize();
        }, this.interval);
    };
    MarkdownEditorResizeSensorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'md-editor-resize-sensor',
                    template: "<div class=\"md-editor-resize-sensor\" #resizeSensor></div>\r\n",
                    styles: [".md-editor-resize-sensor{position:absolute;left:0;right:0;top:0;bottom:0;z-index:-1}"]
                }] }
    ];
    /** @nocollapse */
    MarkdownEditorResizeSensorComponent.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    MarkdownEditorResizeSensorComponent.propDecorators = {
        resizeSensor: [{ type: ViewChild, args: ['resizeSensor',] }],
        interval: [{ type: Input }],
        resize: [{ type: Output }]
    };
    return MarkdownEditorResizeSensorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LMarkdownEditorModule = /** @class */ (function () {
    function LMarkdownEditorModule() {
    }
    LMarkdownEditorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        MarkdownEditorComponent,
                        MarkdownEditorResizeSensorComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    exports: [
                        MarkdownEditorComponent,
                        MarkdownEditorResizeSensorComponent
                    ]
                },] }
    ];
    return LMarkdownEditorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MarkdownEditorComponent, MarkdownEditorResizeSensorComponent, LMarkdownEditorModule };

//# sourceMappingURL=ngx-markdown-editor.js.map