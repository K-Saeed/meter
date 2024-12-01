export class AdminChatMessage {
    recipientEmail?: string[];
    messageTitle?: string;
    content?: string;
    messageType?: string;

    constructor(init?: Partial<AdminChatMessage>) {
        Object.assign(this, init);
    }
}