/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, forwardRef, Renderer, Attribute, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
export class MarkdownEditorComponent {
    /**
     * @param {?=} required
     * @param {?=} maxlength
     * @param {?=} _renderer
     * @param {?=} _domSanitizer
     */
    constructor(required = false, maxlength = -1, _renderer, _domSanitizer) {
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
        this._onChange = (_) => { };
        this._onTouched = () => { };
    }
    /**
     * @return {?}
     */
    get mode() {
        return this._mode || 'editor';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mode(value) {
        if (!value || (value.toLowerCase() !== 'editor' && value.toLowerCase() !== 'preview')) {
            value = 'editor';
        }
        this._mode = value;
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options || {};
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set options(value) {
        this._options = Object.assign(this._defaultOption, {}, value);
        this.hideIcons = {};
        if (this._options.hideIcons) {
            this._options.hideIcons.forEach((v) => this.hideIcons[v] = true);
        }
    }
    /**
     * @return {?}
     */
    get markdownValue() {
        return this._markdownValue || '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set markdownValue(value) {
        this._markdownValue = value;
        this._onChange(value);
        if (this.preRender && this.preRender instanceof Function) {
            value = this.preRender(value);
        }
        if (value !== null && value !== undefined) {
            if (this._renderMarkTimeout)
                clearTimeout(this._renderMarkTimeout);
            this._renderMarkTimeout = setTimeout(() => {
                /** @type {?} */
                let html = marked(value || '', this._markedOpt);
                this.previewHtml = this._domSanitizer.bypassSecurityTrustHtml(html);
            }, 100);
        }
    }
    /**
     * @private
     * @return {?}
     */
    get _hasUploadFunction() {
        return this.upload && this.upload instanceof Function;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        let markedRender = new marked.Renderer();
        markedRender.code = (code, language) => {
            /** @type {?} */
            let validLang = !!(language && hljs.getLanguage(language));
            /** @type {?} */
            let highlighted = validLang ? hljs.highlight(language, code).value : code;
            return `<pre style="padding: 0; border-radius: 0;"><code class="hljs ${language}">${highlighted}</code></pre>`;
        };
        markedRender.table = (header, body) => {
            return `<table class="table table-bordered">\n<thead>\n${header}</thead>\n<tbody>\n${body}</tbody>\n</table>\n`;
        };
        markedRender.listitem = (text) => {
            if (/^\s*\[[x ]\]\s*/.test(text)) {
                text = text
                    .replace(/^\s*\[ \]\s*/, '<i class="fa fa-square-o" style="margin: 0 0.2em 0.25em -1.6em;"></i> ')
                    .replace(/^\s*\[x\]\s*/, '<i class="fa fa-check-square" style="margin: 0 0.2em 0.25em -1.6em;"></i> ');
                return `<li style="list-style: none;">${text}</li>`;
            }
            else {
                return `<li>${text}</li>`;
            }
        };
        /** @type {?} */
        let markedjsOpt = {
            renderer: markedRender,
            highlight: (code) => hljs.highlightAuto(code).value
        };
        this._markedOpt = Object.assign({}, this.options.markedjsOpt, markedjsOpt);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        let editorElement = this.aceEditorContainer.nativeElement;
        this._editor = ace.edit(editorElement);
        this._editor.$blockScrolling = Infinity;
        this._editor.getSession().setUseWrapMode(true);
        this._editor.getSession().setMode("ace/mode/markdown");
        this._editor.setValue(this.markdownValue || '', 1);
        this._editor.setOption('scrollPastEnd', this._options.scrollPastEnd || 0);
        this._editor.on("change", (e) => {
            /** @type {?} */
            let val = this._editor.getValue();
            this.markdownValue = val;
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._editor && this._editor.destroy();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        setTimeout(() => {
            this.markdownValue = value;
            if (typeof value !== 'undefined' && this._editor) {
                this._editor.setValue(value || '', 1);
            }
        }, 1);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        /** @type {?} */
        let result = null;
        if (this.required && this.markdownValue.length === 0) {
            result = { required: true };
        }
        if (this.maxlength > 0 && this.markdownValue.length > this.maxlength) {
            result = { maxlength: true };
        }
        return result;
    }
    /**
     * @param {?} type
     * @param {?=} customContent
     * @return {?}
     */
    insertContent(type, customContent) {
        if (!this._editor)
            return;
        /** @type {?} */
        let selectedText = this._editor.getSelectedText();
        /** @type {?} */
        let isSelected = !!selectedText;
        /** @type {?} */
        let startSize = 2;
        /** @type {?} */
        let initText = '';
        /** @type {?} */
        let range = this._editor.selection.getRange();
        switch (type) {
            case 'Bold':
                initText = 'Bold Text';
                selectedText = `**${selectedText || initText}**`;
                break;
            case 'Italic':
                initText = 'Italic Text';
                selectedText = `*${selectedText || initText}*`;
                startSize = 1;
                break;
            case 'Heading':
                initText = 'Heading';
                selectedText = `# ${selectedText || initText}`;
                break;
            case 'Refrence':
                initText = 'Refrence';
                selectedText = `> ${selectedText || initText}`;
                break;
            case 'Link':
                selectedText = `[](http://)`;
                startSize = 1;
                break;
            case 'Image':
                selectedText = `![](http://)`;
                break;
            case 'Ul':
                selectedText = `- ${selectedText || initText}`;
                break;
            case 'Ol':
                selectedText = `1. ${selectedText || initText}`;
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
    }
    /**
     * @return {?}
     */
    togglePreview() {
        this.showPreviewPanel = !this.showPreviewPanel;
        this.editorResize();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    previewPanelClick(event) {
        if (this.options.enablePreviewContentClick !== true) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
    /**
     * @return {?}
     */
    fullScreen() {
        this.isFullScreen = !this.isFullScreen;
        this._renderer.setElementStyle(document.body, 'overflowY', this.isFullScreen ? 'hidden' : 'auto');
        this.editorResize();
    }
    /**
     * @param {?} size
     * @return {?}
     */
    mdEditorResize(size) {
        this.editorResize();
    }
    /**
     * @param {?=} timeOut
     * @return {?}
     */
    editorResize(timeOut = 100) {
        if (!this._editor)
            return;
        if (this._editorResizeTimer)
            clearTimeout(this._editorResizeTimer);
        this._editorResizeTimer = setTimeout(() => {
            this._editor.resize();
            this._editor.focus();
        }, timeOut);
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragover(evt) {
        evt.stopImmediatePropagation();
        evt.preventDefault();
        if (!this._hasUploadFunction)
            return;
        this.dragover = true;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDrop(evt) {
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
            .then(() => {
            return this.upload(evt.dataTransfer.files);
        })
            .then(data => {
            if (Array.isArray(data)) {
                /** @type {?} */
                let msg = [];
                for (let item of data) {
                    /** @type {?} */
                    let tempMsg = `[${item.name}](${item.url})`;
                    if (item.isImg) {
                        tempMsg = `!${tempMsg}`;
                    }
                    msg.push(tempMsg);
                }
                this.insertContent('Custom', msg.join('\r\n'));
            }
            else {
                console.warn('Invalid upload result. Please using follow this type `UploadResult`.');
            }
            this.isUploading = false;
            this.dragover = false;
        })
            .catch(err => {
            console.error(err);
            this.isUploading = false;
            this.dragover = false;
        });
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragleave(evt) {
        evt.stopImmediatePropagation();
        evt.preventDefault();
        if (!this._hasUploadFunction)
            return;
        this.dragover = false;
    }
}
MarkdownEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'md-editor',
                template: "<div class=\"md-editor-container\" [class.fullscreen]=\"isFullScreen\" [class.md-editor-resizable]=\"options?.resizable\"\r\n  [style.height]=\"height\">\r\n  <div class=\"md-layout\">\r\n    <div class=\"tool-bar\" *ngIf=\"!hideToolbar && mode != 'preview'\">\r\n      <div class=\"btn-group\">\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Bold\" (click)=\"insertContent('Bold')\"\r\n          *ngIf=\"!hideIcons.Bold\">\r\n          <i class=\"fa fa-bold\"></i>\r\n        </button>\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Italic\" (click)=\"insertContent('Italic')\"\r\n          *ngIf=\"!hideIcons.Italic\">\r\n          <i class=\"fa fa-italic\"></i>\r\n        </button>\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Heading\" (click)=\"insertContent('Heading')\"\r\n          *ngIf=\"!hideIcons.Heading\">\r\n          <i class=\"fa fa-header\"></i>\r\n        </button>\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Refrence\" (click)=\"insertContent('Refrence')\"\r\n          *ngIf=\"!hideIcons.Refrence\">\r\n          <i class=\"fa fa-quote-left\"></i>\r\n        </button>\r\n      </div>\r\n      <div class=\"btn-group\">\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Link\" (click)=\"insertContent('Link')\"\r\n          *ngIf=\"!hideIcons.Link\">\r\n          <i class=\"fa fa-link\"></i>\r\n        </button>\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Image\" (click)=\"insertContent('Image')\"\r\n          *ngIf=\"!hideIcons.Image\">\r\n          <i class=\"fa fa-image\"></i>\r\n        </button>\r\n      </div>\r\n      <div class=\"btn-group\">\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Unordered List\" (click)=\"insertContent('Ul')\"\r\n          *ngIf=\"!hideIcons.Ul\">\r\n          <i class=\"fa fa-list-ul\"></i>\r\n        </button>\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Ordered List\" (click)=\"insertContent('Ol')\"\r\n          *ngIf=\"!hideIcons.Ol\">\r\n          <i class=\"fa fa-list-ol\"></i>\r\n        </button>\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" title=\"Code Block\" (click)=\"insertContent('Code')\"\r\n          *ngIf=\"!hideIcons.Code\">\r\n          <i class=\"fa fa-file-code-o\"></i>\r\n        </button>\r\n      </div>\r\n      <div class=\"btn-group\">\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\"\r\n          [attr.title]=\"showPreviewPanel ? 'Hide Preview' : 'Show Preview'\" (click)=\"togglePreview()\"\r\n          *ngIf=\"!hideIcons.TogglePreview\">\r\n          <i class=\"fa\" [class.fa-eye]=\"!showPreviewPanel\" [class.fa-eye-slash]=\"showPreviewPanel\"></i>\r\n        </button>\r\n      </div>\r\n      <div class=\"btn-group pull-right hide-split\">\r\n        <button class=\"btn btn-sm btn-default\" type=\"button\" [class.active]=\"isFullScreen\" (click)=\"fullScreen()\"\r\n          *ngIf=\"!hideIcons.FullScreen\">\r\n          <i class=\"fa fa-arrows-alt\"></i>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <div class=\"editor-container\">\r\n      <div [class.dragover]=\"dragover\" [style.display]=\"mode == 'preview' ? 'none' : null\"\r\n        (dragover)=\"onDragover($event)\">\r\n        <div class=\"drag-container\">\r\n          <div class=\"upload-loading\">\r\n            <i class=\"fa fa-upload\" *ngIf=\"!isUploading\"></i>\r\n            <i class=\"fa fa-spinner fa-pulse fa-fw\" *ngIf=\"isUploading\"></i>\r\n            <div class=\"text\">{{ isUploading ? 'Uploading' : 'Drag it here' }}</div>\r\n          </div>\r\n        </div>\r\n        <div class=\"drag-container drag-container-mask\" (drop)=\"onDrop($event)\" (dragleave)=\"onDragleave($event)\"></div>\r\n        <div class=\"editor-panel\">\r\n          <div class=\"ace-editor\" #aceEditor></div>\r\n        </div>\r\n      </div>\r\n      <div [style.display]=\"showPreviewPanel ? 'block' : 'none'\" (click)=\"previewPanelClick($event)\">\r\n        <div class=\"preview-panel\" [innerHtml]=\"previewHtml\"></div>\r\n      </div>\r\n    </div>\r\n    <div class=\"md-footer\" *ngIf=\"maxlength > 0 && mode != 'preview'\">\r\n      <div class=\"text-right length-view\">\r\n        {{ markdownValue?.length }} / {{ maxlength }}\r\n      </div>\r\n      <div class=\"resize-btn\"></div>\r\n    </div>\r\n  </div>\r\n  <md-editor-resize-sensor *ngIf=\"options?.resizable\" (resize)=\"mdEditorResize($event)\"></md-editor-resize-sensor>\r\n</div>\r\n",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => MarkdownEditorComponent),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef(() => MarkdownEditorComponent),
                        multi: true
                    }
                ],
                styles: [".md-editor-container{position:relative;height:100%;margin-bottom:15px;border:1px solid rgba(0,0,0,.1)}.md-editor-container.fullscreen{margin:0;position:fixed;border:0;top:0;left:0;width:100%!important;height:100%!important;z-index:99999999}.md-editor-container.md-editor-resizable:not(.fullscreen){resize:both;overflow:auto;display:inline-block;width:100%}.md-editor-container.md-editor-resizable:not(.fullscreen) .md-footer{z-index:-1}.md-editor-container .md-layout{height:100%;display:flex;flex-direction:column}.md-editor-container .md-layout .tool-bar{background-color:#f5f5f5;border-bottom:1px solid rgba(0,0,0,.1)}.md-editor-container .md-layout .tool-bar .btn-group{padding:6px}.md-editor-container .md-layout .tool-bar .btn-group:first-child>.btn:first-child::before{display:none}.md-editor-container .md-layout .tool-bar .btn-group>.btn:first-child::before{content:' ';background-color:#a9a9a9;width:1px;height:24px;left:-9px;top:2px;position:absolute}.md-editor-container .md-layout .tool-bar .btn-group.hide-split>.btn:first-child::before{display:none}.md-editor-container .md-layout .tool-bar .btn{margin-bottom:0}.md-editor-container .md-layout .editor-container{flex:1;display:flex}.md-editor-container .md-layout .editor-container>div{flex:1}.md-editor-container .md-layout .editor-container>div .drag-container{display:none}.md-editor-container .md-layout .editor-container>div.dragover{position:relative}.md-editor-container .md-layout .editor-container>div.dragover .drag-container{display:block;position:absolute;left:0;top:0;right:0;bottom:0;z-index:10;background-color:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;font-size:50px;color:#fff}.md-editor-container .md-layout .editor-container>div.dragover .drag-container.drag-container-mask{background-color:transparent;z-index:11}.md-editor-container .md-layout .editor-container>div.dragover .drag-container .upload-loading{display:flex;flex-direction:column;align-items:center}.md-editor-container .md-layout .editor-container>div.dragover .drag-container .upload-loading .text{font-size:20px;margin-top:10px}.md-editor-container .md-layout .editor-container .editor-panel{height:100%}.md-editor-container .md-layout .editor-container .editor-panel .ace-editor{height:100%;min-height:100%}.md-editor-container .md-layout .preview-panel{height:100%;border-left:1px solid rgba(0,0,0,.1);background-color:#fff;padding:10px;overflow-y:auto}.md-editor-container .md-layout .md-footer{background-color:#f0f0f0;border-top:1px solid rgba(0,0,0,.1);display:flex;align-items:center}.md-editor-container .md-layout .md-footer .length-view{flex:1;padding:4px 2px 0;font-size:12px;line-height:16px}.md-editor-container .md-layout .md-footer .resize-btn{width:17px}"]
            }] }
];
/** @nocollapse */
MarkdownEditorComponent.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Attribute, args: ['required',] }] },
    { type: Number, decorators: [{ type: Attribute, args: ['maxlength',] }] },
    { type: Renderer },
    { type: DomSanitizer }
];
MarkdownEditorComponent.propDecorators = {
    aceEditorContainer: [{ type: ViewChild, args: ['aceEditor',] }],
    hideToolbar: [{ type: Input }],
    height: [{ type: Input }],
    preRender: [{ type: Input }],
    upload: [{ type: Input }],
    mode: [{ type: Input }],
    options: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWQtZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXJrZG93bi1lZGl0b3IvIiwic291cmNlcyI6WyJsaWIvbWQtZWRpdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLGFBQWEsRUFBZ0QsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0SSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUF5QnpELE1BQU0sT0FBTyx1QkFBdUI7Ozs7Ozs7SUE4RWxDLFlBQ2dDLFdBQW9CLEtBQUssRUFDeEIsWUFBb0IsQ0FBQyxDQUFDLEVBQzdDLFNBQW1CLEVBQ25CLGFBQTJCO1FBSEwsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQUM3QyxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBL0VyQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixXQUFNLEdBQVcsT0FBTyxDQUFDO1FBMkJqQyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBRXBCLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFDcEIscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBQ2pDLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTlCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUEwQjVCLG1CQUFjLEdBQW1CO1lBQ3ZDLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsYUFBYSxFQUFFLENBQUM7WUFDaEIseUJBQXlCLEVBQUUsS0FBSztZQUNoQyxTQUFTLEVBQUUsS0FBSztT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UyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQUM7d0JBQ3RELEtBQUssRUFBRSxJQUFJO3FCQUNaO29CQUNEO3dCQUNFLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDO3dCQUN0RCxLQUFLLEVBQUUsSUFBSTtxQkFDWjtpQkFDRjs7YUFDRjs7OzswQ0FpRkksU0FBUyxTQUFDLFVBQVU7eUNBQ3BCLFNBQVMsU0FBQyxXQUFXO1lBM0dpQixRQUFRO1lBRTFDLFlBQVk7OztpQ0EyQmxCLFNBQVMsU0FBQyxXQUFXOzBCQUNyQixLQUFLO3FCQUNMLEtBQUs7d0JBQ0wsS0FBSztxQkFDTCxLQUFLO21CQUVMLEtBQUs7c0JBWUwsS0FBSzs7OztJQWxCTixxREFBOEQ7O0lBQzlELDhDQUE2Qzs7SUFDN0MseUNBQXlDOztJQUN6Qyw0Q0FBb0M7O0lBQ3BDLHlDQUFpQzs7Ozs7SUFZakMsd0NBQXNCOzs7OztJQWF0QiwyQ0FBMkI7O0lBRTNCLDRDQUEyQjs7SUFDM0IsbURBQXdDOztJQUN4QywrQ0FBcUM7O0lBQ3JDLDhDQUF3Qjs7SUFDeEIsMkNBQWlDOztJQUNqQyw4Q0FBb0M7Ozs7O0lBb0JwQyxpREFBNEI7Ozs7O0lBRTVCLDBDQUFxQjs7Ozs7SUFDckIscURBQWdDOzs7OztJQUNoQyxxREFBZ0M7Ozs7O0lBQ2hDLDZDQUF3Qjs7Ozs7SUFDeEIsaURBTUU7Ozs7O0lBS0YsNENBQW9DOzs7OztJQUNwQyw2Q0FBK0I7O0lBRzdCLDJDQUF1RDs7SUFDdkQsNENBQXFEOzs7OztJQUNyRCw0Q0FBMkI7Ozs7O0lBQzNCLGdEQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBmb3J3YXJkUmVmLCBSZW5kZXJlciwgQXR0cmlidXRlLCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTElEQVRPUlMsIFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBWYWxpZGF0aW9uRXJyb3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgTWRFZGl0b3JPcHRpb24gfSBmcm9tICcuL21kLWVkaXRvci50eXBlcyc7XHJcblxyXG5kZWNsYXJlIGxldCBhY2U6IGFueTtcclxuZGVjbGFyZSBsZXQgbWFya2VkOiBhbnk7XHJcbmRlY2xhcmUgbGV0IGhsanM6IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWQtZWRpdG9yJyxcclxuICBzdHlsZVVybHM6IFsnLi9tZC1lZGl0b3Iuc2NzcyddLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tZC1lZGl0b3IuaHRtbCcsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXJrZG93bkVkaXRvckNvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXJrZG93bkVkaXRvckNvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hcmtkb3duRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2FjZUVkaXRvcicpIHB1YmxpYyBhY2VFZGl0b3JDb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgQElucHV0KCkgcHVibGljIGhpZGVUb29sYmFyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgcHVibGljIGhlaWdodDogc3RyaW5nID0gXCIzMDBweFwiO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBwcmVSZW5kZXI6IEZ1bmN0aW9uO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyB1cGxvYWQ6IEZ1bmN0aW9uO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBnZXQgbW9kZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX21vZGUgfHwgJ2VkaXRvcic7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgbW9kZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXZhbHVlIHx8ICh2YWx1ZS50b0xvd2VyQ2FzZSgpICE9PSAnZWRpdG9yJyAmJiB2YWx1ZS50b0xvd2VyQ2FzZSgpICE9PSAncHJldmlldycpKSB7XHJcbiAgICAgIHZhbHVlID0gJ2VkaXRvcic7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9tb2RlID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21vZGU6IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgZ2V0IG9wdGlvbnMoKTogTWRFZGl0b3JPcHRpb24ge1xyXG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnMgfHwge307XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgb3B0aW9ucyh2YWx1ZTogTWRFZGl0b3JPcHRpb24pIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHRoaXMuX2RlZmF1bHRPcHRpb24sIHt9LCB2YWx1ZSk7XHJcbiAgICB0aGlzLmhpZGVJY29ucyA9IHt9O1xyXG4gICAgaWYgKHRoaXMuX29wdGlvbnMuaGlkZUljb25zKSB7XHJcbiAgICAgIHRoaXMuX29wdGlvbnMuaGlkZUljb25zLmZvckVhY2goKHY6IGFueSkgPT4gdGhpcy5oaWRlSWNvbnNbdl0gPSB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfb3B0aW9uczogYW55ID0ge307XHJcblxyXG4gIHB1YmxpYyBoaWRlSWNvbnM6IGFueSA9IHt9O1xyXG4gIHB1YmxpYyBzaG93UHJldmlld1BhbmVsOiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgaXNGdWxsU2NyZWVuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIHByZXZpZXdIdG1sOiBhbnk7XHJcbiAgcHVibGljIGRyYWdvdmVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGlzVXBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyBnZXQgbWFya2Rvd25WYWx1ZSgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcmtkb3duVmFsdWUgfHwgJyc7XHJcbiAgfVxyXG4gIHB1YmxpYyBzZXQgbWFya2Rvd25WYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICB0aGlzLl9tYXJrZG93blZhbHVlID0gdmFsdWU7XHJcbiAgICB0aGlzLl9vbkNoYW5nZSh2YWx1ZSk7XHJcblxyXG4gICAgaWYgKHRoaXMucHJlUmVuZGVyICYmIHRoaXMucHJlUmVuZGVyIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgdmFsdWUgPSB0aGlzLnByZVJlbmRlcih2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAodGhpcy5fcmVuZGVyTWFya1RpbWVvdXQpIGNsZWFyVGltZW91dCh0aGlzLl9yZW5kZXJNYXJrVGltZW91dCk7XHJcbiAgICAgIHRoaXMuX3JlbmRlck1hcmtUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGh0bWwgPSBtYXJrZWQodmFsdWUgfHwgJycsIHRoaXMuX21hcmtlZE9wdCk7XHJcbiAgICAgICAgdGhpcy5wcmV2aWV3SHRtbCA9IHRoaXMuX2RvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChodG1sKTtcclxuICAgICAgfSwgMTAwKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfbWFya2Rvd25WYWx1ZTogYW55O1xyXG5cclxuICBwcml2YXRlIF9lZGl0b3I6IGFueTtcclxuICBwcml2YXRlIF9lZGl0b3JSZXNpemVUaW1lcjogYW55O1xyXG4gIHByaXZhdGUgX3JlbmRlck1hcmtUaW1lb3V0OiBhbnk7XHJcbiAgcHJpdmF0ZSBfbWFya2VkT3B0OiBhbnk7XHJcbiAgcHJpdmF0ZSBfZGVmYXVsdE9wdGlvbjogTWRFZGl0b3JPcHRpb24gPSB7XHJcbiAgICBzaG93Qm9yZGVyOiB0cnVlLFxyXG4gICAgaGlkZUljb25zOiBbXSxcclxuICAgIHNjcm9sbFBhc3RFbmQ6IDAsXHJcbiAgICBlbmFibGVQcmV2aWV3Q29udGVudENsaWNrOiBmYWxzZSxcclxuICAgIHJlc2l6YWJsZTogZmFsc2VcclxuICB9O1xyXG4gIHByaXZhdGUgZ2V0IF9oYXNVcGxvYWRGdW5jdGlvbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnVwbG9hZCAmJiB0aGlzLnVwbG9hZCBpbnN0YW5jZW9mIEZ1bmN0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XHJcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkID0gKCkgPT4geyB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBBdHRyaWJ1dGUoJ3JlcXVpcmVkJykgcHVibGljIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICBAQXR0cmlidXRlKCdtYXhsZW5ndGgnKSBwdWJsaWMgbWF4bGVuZ3RoOiBudW1iZXIgPSAtMSxcclxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcixcclxuICAgIHByaXZhdGUgX2RvbVNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBsZXQgbWFya2VkUmVuZGVyID0gbmV3IG1hcmtlZC5SZW5kZXJlcigpO1xyXG4gICAgbWFya2VkUmVuZGVyLmNvZGUgPSAoY29kZTogYW55LCBsYW5ndWFnZTogYW55KSA9PiB7XHJcbiAgICAgIGxldCB2YWxpZExhbmcgPSAhIShsYW5ndWFnZSAmJiBobGpzLmdldExhbmd1YWdlKGxhbmd1YWdlKSk7XHJcbiAgICAgIGxldCBoaWdobGlnaHRlZCA9IHZhbGlkTGFuZyA/IGhsanMuaGlnaGxpZ2h0KGxhbmd1YWdlLCBjb2RlKS52YWx1ZSA6IGNvZGU7XHJcbiAgICAgIHJldHVybiBgPHByZSBzdHlsZT1cInBhZGRpbmc6IDA7IGJvcmRlci1yYWRpdXM6IDA7XCI+PGNvZGUgY2xhc3M9XCJobGpzICR7bGFuZ3VhZ2V9XCI+JHtoaWdobGlnaHRlZH08L2NvZGU+PC9wcmU+YDtcclxuICAgIH07XHJcbiAgICBtYXJrZWRSZW5kZXIudGFibGUgPSAoaGVhZGVyOiBzdHJpbmcsIGJvZHk6IHN0cmluZykgPT4ge1xyXG4gICAgICByZXR1cm4gYDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkXCI+XFxuPHRoZWFkPlxcbiR7aGVhZGVyfTwvdGhlYWQ+XFxuPHRib2R5PlxcbiR7Ym9keX08L3Rib2R5PlxcbjwvdGFibGU+XFxuYDtcclxuICAgIH07XHJcbiAgICBtYXJrZWRSZW5kZXIubGlzdGl0ZW0gPSAodGV4dDogYW55KSA9PiB7XHJcbiAgICAgIGlmICgvXlxccypcXFtbeCBdXFxdXFxzKi8udGVzdCh0ZXh0KSkge1xyXG4gICAgICAgIHRleHQgPSB0ZXh0XHJcbiAgICAgICAgICAucmVwbGFjZSgvXlxccypcXFsgXFxdXFxzKi8sICc8aSBjbGFzcz1cImZhIGZhLXNxdWFyZS1vXCIgc3R5bGU9XCJtYXJnaW46IDAgMC4yZW0gMC4yNWVtIC0xLjZlbTtcIj48L2k+ICcpXHJcbiAgICAgICAgICAucmVwbGFjZSgvXlxccypcXFt4XFxdXFxzKi8sICc8aSBjbGFzcz1cImZhIGZhLWNoZWNrLXNxdWFyZVwiIHN0eWxlPVwibWFyZ2luOiAwIDAuMmVtIDAuMjVlbSAtMS42ZW07XCI+PC9pPiAnKTtcclxuICAgICAgICByZXR1cm4gYDxsaSBzdHlsZT1cImxpc3Qtc3R5bGU6IG5vbmU7XCI+JHt0ZXh0fTwvbGk+YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gYDxsaT4ke3RleHR9PC9saT5gO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgbGV0IG1hcmtlZGpzT3B0ID0ge1xyXG4gICAgICByZW5kZXJlcjogbWFya2VkUmVuZGVyLFxyXG4gICAgICBoaWdobGlnaHQ6IChjb2RlOiBhbnkpID0+IGhsanMuaGlnaGxpZ2h0QXV0byhjb2RlKS52YWx1ZVxyXG4gICAgfTtcclxuICAgIHRoaXMuX21hcmtlZE9wdCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucy5tYXJrZWRqc09wdCwgbWFya2VkanNPcHQpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgbGV0IGVkaXRvckVsZW1lbnQgPSB0aGlzLmFjZUVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5fZWRpdG9yID0gYWNlLmVkaXQoZWRpdG9yRWxlbWVudCk7XHJcbiAgICB0aGlzLl9lZGl0b3IuJGJsb2NrU2Nyb2xsaW5nID0gSW5maW5pdHk7XHJcbiAgICB0aGlzLl9lZGl0b3IuZ2V0U2Vzc2lvbigpLnNldFVzZVdyYXBNb2RlKHRydWUpO1xyXG4gICAgdGhpcy5fZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKFwiYWNlL21vZGUvbWFya2Rvd25cIik7XHJcbiAgICB0aGlzLl9lZGl0b3Iuc2V0VmFsdWUodGhpcy5tYXJrZG93blZhbHVlIHx8ICcnLCAxKTtcclxuICAgIHRoaXMuX2VkaXRvci5zZXRPcHRpb24oJ3Njcm9sbFBhc3RFbmQnLCB0aGlzLl9vcHRpb25zLnNjcm9sbFBhc3RFbmQgfHwgMCk7XHJcblxyXG4gICAgdGhpcy5fZWRpdG9yLm9uKFwiY2hhbmdlXCIsIChlOiBhbnkpID0+IHtcclxuICAgICAgbGV0IHZhbCA9IHRoaXMuX2VkaXRvci5nZXRWYWx1ZSgpO1xyXG4gICAgICB0aGlzLm1hcmtkb3duVmFsdWUgPSB2YWw7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fZWRpdG9yICYmIHRoaXMuX2VkaXRvci5kZXN0cm95KCk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkgfCBBcnJheTxhbnk+KTogdm9pZCB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5tYXJrZG93blZhbHVlID0gdmFsdWU7XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuX2VkaXRvcikge1xyXG4gICAgICAgIHRoaXMuX2VkaXRvci5zZXRWYWx1ZSh2YWx1ZSB8fCAnJywgMSk7XHJcbiAgICAgIH1cclxuICAgIH0sIDEpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4ge30pOiB2b2lkIHtcclxuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pOiB2b2lkIHtcclxuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB7XHJcbiAgICBsZXQgcmVzdWx0OiBhbnkgPSBudWxsO1xyXG4gICAgaWYgKHRoaXMucmVxdWlyZWQgJiYgdGhpcy5tYXJrZG93blZhbHVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXN1bHQgPSB7IHJlcXVpcmVkOiB0cnVlIH07XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5tYXhsZW5ndGggPiAwICYmIHRoaXMubWFya2Rvd25WYWx1ZS5sZW5ndGggPiB0aGlzLm1heGxlbmd0aCkge1xyXG4gICAgICByZXN1bHQgPSB7IG1heGxlbmd0aDogdHJ1ZSB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGluc2VydENvbnRlbnQodHlwZTogc3RyaW5nLCBjdXN0b21Db250ZW50Pzogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuX2VkaXRvcikgcmV0dXJuO1xyXG4gICAgbGV0IHNlbGVjdGVkVGV4dCA9IHRoaXMuX2VkaXRvci5nZXRTZWxlY3RlZFRleHQoKTtcclxuICAgIGxldCBpc1NlbGVjdGVkID0gISFzZWxlY3RlZFRleHQ7XHJcbiAgICBsZXQgc3RhcnRTaXplID0gMjtcclxuICAgIGxldCBpbml0VGV4dDogc3RyaW5nID0gJyc7XHJcbiAgICBsZXQgcmFuZ2UgPSB0aGlzLl9lZGl0b3Iuc2VsZWN0aW9uLmdldFJhbmdlKCk7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnQm9sZCc6XHJcbiAgICAgICAgaW5pdFRleHQgPSAnQm9sZCBUZXh0JztcclxuICAgICAgICBzZWxlY3RlZFRleHQgPSBgKioke3NlbGVjdGVkVGV4dCB8fCBpbml0VGV4dH0qKmA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ0l0YWxpYyc6XHJcbiAgICAgICAgaW5pdFRleHQgPSAnSXRhbGljIFRleHQnO1xyXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9IGAqJHtzZWxlY3RlZFRleHQgfHwgaW5pdFRleHR9KmA7XHJcbiAgICAgICAgc3RhcnRTaXplID0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnSGVhZGluZyc6XHJcbiAgICAgICAgaW5pdFRleHQgPSAnSGVhZGluZyc7XHJcbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gYCMgJHtzZWxlY3RlZFRleHQgfHwgaW5pdFRleHR9YDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnUmVmcmVuY2UnOlxyXG4gICAgICAgIGluaXRUZXh0ID0gJ1JlZnJlbmNlJztcclxuICAgICAgICBzZWxlY3RlZFRleHQgPSBgPiAke3NlbGVjdGVkVGV4dCB8fCBpbml0VGV4dH1gO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdMaW5rJzpcclxuICAgICAgICBzZWxlY3RlZFRleHQgPSBgW10oaHR0cDovLylgO1xyXG4gICAgICAgIHN0YXJ0U2l6ZSA9IDE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ0ltYWdlJzpcclxuICAgICAgICBzZWxlY3RlZFRleHQgPSBgIVtdKGh0dHA6Ly8pYDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnVWwnOlxyXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9IGAtICR7c2VsZWN0ZWRUZXh0IHx8IGluaXRUZXh0fWBcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnT2wnOlxyXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9IGAxLiAke3NlbGVjdGVkVGV4dCB8fCBpbml0VGV4dH1gXHJcbiAgICAgICAgc3RhcnRTaXplID0gMztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnQ29kZSc6XHJcbiAgICAgICAgaW5pdFRleHQgPSAnU291cmNlIENvZGUnO1xyXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9IFwiYGBgbGFuZ3VhZ2VcXHJcXG5cIiArIChzZWxlY3RlZFRleHQgfHwgaW5pdFRleHQpICsgXCJcXHJcXG5gYGBcIjtcclxuICAgICAgICBzdGFydFNpemUgPSAzO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdDdXN0b20nOlxyXG4gICAgICAgIHNlbGVjdGVkVGV4dCA9IGN1c3RvbUNvbnRlbnQ7XHJcbiAgICAgICAgc3RhcnRTaXplID0gMDtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHRoaXMuX2VkaXRvci5zZXNzaW9uLnJlcGxhY2UocmFuZ2UsIHNlbGVjdGVkVGV4dCk7XHJcbiAgICBpZiAoIWlzU2VsZWN0ZWQpIHtcclxuICAgICAgcmFuZ2Uuc3RhcnQuY29sdW1uICs9IHN0YXJ0U2l6ZTtcclxuICAgICAgcmFuZ2UuZW5kLmNvbHVtbiA9IHJhbmdlLnN0YXJ0LmNvbHVtbiArIGluaXRUZXh0Lmxlbmd0aDtcclxuICAgICAgdGhpcy5fZWRpdG9yLnNlbGVjdGlvbi5zZXRSYW5nZShyYW5nZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9lZGl0b3IuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVByZXZpZXcoKSB7XHJcbiAgICB0aGlzLnNob3dQcmV2aWV3UGFuZWwgPSAhdGhpcy5zaG93UHJldmlld1BhbmVsO1xyXG4gICAgdGhpcy5lZGl0b3JSZXNpemUoKTtcclxuICB9XHJcblxyXG4gIHByZXZpZXdQYW5lbENsaWNrKGV2ZW50OiBFdmVudCkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5lbmFibGVQcmV2aWV3Q29udGVudENsaWNrICE9PSB0cnVlKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVsbFNjcmVlbigpIHtcclxuICAgIHRoaXMuaXNGdWxsU2NyZWVuID0gIXRoaXMuaXNGdWxsU2NyZWVuO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGRvY3VtZW50LmJvZHksICdvdmVyZmxvd1knLCB0aGlzLmlzRnVsbFNjcmVlbiA/ICdoaWRkZW4nIDogJ2F1dG8nKTtcclxuICAgIHRoaXMuZWRpdG9yUmVzaXplKCk7XHJcbiAgfVxyXG5cclxuICBtZEVkaXRvclJlc2l6ZShzaXplOiBhbnkpIHtcclxuICAgIHRoaXMuZWRpdG9yUmVzaXplKCk7XHJcbiAgfVxyXG5cclxuICBlZGl0b3JSZXNpemUodGltZU91dDogbnVtYmVyID0gMTAwKSB7XHJcbiAgICBpZiAoIXRoaXMuX2VkaXRvcikgcmV0dXJuXHJcbiAgICBpZiAodGhpcy5fZWRpdG9yUmVzaXplVGltZXIpIGNsZWFyVGltZW91dCh0aGlzLl9lZGl0b3JSZXNpemVUaW1lcik7XHJcbiAgICB0aGlzLl9lZGl0b3JSZXNpemVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9lZGl0b3IucmVzaXplKCk7XHJcbiAgICAgIHRoaXMuX2VkaXRvci5mb2N1cygpO1xyXG4gICAgfSwgdGltZU91dCk7XHJcbiAgfVxyXG5cclxuICBvbkRyYWdvdmVyKGV2dDogRHJhZ0V2ZW50KSB7XHJcbiAgICBldnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmICghdGhpcy5faGFzVXBsb2FkRnVuY3Rpb24pIHJldHVybjtcclxuICAgIHRoaXMuZHJhZ292ZXIgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgb25Ecm9wKGV2dDogRHJhZ0V2ZW50KSB7XHJcbiAgICBldnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmICghdGhpcy5faGFzVXBsb2FkRnVuY3Rpb24gfHwgdGhpcy5pc1VwbG9hZGluZykgcmV0dXJuO1xyXG5cclxuICAgIGlmICghZXZ0LmRhdGFUcmFuc2Zlci5maWxlcyB8fCBldnQuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLmRyYWdvdmVyID0gZmFsc2U7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlzVXBsb2FkaW5nID0gdHJ1ZTtcclxuICAgIFByb21pc2UucmVzb2x2ZSgpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy51cGxvYWQoZXZ0LmRhdGFUcmFuc2Zlci5maWxlcyk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XHJcbiAgICAgICAgICBsZXQgbXNnID0gW107XHJcbiAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXBNc2cgPSBgWyR7aXRlbS5uYW1lfV0oJHtpdGVtLnVybH0pYDtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uaXNJbWcpIHtcclxuICAgICAgICAgICAgICB0ZW1wTXNnID0gYCEke3RlbXBNc2d9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtc2cucHVzaCh0ZW1wTXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuaW5zZXJ0Q29udGVudCgnQ3VzdG9tJywgbXNnLmpvaW4oJ1xcclxcbicpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKCdJbnZhbGlkIHVwbG9hZCByZXN1bHQuIFBsZWFzZSB1c2luZyBmb2xsb3cgdGhpcyB0eXBlIGBVcGxvYWRSZXN1bHRgLicpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNVcGxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRyYWdvdmVyID0gZmFsc2U7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICB0aGlzLmlzVXBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kcmFnb3ZlciA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uRHJhZ2xlYXZlKGV2dDogRHJhZ0V2ZW50KSB7XHJcbiAgICBldnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmICghdGhpcy5faGFzVXBsb2FkRnVuY3Rpb24pIHJldHVybjtcclxuICAgIHRoaXMuZHJhZ292ZXIgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19