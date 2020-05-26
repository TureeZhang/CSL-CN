export interface MdEditorOption {
    showBorder?: boolean;
    hideIcons?: Array<string>;
    scrollPastEnd?: number;
    enablePreviewContentClick?: boolean;
    resizable?: boolean;
    markedjsOpt?: MarkedjsOption;
}
export interface UploadResult {
    isImg: boolean;
    name: string;
    url: string;
}
export interface MarkedjsOption {
    baseUrl?: string;
    breaks?: boolean;
    gfm?: boolean;
    headerIds?: boolean;
    headerPrefix?: string;
    langPrefix?: string;
    mangle?: boolean;
    pedantic?: boolean;
    sanitize?: boolean;
    sanitizer?: Function;
    silent?: boolean;
    smartLists?: boolean;
    smartypants?: boolean;
    tables?: boolean;
    xhtml?: boolean;
}
