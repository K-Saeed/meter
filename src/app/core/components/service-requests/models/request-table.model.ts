import {  RequestOwnerResponse } from "./customer-details.model";
import { ConsultationRequestDto } from "./request-consultion-dto";
import { JobRequestDto } from "./job-request.model";
import { RequestServiceDto } from "./request-service-dto.model";
import { FileResponse } from "./file-response";

export class RequestResponseDto {
  requestId!: string;
  type!: string;
  title!: string;
  description!: string;
  creationDate!: Date;
  status!: string;
  internalStatus!: string;


  requestOwner!: RequestOwnerResponse;
  jobRequestDto!: JobRequestDto;
  requestServiceDto!: RequestServiceDto;
  consultationRequestDto!:ConsultationRequestDto
  requestFiles: FileResponse[] = [];
  selected!: boolean;
}
