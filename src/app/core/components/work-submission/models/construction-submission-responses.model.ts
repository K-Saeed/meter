import { FileResponse } from "./file-response";

export class ConstructionSubmissionResponse {
  id!: string;
  serviceType!: string;
  certificateType!: string;
  applicantName!: string;
  applicantType!: string;
  agencyNumber!: string;
  idNumber!: string;
  electronicSignature!: string;
  status!: string;
  submittingDate!: Date;
  files: FileResponse[] = [];
}
