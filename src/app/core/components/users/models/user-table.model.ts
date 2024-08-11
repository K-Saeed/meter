import { CustomerDetails } from "./customer-details.model";
import { ProviderDetails } from "./provider-details.model";
import { SellerDetails } from "./seller-details.model";

export class UserTableDto {
  id!: string;
  email!: string;
  name!: string;
  logoPath!: string;
  mobile!: string;
  role!: string;
  registeredDate!: string;
  spent!: number;
  status!: string;
  customerDetails!: CustomerDetails;
  providerDetails!: ProviderDetails;
  sellerDetails!: SellerDetails;
  modfiedUserDto!:string
  selected!: boolean;
}
