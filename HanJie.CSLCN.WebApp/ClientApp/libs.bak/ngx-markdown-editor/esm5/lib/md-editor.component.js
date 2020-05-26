/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewChild, forwardRef, Renderer, Attribute, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
                    for (var data_1 = tslib_1.__values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
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
export { MarkdownEditorComponent };
if (false) {
    /** @type {?} */
    MarkdownEditorComponent.prototype.aceEditorContainer;
    /** @type {?} */
    MarkdownEditorComponent.prototype.hideToolbar;
    /** @type {?} */
    MarkdownEditorComponent.prototype.height;
    /** @type {?} */
    MarkdownEditorComponent.prototype.preRender;
    /** @type {?} */
    MarkdownEditorComponent.prototype.upload;
    /**
     * @type {?}
     * @private
     */
    MarkdownEditorComponent.prototype._mode;
    /**
     * @type {?}
     * @private
     */
    MarkdownEditorComponent.prototype._options;
    /** @type {?} */
    MarkdownEditorComponent.prototype.hideIcons;
    /** @type {?} */
    MarkdownEditorComponent.prototype.showPreviewPanel;
    /** @type {?} */
    MarkdownEditorComponent.prototype.isFullScreen;
    /** @type {?} */
    MarkdownEditorComponent.prototype.previewHtml;
    /** @type {?} */
    MarkdownEditorComponent.prototype.dragover;
    /** @type {?} */
    MarkdownEditorComponent.prototype.isUploading;
    /**
     * @type {?}
     * @private
     */
    MarkdownEditorComponent.prototype._markdownValue;
    /**
     * @type {?}
     * @private
     */
    MarkdownEditorComponent.prototype._editor;
    /**
     * @type {?}
     * @private
     */
    MarkdownEditorComponent.prototype._editorResizeTimer;
    /**
     * @type {?}
     * @private
     */
    MarkdownEditorComponent.prototype._renderMarkTimeout;
    /**
     * @type {?}
     * @private
     */
    MarkdownEditorComponent.prototype._markedOpt;
    /**
     * @type {?}
     * @private
     */
    MarkdownEditorComponent.prototype._defaultOption;
    /**
     * @type {?}
     * @private
     */
    MarkdownEditorComponent.prototype._onChange;
    /**
     * @type {?}
     * @private
     */
    MarkdownEditorComponent.prototype._onTouched;
    /** @type {?} */
    MarkdownEditorComponent.prototype.required;
    /** @type {?} */
    MarkdownEditorComponent.prototype.maxlength;
    /**
     * @type {?}
     * @private
     */
    MarkdownEditorComponent.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    MarkdownEditorComponent.prototype._domSanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWQtZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXJrZG93bi1lZGl0b3IvIiwic291cmNlcyI6WyJsaWIvbWQtZWRpdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixhQUFhLEVBQWdELE1BQU0sZ0JBQWdCLENBQUM7QUFDdEksT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBT3pEO0lBZ0dFLGlDQUNnQyxRQUF5QixFQUN4QixTQUFzQixFQUM3QyxTQUFtQixFQUNuQixhQUEyQjtRQUhMLHlCQUFBLEVBQUEsZ0JBQXlCO1FBQ3hCLDBCQUFBLEVBQUEsYUFBcUIsQ0FBQztRQUR2QixhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUN4QixjQUFTLEdBQVQsU0FBUyxDQUFhO1FBQzdDLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUEvRXJCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLFdBQU0sR0FBVyxPQUFPLENBQUM7UUEyQmpDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFFcEIsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFFOUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQTBCNUIsbUJBQWMsR0FBbUI7WUFDdkMsVUFBVSxFQUFFLElBQUk7WUFDaEIsU0FBUyxFQUFFLEVBQUU7WUFDYixhQUFhLEVBQUUsQ0FBQztZQUNoQix5QkFBeUIsRUFBRSxLQUFLO1lBQ2hDLFNB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NUIsMENBQXFCOzs7OztJQUNyQixxREFBZ0M7Ozs7O0lBQ2hDLHFEQUFnQzs7Ozs7SUFDaEMsNkNBQXdCOzs7OztJQUN4QixpREFNRTs7Ozs7SUFLRiw0Q0FBb0M7Ozs7O0lBQ3BDLDZDQUErQjs7SUFHN0IsMkNBQXVEOztJQUN2RCw0Q0FBcUQ7Ozs7O0lBQ3JELDRDQUEyQjs7Ozs7SUFDM0IsZ0RBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIGZvcndhcmRSZWYsIFJlbmRlcmVyLCBBdHRyaWJ1dGUsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMSURBVE9SUywgVmFsaWRhdG9yLCBBYnN0cmFjdENvbnRyb2wsIFZhbGlkYXRpb25FcnJvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBNZEVkaXRvck9wdGlvbiB9IGZyb20gJy4vbWQtZWRpdG9yLnR5cGVzJztcclxuXHJcbmRlY2xhcmUgbGV0IGFjZTogYW55O1xyXG5kZWNsYXJlIGxldCBtYXJrZWQ6IGFueTtcclxuZGVjbGFyZSBsZXQgaGxqczogYW55O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtZC1lZGl0b3InLFxyXG4gIHN0eWxlVXJsczogWycuL21kLWVkaXRvci5zY3NzJ10sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21kLWVkaXRvci5odG1sJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hcmtkb3duRWRpdG9yQ29tcG9uZW50KSxcclxuICAgICAgbXVsdGk6IHRydWVcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hcmtkb3duRWRpdG9yQ29tcG9uZW50KSxcclxuICAgICAgbXVsdGk6IHRydWVcclxuICAgIH1cclxuICBdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTWFya2Rvd25FZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcclxuXHJcbiAgQFZpZXdDaGlsZCgnYWNlRWRpdG9yJykgcHVibGljIGFjZUVkaXRvckNvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuICBASW5wdXQoKSBwdWJsaWMgaGlkZVRvb2xiYXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBwdWJsaWMgaGVpZ2h0OiBzdHJpbmcgPSBcIjMwMHB4XCI7XHJcbiAgQElucHV0KCkgcHVibGljIHByZVJlbmRlcjogRnVuY3Rpb247XHJcbiAgQElucHV0KCkgcHVibGljIHVwbG9hZDogRnVuY3Rpb247XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGdldCBtb2RlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fbW9kZSB8fCAnZWRpdG9yJztcclxuICB9XHJcbiAgcHVibGljIHNldCBtb2RlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICghdmFsdWUgfHwgKHZhbHVlLnRvTG93ZXJDYXNlKCkgIT09ICdlZGl0b3InICYmIHZhbHVlLnRvTG93ZXJDYXNlKCkgIT09ICdwcmV2aWV3JykpIHtcclxuICAgICAgdmFsdWUgPSAnZWRpdG9yJztcclxuICAgIH1cclxuICAgIHRoaXMuX21vZGUgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbW9kZTogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBnZXQgb3B0aW9ucygpOiBNZEVkaXRvck9wdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucyB8fCB7fTtcclxuICB9XHJcbiAgcHVibGljIHNldCBvcHRpb25zKHZhbHVlOiBNZEVkaXRvck9wdGlvbikge1xyXG4gICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24odGhpcy5fZGVmYXVsdE9wdGlvbiwge30sIHZhbHVlKTtcclxuICAgIHRoaXMuaGlkZUljb25zID0ge307XHJcbiAgICBpZiAodGhpcy5fb3B0aW9ucy5oaWRlSWNvbnMpIHtcclxuICAgICAgdGhpcy5fb3B0aW9ucy5oaWRlSWNvbnMuZm9yRWFjaCgodjogYW55KSA9PiB0aGlzLmhpZGVJY29uc1t2XSA9IHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIF9vcHRpb25zOiBhbnkgPSB7fTtcclxuXHJcbiAgcHVibGljIGhpZGVJY29uczogYW55ID0ge307XHJcbiAgcHVibGljIHNob3dQcmV2aWV3UGFuZWw6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyBpc0Z1bGxTY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgcHJldmlld0h0bWw6IGFueTtcclxuICBwdWJsaWMgZHJhZ292ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwdWJsaWMgaXNVcGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgcHVibGljIGdldCBtYXJrZG93blZhbHVlKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFya2Rvd25WYWx1ZSB8fCAnJztcclxuICB9XHJcbiAgcHVibGljIHNldCBtYXJrZG93blZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgIHRoaXMuX21hcmtkb3duVmFsdWUgPSB2YWx1ZTtcclxuICAgIHRoaXMuX29uQ2hhbmdlKHZhbHVlKTtcclxuXHJcbiAgICBpZiAodGhpcy5wcmVSZW5kZXIgJiYgdGhpcy5wcmVSZW5kZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICB2YWx1ZSA9IHRoaXMucHJlUmVuZGVyKHZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmICh0aGlzLl9yZW5kZXJNYXJrVGltZW91dCkgY2xlYXJUaW1lb3V0KHRoaXMuX3JlbmRlck1hcmtUaW1lb3V0KTtcclxuICAgICAgdGhpcy5fcmVuZGVyTWFya1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBsZXQgaHRtbCA9IG1hcmtlZCh2YWx1ZSB8fCAnJywgdGhpcy5fbWFya2VkT3B0KTtcclxuICAgICAgICB0aGlzLnByZXZpZXdIdG1sID0gdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGh0bWwpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIF9tYXJrZG93blZhbHVlOiBhbnk7XHJcblxyXG4gIHByaXZhdGUgX2VkaXRvcjogYW55O1xyXG4gIHByaXZhdGUgX2VkaXRvclJlc2l6ZVRpbWVyOiBhbnk7XHJcbiAgcHJpdmF0ZSBfcmVuZGVyTWFya1RpbWVvdXQ6IGFueTtcclxuICBwcml2YXRlIF9tYXJrZWRPcHQ6IGFueTtcclxuICBwcml2YXRlIF9kZWZhdWx0T3B0aW9uOiBNZEVkaXRvck9wdGlvbiA9IHtcclxuICAgIHNob3dCb3JkZXI6IHRydWUsXHJcbiAgICBoaWRlSWNvbnM6IFtdLFxyXG4gICAgc2Nyb2xsUGFzdEVuZDogMCxcclxuICAgIGVuYWJsZVByZXZpZXdDb250ZW50Q2xpY2s6IGZhbHNlLFxyXG4gICAgcmVzaXphYmxlOiBmYWxzZVxyXG4gIH07XHJcbiAgcHJpdmF0ZSBnZXQgX2hhc1VwbG9hZEZ1bmN0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMudXBsb2FkICYmIHRoaXMudXBsb2FkIGluc3RhbmNlb2YgRnVuY3Rpb247XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9vbkNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcclxuICBwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7IH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEF0dHJpYnV0ZSgncmVxdWlyZWQnKSBwdWJsaWMgcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgIEBBdHRyaWJ1dGUoJ21heGxlbmd0aCcpIHB1YmxpYyBtYXhsZW5ndGg6IG51bWJlciA9IC0xLFxyXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyLFxyXG4gICAgcHJpdmF0ZSBfZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGxldCBtYXJrZWRSZW5kZXIgPSBuZXcgbWFya2VkLlJlbmRlcmVyKCk7XHJcbiAgICBtYXJrZWRSZW5kZXIuY29kZSA9IChjb2RlOiBhbnksIGxhbmd1YWdlOiBhbnkpID0+IHtcclxuICAgICAgbGV0IHZhbGlkTGFuZyA9ICEhKGxhbmd1YWdlICYmIGhsanMuZ2V0TGFuZ3VhZ2UobGFuZ3VhZ2UpKTtcclxuICAgICAgbGV0IGhpZ2hsaWdodGVkID0gdmFsaWRMYW5nID8gaGxqcy5oaWdobGlnaHQobGFuZ3VhZ2UsIGNvZGUpLnZhbHVlIDogY29kZTtcclxuICAgICAgcmV0dXJuIGA8cHJlIHN0eWxlPVwicGFkZGluZzogMDsgYm9yZGVyLXJhZGl1czogMDtcIj48Y29kZSBjbGFzcz1cImhsanMgJHtsYW5ndWFnZX1cIj4ke2hpZ2hsaWdodGVkfTwvY29kZT48L3ByZT5gO1xyXG4gICAgfTtcclxuICAgIG1hcmtlZFJlbmRlci50YWJsZSA9IChoZWFkZXI6IHN0cmluZywgYm9keTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHJldHVybiBgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWRcIj5cXG48dGhlYWQ+XFxuJHtoZWFkZXJ9PC90aGVhZD5cXG48dGJvZHk+XFxuJHtib2R5fTwvdGJvZHk+XFxuPC90YWJsZT5cXG5gO1xyXG4gICAgfTtcclxuICAgIG1hcmtlZFJlbmRlci5saXN0aXRlbSA9ICh0ZXh0OiBhbnkpID0+IHtcclxuICAgICAgaWYgKC9eXFxzKlxcW1t4IF1cXF1cXHMqLy50ZXN0KHRleHQpKSB7XHJcbiAgICAgICAgdGV4dCA9IHRleHRcclxuICAgICAgICAgIC5yZXBsYWNlKC9eXFxzKlxcWyBcXF1cXHMqLywgJzxpIGNsYXNzPVwiZmEgZmEtc3F1YXJlLW9cIiBzdHlsZT1cIm1hcmdpbjogMCAwLjJlbSAwLjI1ZW0gLTEuNmVtO1wiPjwvaT4gJylcclxuICAgICAgICAgIC5yZXBsYWNlKC9eXFxzKlxcW3hcXF1cXHMqLywgJzxpIGNsYXNzPVwiZmEgZmEtY2hlY2stc3F1YXJlXCIgc3R5bGU9XCJtYXJnaW46IDAgMC4yZW0gMC4yNWVtIC0xLjZlbTtcIj48L2k+ICcpO1xyXG4gICAgICAgIHJldHVybiBgPGxpIHN0eWxlPVwibGlzdC1zdHlsZTogbm9uZTtcIj4ke3RleHR9PC9saT5gO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBgPGxpPiR7dGV4dH08L2xpPmA7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBsZXQgbWFya2VkanNPcHQgPSB7XHJcbiAgICAgIHJlbmRlcmVyOiBtYXJrZWRSZW5kZXIsXHJcbiAgICAgIGhpZ2hsaWdodDogKGNvZGU6IGFueSkgPT4gaGxqcy5oaWdobGlnaHRBdXRvKGNvZGUpLnZhbHVlXHJcbiAgICB9O1xyXG4gICAgdGhpcy5fbWFya2VkT3B0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRpb25zLm1hcmtlZGpzT3B0LCBtYXJrZWRqc09wdCk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBsZXQgZWRpdG9yRWxlbWVudCA9IHRoaXMuYWNlRWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB0aGlzLl9lZGl0b3IgPSBhY2UuZWRpdChlZGl0b3JFbGVtZW50KTtcclxuICAgIHRoaXMuX2VkaXRvci4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eTtcclxuICAgIHRoaXMuX2VkaXRvci5nZXRTZXNzaW9uKCkuc2V0VXNlV3JhcE1vZGUodHJ1ZSk7XHJcbiAgICB0aGlzLl9lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUoXCJhY2UvbW9kZS9tYXJrZG93blwiKTtcclxuICAgIHRoaXMuX2VkaXRvci5zZXRWYWx1ZSh0aGlzLm1hcmtkb3duVmFsdWUgfHwgJycsIDEpO1xyXG4gICAgdGhpcy5fZWRpdG9yLnNldE9wdGlvbignc2Nyb2xsUGFzdEVuZCcsIHRoaXMuX29wdGlvbnMuc2Nyb2xsUGFzdEVuZCB8fCAwKTtcclxuXHJcbiAgICB0aGlzLl9lZGl0b3Iub24oXCJjaGFuZ2VcIiwgKGU6IGFueSkgPT4ge1xyXG4gICAgICBsZXQgdmFsID0gdGhpcy5fZWRpdG9yLmdldFZhbHVlKCk7XHJcbiAgICAgIHRoaXMubWFya2Rvd25WYWx1ZSA9IHZhbDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9lZGl0b3IgJiYgdGhpcy5fZWRpdG9yLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSB8IEFycmF5PGFueT4pOiB2b2lkIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLm1hcmtkb3duVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5fZWRpdG9yKSB7XHJcbiAgICAgICAgdGhpcy5fZWRpdG9yLnNldFZhbHVlKHZhbHVlIHx8ICcnLCAxKTtcclxuICAgICAgfVxyXG4gICAgfSwgMSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB7fSk6IHZvaWQge1xyXG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xyXG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHtcclxuICAgIGxldCByZXN1bHQ6IGFueSA9IG51bGw7XHJcbiAgICBpZiAodGhpcy5yZXF1aXJlZCAmJiB0aGlzLm1hcmtkb3duVmFsdWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJlc3VsdCA9IHsgcmVxdWlyZWQ6IHRydWUgfTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm1heGxlbmd0aCA+IDAgJiYgdGhpcy5tYXJrZG93blZhbHVlLmxlbmd0aCA+IHRoaXMubWF4bGVuZ3RoKSB7XHJcbiAgICAgIHJlc3VsdCA9IHsgbWF4bGVuZ3RoOiB0cnVlIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgaW5zZXJ0Q29udGVudCh0eXBlOiBzdHJpbmcsIGN1c3RvbUNvbnRlbnQ/OiBzdHJpbmcpIHtcclxuICAgIGlmICghdGhpcy5fZWRpdG9yKSByZXR1cm47XHJcbiAgICBsZXQgc2VsZWN0ZWRUZXh0ID0gdGhpcy5fZWRpdG9yLmdldFNlbGVjdGVkVGV4dCgpO1xyXG4gICAgbGV0IGlzU2VsZWN0ZWQgPSAhIXNlbGVjdGVkVGV4dDtcclxuICAgIGxldCBzdGFydFNpemUgPSAyO1xyXG4gICAgbGV0IGluaXRUZXh0OiBzdHJpbmcgPSAnJztcclxuICAgIGxldCByYW5nZSA9IHRoaXMuX2VkaXRvci5zZWxlY3Rpb24uZ2V0UmFuZ2UoKTtcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICdCb2xkJzpcclxuICAgICAgICBpbml0VGV4dCA9ICdCb2xkIFRleHQnO1xyXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9IGAqKiR7c2VsZWN0ZWRUZXh0IHx8IGluaXRUZXh0fSoqYDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnSXRhbGljJzpcclxuICAgICAgICBpbml0VGV4dCA9ICdJdGFsaWMgVGV4dCc7XHJcbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gYCoke3NlbGVjdGVkVGV4dCB8fCBpbml0VGV4dH0qYDtcclxuICAgICAgICBzdGFydFNpemUgPSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdIZWFkaW5nJzpcclxuICAgICAgICBpbml0VGV4dCA9ICdIZWFkaW5nJztcclxuICAgICAgICBzZWxlY3RlZFRleHQgPSBgIyAke3NlbGVjdGVkVGV4dCB8fCBpbml0VGV4dH1gO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdSZWZyZW5jZSc6XHJcbiAgICAgICAgaW5pdFRleHQgPSAnUmVmcmVuY2UnO1xyXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9IGA+ICR7c2VsZWN0ZWRUZXh0IHx8IGluaXRUZXh0fWA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ0xpbmsnOlxyXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9IGBbXShodHRwOi8vKWA7XHJcbiAgICAgICAgc3RhcnRTaXplID0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnSW1hZ2UnOlxyXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9IGAhW10oaHR0cDovLylgO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdVbCc6XHJcbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gYC0gJHtzZWxlY3RlZFRleHQgfHwgaW5pdFRleHR9YFxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdPbCc6XHJcbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gYDEuICR7c2VsZWN0ZWRUZXh0IHx8IGluaXRUZXh0fWBcclxuICAgICAgICBzdGFydFNpemUgPSAzO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdDb2RlJzpcclxuICAgICAgICBpbml0VGV4dCA9ICdTb3VyY2UgQ29kZSc7XHJcbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gXCJgYGBsYW5ndWFnZVxcclxcblwiICsgKHNlbGVjdGVkVGV4dCB8fCBpbml0VGV4dCkgKyBcIlxcclxcbmBgYFwiO1xyXG4gICAgICAgIHN0YXJ0U2l6ZSA9IDM7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ0N1c3RvbSc6XHJcbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gY3VzdG9tQ29udGVudDtcclxuICAgICAgICBzdGFydFNpemUgPSAwO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fZWRpdG9yLnNlc3Npb24ucmVwbGFjZShyYW5nZSwgc2VsZWN0ZWRUZXh0KTtcclxuICAgIGlmICghaXNTZWxlY3RlZCkge1xyXG4gICAgICByYW5nZS5zdGFydC5jb2x1bW4gKz0gc3RhcnRTaXplO1xyXG4gICAgICByYW5nZS5lbmQuY29sdW1uID0gcmFuZ2Uuc3RhcnQuY29sdW1uICsgaW5pdFRleHQubGVuZ3RoO1xyXG4gICAgICB0aGlzLl9lZGl0b3Iuc2VsZWN0aW9uLnNldFJhbmdlKHJhbmdlKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2VkaXRvci5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlUHJldmlldygpIHtcclxuICAgIHRoaXMuc2hvd1ByZXZpZXdQYW5lbCA9ICF0aGlzLnNob3dQcmV2aWV3UGFuZWw7XHJcbiAgICB0aGlzLmVkaXRvclJlc2l6ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJldmlld1BhbmVsQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmVuYWJsZVByZXZpZXdDb250ZW50Q2xpY2sgIT09IHRydWUpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdWxsU2NyZWVuKCkge1xyXG4gICAgdGhpcy5pc0Z1bGxTY3JlZW4gPSAhdGhpcy5pc0Z1bGxTY3JlZW47XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZG9jdW1lbnQuYm9keSwgJ292ZXJmbG93WScsIHRoaXMuaXNGdWxsU2NyZWVuID8gJ2hpZGRlbicgOiAnYXV0bycpO1xyXG4gICAgdGhpcy5lZGl0b3JSZXNpemUoKTtcclxuICB9XHJcblxyXG4gIG1kRWRpdG9yUmVzaXplKHNpemU6IGFueSkge1xyXG4gICAgdGhpcy5lZGl0b3JSZXNpemUoKTtcclxuICB9XHJcblxyXG4gIGVkaXRvclJlc2l6ZSh0aW1lT3V0OiBudW1iZXIgPSAxMDApIHtcclxuICAgIGlmICghdGhpcy5fZWRpdG9yKSByZXR1cm5cclxuICAgIGlmICh0aGlzLl9lZGl0b3JSZXNpemVUaW1lcikgY2xlYXJUaW1lb3V0KHRoaXMuX2VkaXRvclJlc2l6ZVRpbWVyKTtcclxuICAgIHRoaXMuX2VkaXRvclJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2VkaXRvci5yZXNpemUoKTtcclxuICAgICAgdGhpcy5fZWRpdG9yLmZvY3VzKCk7XHJcbiAgICB9LCB0aW1lT3V0KTtcclxuICB9XHJcblxyXG4gIG9uRHJhZ292ZXIoZXZ0OiBEcmFnRXZlbnQpIHtcclxuICAgIGV2dC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKCF0aGlzLl9oYXNVcGxvYWRGdW5jdGlvbikgcmV0dXJuO1xyXG4gICAgdGhpcy5kcmFnb3ZlciA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBvbkRyb3AoZXZ0OiBEcmFnRXZlbnQpIHtcclxuICAgIGV2dC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKCF0aGlzLl9oYXNVcGxvYWRGdW5jdGlvbiB8fCB0aGlzLmlzVXBsb2FkaW5nKSByZXR1cm47XHJcblxyXG4gICAgaWYgKCFldnQuZGF0YVRyYW5zZmVyLmZpbGVzIHx8IGV2dC5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuZHJhZ292ZXIgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaXNVcGxvYWRpbmcgPSB0cnVlO1xyXG4gICAgUHJvbWlzZS5yZXNvbHZlKClcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVwbG9hZChldnQuZGF0YVRyYW5zZmVyLmZpbGVzKTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgICAgIGxldCBtc2cgPSBbXTtcclxuICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcE1zZyA9IGBbJHtpdGVtLm5hbWV9XSgke2l0ZW0udXJsfSlgO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5pc0ltZykge1xyXG4gICAgICAgICAgICAgIHRlbXBNc2cgPSBgISR7dGVtcE1zZ31gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1zZy5wdXNoKHRlbXBNc2cpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5pbnNlcnRDb250ZW50KCdDdXN0b20nLCBtc2cuam9pbignXFxyXFxuJykpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0ludmFsaWQgdXBsb2FkIHJlc3VsdC4gUGxlYXNlIHVzaW5nIGZvbGxvdyB0aGlzIHR5cGUgYFVwbG9hZFJlc3VsdGAuJylcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc1VwbG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZHJhZ292ZXIgPSBmYWxzZTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgIHRoaXMuaXNVcGxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRyYWdvdmVyID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25EcmFnbGVhdmUoZXZ0OiBEcmFnRXZlbnQpIHtcclxuICAgIGV2dC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKCF0aGlzLl9oYXNVcGxvYWRGdW5jdGlvbikgcmV0dXJuO1xyXG4gICAgdGhpcy5kcmFnb3ZlciA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=