import { RequestResponseDto } from "./request-table.model";

export interface ProposalResponse {
  id: string;
  title: string;
  details: string;
  price: string;
  serviceFees: string;
  officeFees: string;
  taxes: string;

  status: string;
  offerDate: Date;
  internalStatus: string;
  providerName: string;
  providerEmail: string;
  providerPhone: string;
  selected: boolean;

  requestDetails:RequestResponseDto

}




