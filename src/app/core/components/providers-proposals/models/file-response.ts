import { RequestOwner } from "./customer-details.model";
import { ConsultationRequestDto } from "./request-consultion-dto";
import { JobRequestDto } from "./job-request.model";
import { RequestServiceDto } from "./request-service-dto.model";

export class FileResponse {
  id!: string;
  fileName!: string;
  fileType!: string;
  filePath!: string;
  uploadDate!: Date;
}
