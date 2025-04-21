import { Product } from "./product.model";

export interface DevicesProposalResponse {
  id: string;
  title: string;
  productId: string;
  productName: string;
  customerEmail: string;
  customerName: string;
  customerRole: string;
  customerImage: string;
  requestType: string;
  details: string;
  status: string;
  price: string;
  serviceFees: string;
  taxes: string;
  startRentingDate: Date;
  endRentingDate: Date;
  rentDate: Date;
  rentHours: string;
  ownerEmail: string;
  ownerName: string;
  latitude: string;
  longitude: string;
  deviceWithWorker: string;
  requestDate: string;
  acceptedOffer: string;
  offerDate: string;
  editable: string;
  selected: boolean;

  productDetails:Product;

}




