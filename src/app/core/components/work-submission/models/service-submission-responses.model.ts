import { FileResponse } from "./file-response";

export class ServiceSubmissionResponse {
  id!: string;
  submissionType!: string;

  customerName!: string;
  providerName!: string;
  requestTitle!: string;
  applicantName!: string;
  applicantType!: string;
  agencyNumber!: string;
  phoneNumber!: string;
  idNumber!: string;
  instrumentNumber!: string;
  pieceNumber!: string;
  chartNumber!: string;
  region!: string;
  city!: number;
  neighborhood!: string;
  street!: string;
  electronicSignature!: string;
  status!: string;
  submittingDate!: string;
  files: FileResponse[] = [];
  selected?: boolean = false;

}



