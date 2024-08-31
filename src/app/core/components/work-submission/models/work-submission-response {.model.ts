import { ConstructionSubmissionResponse } from "./construction-submission-responses.model";
import { ConsultationSubmissionResponse } from "./consultation-submission-responses.model";
import { ServiceSubmissionResponse } from "./service-submission-responses.model";

export class WorkSubmissionResponse {
  consultationSubmissionResponses: ConsultationSubmissionResponse[] = [];
  constructionSubmissionResponses: ConstructionSubmissionResponse[] = [];
  serviceSubmissionResponses: ServiceSubmissionResponse[] = [];
  selected!: boolean;
}
