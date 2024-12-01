import { RequestOwnerResponse } from "../../service-requests/models/customer-details.model";

export interface TransactionResponse {
  id: string;
  serviceProviderName: string;
  title: string;
  customerName: string;
  amount: number;
  status: string;
  submittingDate: string;
  paymentType: string;
  transactionNotes: string;
  serviceFees: number;
  taxes: number;
  consultationFees: number;
  invoiceCode: string;
  orderId: string;
  details: string;
  requestOwner: RequestOwnerResponse;
  requestId: string;

  selected: boolean;


}
