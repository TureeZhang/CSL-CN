import { CommonModule } from '@angular/common';
import { __values } from 'tslib';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, ViewChild, forwardRef, Renderer2, Attribute, Input, NgZone, Output, EventEmitter, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/platform-browser';
import * as ɵngcc2 from '@angular/common';

var _c0 = ["aceEditor"];
function MarkdownEditorComponent_div_2_button_2_Template(rf, ctx) { if (rf & 1) {
    var _r18 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 32);
    ɵngcc0.ɵɵlistener("click", function MarkdownEditorComponent_div_2_button_2_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r18); var ctx_r17 = ɵngcc0.ɵɵnextContext(2); return ctx_r17.insertContent("Bold"); });
    ɵngcc0.ɵɵelement(1, "i", 33);
    ɵngcc0.ɵɵelementEnd();
} }
function MarkdownEditorComponent_div_2_button_3_Template(rf, ctx) { if (rf & 1) {
    var _r20 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 34);
    ɵngcc0.ɵɵlistener("click", function MarkdownEditorComponent_div_2_button_3_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r20); var ctx_r19 = ɵngcc0.ɵɵnextContext(2); return ctx_r19.insertContent("Italic"); });
    ɵngcc0.ɵɵelement(1, "i", 35);
    ɵngcc0.ɵɵelementEnd();
} }
function MarkdownEditorComponent_div_2_button_4_Template(rf, ctx) { if (rf & 1) {
    var _r22 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 36);
    ɵngcc0.ɵɵlistener("click", function MarkdownEditorComponent_div_2_button_4_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r22); var ctx_r21 = ɵngcc0.ɵɵnextContext(2); return ctx_r21.insertContent("Heading"); });
    ɵngcc0.ɵɵelement(1, "i", 37);
    ɵngcc0.ɵɵelementEnd();
} }
function MarkdownEditorComponent_div_2_button_5_Template(rf, ctx) { if (rf & 1) {
    var _r24 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 38);
    ɵngcc0.ɵɵlistener("click", function MarkdownEditorComponent_div_2_button_5_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r24); var ctx_r23 = ɵngcc0.ɵɵnextContext(2); return ctx_r23.insertContent("Refrence"); });
    ɵngcc0.ɵɵelement(1, "i", 39);
    ɵngcc0.ɵɵelementEnd();
} }
function MarkdownEditorComponent_div_2_button_7_Template(rf, ctx) { if (rf & 1) {
    var _r26 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 40);
    ɵngcc0.ɵɵlistener("click", function MarkdownEditorComponent_div_2_button_7_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r26); var ctx_r25 = ɵngcc0.ɵɵnextContext(2); return ctx_r25.insertContent("Link"); });
    ɵngcc0.ɵɵelement(1, "i", 41);
    ɵngcc0.ɵɵelementEnd();
} }
function MarkdownEditorComponent_div_2_button_8_Template(rf, ctx) { if (rf & 1) {
    var _r28 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 42);
    ɵngcc0.ɵɵlistener("click", function MarkdownEditorComponent_div_2_button_8_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r28); var ctx_r27 = ɵngcc0.ɵɵnextContext(2); return ctx_r27.insertContent("Image"); });
    ɵngcc0.ɵɵelement(1, "i", 43);
    ɵngcc0.ɵɵelementEnd();
} }
function MarkdownEditorComponent_div_2_button_10_Template(rf, ctx) { if (rf & 1) {
    var _r30 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 44);
    ɵngcc0.ɵɵlistener("click", function MarkdownEditorComponent_div_2_button_10_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r30); var ctx_r29 = ɵngcc0.ɵɵnextContext(2); return ctx_r29.insertContent("Ul"); });
    ɵngcc0.ɵɵelement(1, "i", 45);
    ɵngcc0.ɵɵelementEnd();
} }
function MarkdownEditorComponent_div_2_button_11_Template(rf, ctx) { if (rf & 1) {
    var _r32 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 46);
    ɵngcc0.ɵɵlistener("click", function MarkdownEditorComponent_div_2_button_11_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r32); var ctx_r31 = ɵngcc0.ɵɵnextContext(2); return ctx_r31.insertContent("Ol"); });
    ɵngcc0.ɵɵelement(1, "i", 47);
    ɵngcc0.ɵɵelementEnd();
} }
function MarkdownEditorComponent_div_2_button_12_Template(rf, ctx) { if (rf & 1) {
    var _r34 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 48);
    ɵngcc0.ɵɵlistener("click", function MarkdownEditorComponent_div_2_button_12_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r34); var ctx_r33 = ɵngcc0.ɵɵnextContext(2); return ctx_r33.insertContent("Code"); });
    ɵngcc0.ɵɵelement(1, "i", 49);
    ɵngcc0.ɵɵelementEnd();
} }
function MarkdownEditorComponent_div_2_button_14_Template(rf, ctx) { if (rf & 1) {
    var _r36 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 50);
    ɵngcc0.ɵɵlistener("click", function MarkdownEditorComponent_div_2_button_14_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r36); var ctx_r35 = ɵngcc0.ɵɵnextContext(2); return ctx_r35.togglePreview(); });
    ɵngcc0.ɵɵelement(1, "i", 51);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r15 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵattribute("title", ctx_r15.showPreviewPanel ? "Hide Preview" : "Show Preview");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵclassProp("fa-eye", !ctx_r15.showPreviewPanel)("fa-eye-slash", ctx_r15.showPreviewPanel);
} }
function MarkdownEditorComponent_div_2_button_16_Template(rf, ctx) { if (rf & 1) {
    var _r38 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "button", 50);
    ɵngcc0.ɵɵlistener("click", function MarkdownEditorComponent_div_2_button_16_Template_button_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r38); var ctx_r37 = ɵngcc0.ɵɵnextContext(2); return ctx_r37.fullScreen(); });
    ɵngcc0.ɵɵelement(1, "i", 52);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r16 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵclassProp("active", ctx_r16.isFullScreen);
} }
function MarkdownEditorComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 18);
    ɵngcc0.ɵɵelementStart(1, "div", 19);
    ɵngcc0.ɵɵtemplate(2, MarkdownEditorComponent_div_2_button_2_Template, 2, 0, "button", 20);
    ɵngcc0.ɵɵtemplate(3, MarkdownEditorComponent_div_2_button_3_Template, 2, 0, "button", 21);
    ɵngcc0.ɵɵtemplate(4, MarkdownEditorComponent_div_2_button_4_Template, 2, 0, "button", 22);
    ɵngcc0.ɵɵtemplate(5, MarkdownEditorComponent_div_2_button_5_Template, 2, 0, "button", 23);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(6, "div", 19);
    ɵngcc0.ɵɵtemplate(7, MarkdownEditorComponent_div_2_button_7_Template, 2, 0, "button", 24);
    ɵngcc0.ɵɵtemplate(8, MarkdownEditorComponent_div_2_button_8_Template, 2, 0, "button", 25);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(9, "div", 19);
    ɵngcc0.ɵɵtemplate(10, MarkdownEditorComponent_div_2_button_10_Template, 2, 0, "button", 26);
    ɵngcc0.ɵɵtemplate(11, MarkdownEditorComponent_div_2_button_11_Template, 2, 0, "button", 27);
    ɵngcc0.ɵɵtemplate(12, MarkdownEditorComponent_div_2_button_12_Template, 2, 0, "button", 28);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(13, "div", 19);
    ɵngcc0.ɵɵtemplate(14, MarkdownEditorComponent_div_2_button_14_Template, 2, 5, "button", 29);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(15, "div", 30);
    ɵngcc0.ɵɵtemplate(16, MarkdownEditorComponent_div_2_button_16_Template, 2, 2, "button", 31);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.hideIcons.Bold);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.hideIcons.Italic);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.hideIcons.Heading);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.hideIcons.Refrence);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.hideIcons.Link);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.hideIcons.Image);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.hideIcons.Ul);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.hideIcons.Ol);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.hideIcons.Code);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.hideIcons.TogglePreview);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r0.hideIcons.FullScreen);
} }
function MarkdownEditorComponent_i_7_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "i", 53);
} }
function MarkdownEditorComponent_i_8_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "i", 54);
} }
function MarkdownEditorComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 55);
    ɵngcc0.ɵɵelementStart(1, "div", 56);
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelement(3, "div", 57);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r4 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate2(" ", ctx_r4.markdownValue == null ? null : ctx_r4.markdownValue.length, " / ", ctx_r4.maxlength, " ");
} }
function MarkdownEditorComponent_md_editor_resize_sensor_18_Template(rf, ctx) { if (rf & 1) {
    var _r40 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "md-editor-resize-sensor", 58);
    ɵngcc0.ɵɵlistener("resize", function MarkdownEditorComponent_md_editor_resize_sensor_18_Template_md_editor_resize_sensor_resize_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r40); var ctx_r39 = ɵngcc0.ɵɵnextContext(); return ctx_r39.mdEditorResize($event); });
    ɵngcc0.ɵɵelementEnd();
} }
var _c1 = ["resizeSensor"];
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
    /** @nocollapse */
    MarkdownEditorComponent.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: Attribute, args: ['required',] }] },
        { type: Number, decorators: [{ type: Attribute, args: ['maxlength',] }] },
        { type: Renderer2 },
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
MarkdownEditorComponent.ɵfac = function MarkdownEditorComponent_Factory(t) { return new (t || MarkdownEditorComponent)(ɵngcc0.ɵɵinjectAttribute('required'), ɵngcc0.ɵɵinjectAttribute('maxlength'), ɵngcc0.ɵɵdirectiveInject(Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.DomSanitizer)); };
MarkdownEditorComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: MarkdownEditorComponent, selectors: [["md-editor"]], viewQuery: function MarkdownEditorComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.aceEditorContainer = _t.first);
    } }, inputs: { hideToolbar: "hideToolbar", height: "height", mode: "mode", options: "options", preRender: "preRender", upload: "upload" }, features: [ɵngcc0.ɵɵProvidersFeature([
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
        ])], decls: 19, vars: 19, consts: [[1, "md-editor-container"], [1, "md-layout"], ["class", "tool-bar", 4, "ngIf"], [1, "editor-container"], [3, "dragover"], [1, "drag-container"], [1, "upload-loading"], ["class", "fa fa-upload", 4, "ngIf"], ["class", "fa fa-spinner fa-pulse fa-fw", 4, "ngIf"], [1, "text"], [1, "drag-container", "drag-container-mask", 3, "drop", "dragleave"], [1, "editor-panel"], [1, "ace-editor"], ["aceEditor", ""], [3, "click"], [1, "preview-panel", 3, "innerHtml"], ["class", "md-footer", 4, "ngIf"], [3, "resize", 4, "ngIf"], [1, "tool-bar"], [1, "btn-group"], ["class", "btn btn-sm btn-default", "type", "button", "title", "Bold", 3, "click", 4, "ngIf"], ["class", "btn btn-sm btn-default", "type", "button", "title", "Italic", 3, "click", 4, "ngIf"], ["class", "btn btn-sm btn-default", "type", "button", "title", "Heading", 3, "click", 4, "ngIf"], ["class", "btn btn-sm btn-default", "type", "button", "title", "Refrence", 3, "click", 4, "ngIf"], ["class", "btn btn-sm btn-default", "type", "button", "title", "Link", 3, "click", 4, "ngIf"], ["class", "btn btn-sm btn-default", "type", "button", "title", "Image", 3, "click", 4, "ngIf"], ["class", "btn btn-sm btn-default", "type", "button", "title", "Unordered List", 3, "click", 4, "ngIf"], ["class", "btn btn-sm btn-default", "type", "button", "title", "Ordered List", 3, "click", 4, "ngIf"], ["class", "btn btn-sm btn-default", "type", "button", "title", "Code Block", 3, "click", 4, "ngIf"], ["class", "btn btn-sm btn-default", "type", "button", 3, "click", 4, "ngIf"], [1, "btn-group", "pull-right", "hide-split"], ["class", "btn btn-sm btn-default", "type", "button", 3, "active", "click", 4, "ngIf"], ["type", "button", "title", "Bold", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-bold"], ["type", "button", "title", "Italic", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-italic"], ["type", "button", "title", "Heading", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-header"], ["type", "button", "title", "Refrence", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-quote-left"], ["type", "button", "title", "Link", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-link"], ["type", "button", "title", "Image", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-image"], ["type", "button", "title", "Unordered List", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-list-ul"], ["type", "button", "title", "Ordered List", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-list-ol"], ["type", "button", "title", "Code Block", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa", "fa-file-code-o"], ["type", "button", 1, "btn", "btn-sm", "btn-default", 3, "click"], [1, "fa"], [1, "fa", "fa-arrows-alt"], [1, "fa", "fa-upload"], [1, "fa", "fa-spinner", "fa-pulse", "fa-fw"], [1, "md-footer"], [1, "text-right", "length-view"], [1, "resize-btn"], [3, "resize"]], template: function MarkdownEditorComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵtemplate(2, MarkdownEditorComponent_div_2_Template, 17, 11, "div", 2);
        ɵngcc0.ɵɵelementStart(3, "div", 3);
        ɵngcc0.ɵɵelementStart(4, "div", 4);
        ɵngcc0.ɵɵlistener("dragover", function MarkdownEditorComponent_Template_div_dragover_4_listener($event) { return ctx.onDragover($event); });
        ɵngcc0.ɵɵelementStart(5, "div", 5);
        ɵngcc0.ɵɵelementStart(6, "div", 6);
        ɵngcc0.ɵɵtemplate(7, MarkdownEditorComponent_i_7_Template, 1, 0, "i", 7);
        ɵngcc0.ɵɵtemplate(8, MarkdownEditorComponent_i_8_Template, 1, 0, "i", 8);
        ɵngcc0.ɵɵelementStart(9, "div", 9);
        ɵngcc0.ɵɵtext(10);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(11, "div", 10);
        ɵngcc0.ɵɵlistener("drop", function MarkdownEditorComponent_Template_div_drop_11_listener($event) { return ctx.onDrop($event); })("dragleave", function MarkdownEditorComponent_Template_div_dragleave_11_listener($event) { return ctx.onDragleave($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(12, "div", 11);
        ɵngcc0.ɵɵelement(13, "div", 12, 13);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(15, "div", 14);
        ɵngcc0.ɵɵlistener("click", function MarkdownEditorComponent_Template_div_click_15_listener($event) { return ctx.previewPanelClick($event); });
        ɵngcc0.ɵɵelement(16, "div", 15);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(17, MarkdownEditorComponent_div_17_Template, 4, 2, "div", 16);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(18, MarkdownEditorComponent_md_editor_resize_sensor_18_Template, 1, 0, "md-editor-resize-sensor", 17);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵstyleProp("height", ctx.height);
        ɵngcc0.ɵɵclassProp("fullscreen", ctx.isFullScreen)("md-editor-resizable", ctx.options == null ? null : ctx.options.resizable);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.hideToolbar && ctx.mode != "preview");
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵstyleProp("display", ctx.mode == "preview" ? "none" : null);
        ɵngcc0.ɵɵclassProp("dragover", ctx.dragover);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.isUploading);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.isUploading);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵtextInterpolate(ctx.isUploading ? "Uploading" : "Drag it here");
        ɵngcc0.ɵɵadvance(5);
        ɵngcc0.ɵɵstyleProp("display", ctx.showPreviewPanel ? "block" : "none");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("innerHtml", ctx.previewHtml, ɵngcc0.ɵɵsanitizeHtml);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.maxlength > 0 && ctx.mode != "preview");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.options == null ? null : ctx.options.resizable);
    } }, directives: function () { return [ɵngcc2.NgIf, MarkdownEditorResizeSensorComponent]; }, styles: [".md-editor-container[_ngcontent-%COMP%]{position:relative;height:100%;margin-bottom:15px;border:1px solid rgba(0,0,0,.1)}.md-editor-container.fullscreen[_ngcontent-%COMP%]{margin:0;position:fixed;border:0;top:0;left:0;width:100%!important;height:100%!important;z-index:99999999}.md-editor-container.md-editor-resizable[_ngcontent-%COMP%]:not(.fullscreen){resize:both;overflow:auto;display:inline-block;width:100%}.md-editor-container.md-editor-resizable[_ngcontent-%COMP%]:not(.fullscreen)   .md-footer[_ngcontent-%COMP%]{z-index:-1}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]{background-color:#f5f5f5;border-bottom:1px solid rgba(0,0,0,.1)}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]   .btn-group[_ngcontent-%COMP%]{padding:6px}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]   .btn-group[_ngcontent-%COMP%]:first-child > .btn[_ngcontent-%COMP%]:first-child::before{display:none}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]   .btn-group[_ngcontent-%COMP%] > .btn[_ngcontent-%COMP%]:first-child::before{content:' ';background-color:#a9a9a9;width:1px;height:24px;left:-9px;top:2px;position:absolute}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]   .btn-group.hide-split[_ngcontent-%COMP%] > .btn[_ngcontent-%COMP%]:first-child::before{display:none}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .tool-bar[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{margin-bottom:0}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%]{flex:1;display:flex}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{flex:1}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .drag-container[_ngcontent-%COMP%]{display:none}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%] > div.dragover[_ngcontent-%COMP%]{position:relative}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%] > div.dragover[_ngcontent-%COMP%]   .drag-container[_ngcontent-%COMP%]{display:block;position:absolute;left:0;top:0;right:0;bottom:0;z-index:10;background-color:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;font-size:50px;color:#fff}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%] > div.dragover[_ngcontent-%COMP%]   .drag-container.drag-container-mask[_ngcontent-%COMP%]{background-color:transparent;z-index:11}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%] > div.dragover[_ngcontent-%COMP%]   .drag-container[_ngcontent-%COMP%]   .upload-loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%] > div.dragover[_ngcontent-%COMP%]   .drag-container[_ngcontent-%COMP%]   .upload-loading[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{font-size:20px;margin-top:10px}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%]   .editor-panel[_ngcontent-%COMP%]{height:100%}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%]   .editor-panel[_ngcontent-%COMP%]   .ace-editor[_ngcontent-%COMP%]{height:100%;min-height:100%}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .preview-panel[_ngcontent-%COMP%]{height:100%;border-left:1px solid rgba(0,0,0,.1);background-color:#fff;padding:10px;overflow-y:auto}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .md-footer[_ngcontent-%COMP%]{background-color:#f0f0f0;border-top:1px solid rgba(0,0,0,.1);display:flex;align-items:center}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .md-footer[_ngcontent-%COMP%]   .length-view[_ngcontent-%COMP%]{flex:1;padding:4px 2px 0;font-size:12px;line-height:16px}.md-editor-container[_ngcontent-%COMP%]   .md-layout[_ngcontent-%COMP%]   .md-footer[_ngcontent-%COMP%]   .resize-btn[_ngcontent-%COMP%]{width:17px}"] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(MarkdownEditorComponent, [{
        type: Component,
        args: [{
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
            }]
    }], function () { return [{ type: Boolean, decorators: [{
                type: Attribute,
                args: ['required']
            }] }, { type: Number, decorators: [{
                type: Attribute,
                args: ['maxlength']
            }] }, { type: Renderer2 }, { type: ɵngcc1.DomSanitizer }]; }, { hideToolbar: [{
            type: Input
        }], height: [{
            type: Input
        }], mode: [{
            type: Input
        }], options: [{
            type: Input
        }], aceEditorContainer: [{
            type: ViewChild,
            args: ['aceEditor']
        }], preRender: [{
            type: Input
        }], upload: [{
            type: Input
        }] }); })();
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
    /** @nocollapse */
    MarkdownEditorResizeSensorComponent.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    MarkdownEditorResizeSensorComponent.propDecorators = {
        resizeSensor: [{ type: ViewChild, args: ['resizeSensor',] }],
        interval: [{ type: Input }],
        resize: [{ type: Output }]
    };
