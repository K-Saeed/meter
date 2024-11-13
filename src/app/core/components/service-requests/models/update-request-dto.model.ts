export class UpdateRequestDto {
  requestType?: string;
  title?: string;
  description?: string;
  owner?: RequestOwner;
  consultationRequestDto?: UpdateConsultationRequestDto;
  jobRequestDto?: UpdateJobRequestDto;
  requestServiceDto?: UpdateRequestServiceDto;
  filesToBeDeletedIds?: string[];

  constructor(init?: Partial<UpdateRequestDto>) {
    Object.assign(this, init);
  }
}

export class RequestOwner {
  email?: string;
  role?: string;
  name?: string;

  constructor(init?: Partial<RequestOwner>) {
    Object.assign(this, init);
  }
}

export class UpdateConsultationRequestDto {
  title?: string;
  type?: string;
  applicationName?: string;
  details?: string;
  phoneNumber?: string;
  region?: string;
  city?: string;
  neighborhood?: string;
  latitude?: number;
  longitude?: number;

  constructor(init?: Partial<UpdateConsultationRequestDto>) {
    Object.assign(this, init);
  }
}

export class UpdateJobRequestDto {
  certificateType?: string;
  specialization?: string;
  experienceYears?: string;
  experienceDesc?: string;
  workCity?: string;
  email?: string;
  phoneNumber?: string;
  name?: string;

  constructor(init?: Partial<UpdateJobRequestDto>) {
    Object.assign(this, init);
  }
}

export class UpdateRequestServiceDto {
  pricingPurpose?: string;
  certificateType?: string;
  surveyReport?: string;
  surveyReportNum?: string;
  instructionNum?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  pieceNum?: string;
  chartNum?: string;
  applicationName?: string;
  applicationType?: string;
  phoneNumber?: string;
  agencyNum?: string;
  idNumber?: string;
  serviceType?: boolean;

  constructor(init?: Partial<UpdateRequestServiceDto>) {
    Object.assign(this, init);
  }
}