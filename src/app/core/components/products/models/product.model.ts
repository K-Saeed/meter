import { FileResponse } from "../../service-requests/models/file-response";

export class Product {
  productId?: string;
  ownerName?: string;
  name?: string;
  requestType?: string;
  dateSubmitted?: Date;

  typeOfService?: string;
  model?: string;
  manufacturingYear?: Date;
  manufacturer?: string;
  description?: string;
  productImages: FileResponse[] = [];
  productLogo?: FileResponse;
  selected!: boolean;
  status!: string;
  postDate!: Date;
}




