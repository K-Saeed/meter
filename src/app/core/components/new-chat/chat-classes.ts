import { CustomerDto, ProviderDto, SellerDto } from "../../models/user-to-be-added.model";

export class Message {
    chatId?: string;
    senderEmail?: string;
    recipientEmail?: string;
    recipientEmails?: string[];
    latitude?:number;
    longitude?:number;
    content?: string;
    contentType?: string;
    key?: string;
    createdAt?: Date | null;

    constructor(init?: Partial<Message>) {
      Object.assign(this, init);
    }
  }


  export class ChatRoom {
    id?: string;
    senderProfile?: UserProfile;
    recipientProfile?: UserProfile;
    lastMessage?: string;
    lastMessageTimestamp?: Date;

    constructor(init?: Partial<ChatRoom>) {
      Object.assign(this, init);
    }
  }

  export class UserProfile {
    id?: string;
    email?: string;
    name?: string;
    logoPath?: string;
    mobile?: string;
    role?: string;
    token?: string;
    mobileUser?: boolean;
    registeredDate?: string;
    spent?: number;
    status?: string;
    customerDetails?: CustomerDto;
    providerDetails?: ProviderDto;
    sellerDetails?: SellerDto;

    constructor(init?: Partial<UserProfile>) {
      Object.assign(this, init);
    }
  }
