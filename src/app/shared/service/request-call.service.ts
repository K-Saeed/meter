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


//   getSmartlyResponse(): Observable<Product[]> {
//         const iheaders = new HttpHeaders().set('Authorization', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYzQyNDFmOS1mMDg5LTRhZWMtOWYzZS01N2Y0YzgwMzQ1ODMiLCJhdSI6WyJTZWxsZXIiXSwiZSI6InNlbGxlckB0ZXN0LmNvbSIsImV4cCI6MTcyMjczNTkyMiwiaWF0IjoxNzIyNzI4NzIyfQ.TW-azwZB46an7YN-qykfk8QVR5o7rIMCWOKzjuMb2yI');
//         const apiUrl = `${environment.apiUrl}/api/dashboard/all/products`;
//         return this.http.post<Product[]>(apiUrl, {headers: iheaders});
// }

getHeaders() {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYzQyNDFmOS1mMDg5LTRhZWMtOWYzZS01N2Y0YzgwMzQ1ODMiLCJhdSI6WyJTZWxsZXIiXSwiZSI6InNlbGxlckB0ZXN0LmNvbSIsImV4cCI6MTcyMjczOTExMCwiaWF0IjoxNzIyNzMxOTEwfQ.khP7yvny8WR-_ZT6YD4BC9Oe8PAEiXmuSFetdt7zDbE';
  const headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Authorization': `Bearer ${token}`
  }

  return {
    headers: new HttpHeaders(headerDict),
    params: {}
  };

}

getSmartlyResponse(): Observable<Product[]> {
  let headers = new HttpHeaders();
  headers = headers.set('Auth', 'Bearer ' + 'token' )
  // const requestOptions = this.getHeaders();
  const apiUrl = `${environment.apiUrl}/api/dashboard/all/products`;
  return this.http.get<Product[]>(apiUrl);
}


}
