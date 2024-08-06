import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { RquestCallService } from "src/app/shared/service/request-call.service";
import { map, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private products?: Product[];
  private lastFetchTime?: number;

  constructor(private requestCall: RquestCallService) {}

  retriveProductList(): Observable<Product[]> {
    return this.requestCall.getProductList().pipe(
      map(products => products.map(product => ({
        ...product,
        postDate: this.stripTime(new Date(product.postDate))
      }))),
      tap(
        (res) => {
          this.products = res;
          this.lastFetchTime = Date.now();
        },
        (err) => {
          console.log(err);
        }
      )
    );
  }

  getProductList(): Observable<Product[]> {
    const oneHour = (60 * 60 * 1000)/2;
    const currentTime = Date.now();

    if (!this.products || this.products.length === 0 || (this.lastFetchTime && (currentTime - this.lastFetchTime) > oneHour)) {
      return this.retriveProductList();
    } else {
      return of(this.products);
    }
  }

  private stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
