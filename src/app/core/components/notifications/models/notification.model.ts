export class NotificationDto {
    senderEmail?: string;
    receiverEmail?: string;
    title?: string;
    content?: string;
    status?: string;
  
    constructor(init?: Partial<NotificationDto>) {
      Object.assign(this, init);
    }
  }
  