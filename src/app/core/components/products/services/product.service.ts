import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { RquestCallService } from 'src/app/shared/service/request-call.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private requestCall: RquestCallService,
  ) {}

  products?: Product[];

  getProduct (){
   this.requestCall.getSmartlyResponse().subscribe(
    (res) =>{
      this.products = res;
      console.log(res);
      console.log(this.products);

    }, (err) =>{
      console.log(err);
    });

  }

}
