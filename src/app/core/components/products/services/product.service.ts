import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { last, map, tap } from "rxjs/operators";
import { Product } from "../models/product.model";
import { RquestCallService } from "src/app/shared/service/request-call.service";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private statusSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public status$: Observable<string | null> = this.statusSubject.asObservable();
  laststatus!: string | null;
  constructor(private requestCall: RquestCallService) {}

  products!: Product[];

  retriveProductList(status: string | null): Observable<Product[]> {
    return this.requestCall.getProductList(status).pipe(
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

  getProductList(status: string | null): Observable<Product[]> {
    if (!this.products || this.products.length === 0 || this.laststatus != status) {
      this.laststatus = status;
      return this.retriveProductList(this.statusSubject.value);
    } else {
      return of(this.products);
    }
  }

  private stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  setStatus(status: string | null): void {
    this.statusSubject.next(status);
  }

  getStatus(): string | null {
    return this.statusSubject.value;
  }

  onDeleteProduct(productId: number | undefined): void {
    this.requestCall.deleteProduct(productId).subscribe(
      () => {
        console.log('Product deleted successfully');
      },
      error => {
        console.error('Error deleting product', error);
      }
    );
  }
}
