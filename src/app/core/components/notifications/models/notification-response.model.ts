export interface NotificationResponse {
  id?: number;
  senderEmail?: string;
  receiverEmail?: string;
  title?: string;
  content?: string;
  status?: string;
  createdAt?:Date;

}
