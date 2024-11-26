export interface Message {
    id: string;
    senderEmail: string;
    latitude: number | null; 
    longitude: number | null;
    recipientEmail: string;
    messageType: string;
    content: (string | ArrayBuffer | null);
    sentTime: Date | null;
  }
  