MarkdownEditorResizeSensorComponent.ɵfac = function MarkdownEditorResizeSensorComponent_Factory(t) { return new (t || MarkdownEditorResizeSensorComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone)); };
MarkdownEditorResizeSensorComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: MarkdownEditorResizeSensorComponent, selectors: [["md-editor-resize-sensor"]], viewQuery: function MarkdownEditorResizeSensorComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c1, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.resizeSensor = _t.first);
    } }, inputs: { interval: "interval" }, outputs: { resize: "resize" }, decls: 2, vars: 0, consts: [[1, "md-editor-resize-sensor"], ["resizeSensor", ""]], template: function MarkdownEditorResizeSensorComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelement(0, "div", 0, 1);
    } }, styles: [".md-editor-resize-sensor[_ngcontent-%COMP%]{position:absolute;left:0;right:0;top:0;bottom:0;z-index:-1}"] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(MarkdownEditorResizeSensorComponent, [{
        type: Component,
        args: [{
                selector: 'md-editor-resize-sensor',
                template: "<div class=\"md-editor-resize-sensor\" #resizeSensor></div>\r\n",
                styles: [".md-editor-resize-sensor{position:absolute;left:0;right:0;top:0;bottom:0;z-index:-1}"]
            }]
    }], function () { return [{ type: ɵngcc0.NgZone }]; }, { interval: [{
            type: Input
        }], resize: [{
            type: Output
        }], resizeSensor: [{
            type: ViewChild,
            args: ['resizeSensor']
        }] }); })();
    return MarkdownEditorResizeSensorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LMarkdownEditorModule = /** @class */ (function () {
    function LMarkdownEditorModule() {
    }
LMarkdownEditorModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: LMarkdownEditorModule });
LMarkdownEditorModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function LMarkdownEditorModule_Factory(t) { return new (t || LMarkdownEditorModule)(); }, imports: [[
            CommonModule,
            FormsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(LMarkdownEditorModule, { declarations: function () { return [MarkdownEditorComponent,
        MarkdownEditorResizeSensorComponent]; }, imports: function () { return [CommonModule,
        FormsModule]; }, exports: function () { return [MarkdownEditorComponent,
        MarkdownEditorResizeSensorComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(LMarkdownEditorModule, [{
        type: NgModule,
        args: [{
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
            }]
    }], function () { return []; }, null); })();
    return LMarkdownEditorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MarkdownEditorComponent, MarkdownEditorResizeSensorComponent, LMarkdownEditorModule };

//# sourceMappingURL=ngx-markdown-editor.js.map
