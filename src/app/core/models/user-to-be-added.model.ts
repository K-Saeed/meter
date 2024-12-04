export class UserDto {
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    role?: string;
    customer?: CustomerDto;
    provider?: ProviderDto;
    seller?: SellerDto;
    fcmToken?: string;

    constructor(init?: Partial<UserDto>) {
        Object.assign(this, init);
    }
}

export class CustomerDto {
    address?: string;
    city?: string;
    neighborhood?: string;

    constructor(init?: Partial<CustomerDto>) {
        Object.assign(this, init);
    }
}

export class ProviderDto {
    activityType?: string;
    serviceDescription?: string;
    licenseNumber?: string;
    commercialRegistration?: string;
    commercialDate?: string; // Use string for dates
    ownerName?: string;
    managerName?: string;
    managerPhoneNumber?: string;
    region?: string;
    address?: string;
    city?: string;
    neighborhood?: string;
    latitude?: number;
    longitude?: number;
    serviceProvider?: string;
    files?: FileResponse[];

    constructor(init?: Partial<ProviderDto>) {
        Object.assign(this, init);
    }
}

export class SellerDto {
    facilityActivity?: string;
    serviceDescription?: string;
    licenseNumber?: string;
    commercialRegistration?: string;
    ownerName?: string;
    managerName?: string;
    managerPhoneNumber?: string;
    region?: string;
    address?: string;
    city?: string;
    neighborhood?: string;
    latitude?: number;
    longitude?: number;
    serviceProvider?: string;
    files?: FileResponse[];

    constructor(init?: Partial<SellerDto>) {
        Object.assign(this, init);
    }
}

export class FileResponse {
    fileName?: string;
    fileType?: string;
    fileUrl?: string;
    constructor(init?: Partial<FileResponse>) {
        Object.assign(this, init);
    }
}
