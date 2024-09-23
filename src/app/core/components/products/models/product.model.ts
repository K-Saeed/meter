export class Product {
  productId?: number;
  ownerName?: string;
  name?: string;
  requestType?: string;
  dateSubmitted?: Date;
  typeOfService?: string;
  model?: string;
  manufacturingYear?: Date;
  manufacturer?: string;
  description?: string;
  productImages: string[] = ['../../../../../assets/img/product.jpeg'];
  selected!: boolean;
  status!: string;
  postDate!: Date;
}




