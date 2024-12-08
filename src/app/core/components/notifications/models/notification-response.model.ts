export interface NotificationResponse {
  id?: number;
  senderEmail?: string;
  recipients?: string;
  title?: string;
  content?: string;
  success?:number;
  failure?:number;
  status?: string;
  createdAt?:Date;

}