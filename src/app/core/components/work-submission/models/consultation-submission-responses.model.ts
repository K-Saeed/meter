import { FileResponse } from "./file-response";

export class ConsultationSubmissionResponse {
  id!: string;
  customerName!: string;
  providerName!: string;
  requestTitle!: string;
  title!: string;
  type!: string;
  consultation!: string;
  applicantName!: string;
  electronicSignature!: string;
  status!: string;
  submittingDate!: string;
  files: FileResponse[] = [];
  selected?: boolean = false;



}

