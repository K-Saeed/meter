export class UpdateServiceRequest {
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
  serviceType: boolean = false;

  filesToBeDeletedIds?: string[];


  constructor(init?: Partial<UpdateServiceRequest>) {
    Object.assign(this, init);
  }
}