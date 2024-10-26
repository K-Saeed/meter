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

  selected: boolean;


}
