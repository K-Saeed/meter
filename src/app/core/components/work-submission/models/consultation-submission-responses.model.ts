import { FileResponse } from "./file-response";

export class ConsultationSubmissionResponse {
  id!: string;
  title!: string;
  type!: string;
  consultation!: string;
  applicantName!: string;
  electronicSignature!: string;
  status!: string;
  submittingDate!: Date;
  files: FileResponse[] = [];


}

