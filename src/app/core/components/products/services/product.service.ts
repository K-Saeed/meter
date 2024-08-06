import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { RquestCallService } from "src/app/shared/service/request-call.service";
import { map, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private requestCall: RquestCallService) {}

  products?: Product[];

  retriveProductList(): Observable<Product[]> {
    return this.requestCall.getProductList().pipe(
      map(products => products.map(product => ({
        ...product,
        postDate: this.stripTime(new Date(product.postDate))
      }))),
      tap(
        (res) => {
          this.products = res;
        },
        (err) => {
          console.log(err);
        }
      )
    );
  }
  getProductList(): Observable<Product[]> {
    if (!this.products || this.products.length === 0) {
      return this.retriveProductList();
    } else {
      return of(this.products);
    }
  }

  private stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
