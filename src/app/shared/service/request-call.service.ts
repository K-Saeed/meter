import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/components/products/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RquestCallService {
  constructor(private http:HttpClient) {}

  product?: Product[];

getHeaders() {
  const headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  return {
    headers: new HttpHeaders(headerDict),
    params: {}
  };

}

getProductList(): Observable<Product[]> {
  const apiUrl = `${environment.apiUrl}/api/dashboard/all/products`;
  return this.http.get<Product[]>(apiUrl);
}


}
