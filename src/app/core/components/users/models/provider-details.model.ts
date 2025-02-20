import { FileResponse } from "../../service-requests/models/file-response";

export class ProviderDetails {
  activityType!: string;
  serviceDescription!: string;
  licenseNumber!: string;
  commercialRegistration!: string;
  commercialDate!: string;
  ownerName!: string;
  managerName!: string;
  managerPhoneNumber!: string;
  region!: string;
  address!: string;
  city!: string;
  neighborhood!: string;
  latitude!: string;
  longitude!: string;
  serviceProvider!: string;
  iban!: string
  accountName!: string
  bankName!: string
  files: FileResponse[] = [];

}
