export interface ChatRoom {
    id: string,
    providerProfile: UserProfile;
    customerProfile: UserProfile;
    lastMessage: string;
    lastMessageTimestamp: Date;
}

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    logoPath: string;
    mobile: string;
    role: string;
    token: string;
    mobileUser: boolean;
    registeredDate: string; 
    spent: number;
    status: string;
    customerDetails?: CustomerDto; 
    providerDetails?: ProviderDto;
    sellerDetails?: SellerDto;
}

export interface CustomerDto {
    address: string;
    city: string;
    neighborhood: string;
}

export interface ProviderDto {
    activityType: string;
    serviceDescription: string;
    licenseNumber: string;
    commercialRegistration: string;
    commercialDate: string; 
    ownerName: string;
    managerName: string;
    managerPhoneNumber: string;
    region: string;
    address: string;
    city: string;
    neighborhood: string;
    latitude: number;
    longitude: number;
    serviceProvider: string;
    files: FileResponse[]; 
}

export interface SellerDto {
    facilityActivity: string;
    serviceDescription: string;
    licenseNumber: string;
    commercialRegistration: string;
    ownerName: string;
    managerName: string;
    managerPhoneNumber: string;
    region: string;
    address: string;
    city: string;
    neighborhood: string;
    latitude: number;
    longitude: number;
    serviceProvider: string;
    files: FileResponse[]; 
}

export interface FileResponse {
    id: string;
    fileName: string;
    fileType: string;
    filePath: string;
    uploadDate: string;
}