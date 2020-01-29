import { IClipboardResponse } from 'ngx-clipboard';

export class ClipboardResponse implements IClipboardResponse {
    isSuccess: boolean;
    content?: string;
    event?: Event;
    successMessage?: string;
}
