import { FileResponse } from "./file-response";

export class ConstructionSubmissionResponse {
  id!: string;
  customerName!: string;
  submissionType!: string;
  providerName!: string;
  requestTitle!: string;
  serviceType!: string;
  certificateType!: string;
  applicantName!: string;
  applicantType!: string;
  agencyNumber!: string;
  idNumber!: string;
  electronicSignature!: string;
  status!: string;
  submittingDate!: string;
  files: FileResponse[] = [];
  selected?: boolean = false;

}
