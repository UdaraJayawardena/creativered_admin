import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SuperService} from './super-service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountsServiceService {

  super = new SuperService();

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient) {
  }

  //function of get customer details
  getCustomerDetails(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Customers' + '?access_token=' + this.localStorage.getItem('token'));
  }

  // ===================================================================================================================

  //function of search customer by email
  searchCustomerByEmail(email): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Customers/' + email + '?access_token=' + this.localStorage.getItem('token'));
  }

  // ===================================================================================================================

  //function of get all ordes
  getAllOrders(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Orders' + '?access_token=' + this.localStorage.getItem('token'));
  }

  // ===================================================================================================================

  //function of get number of customer
  getCountOfCustomers(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Customers/count' + '?access_token=' + this.localStorage.getItem('token'));
  }

  // ===================================================================================================================

  //function of get all shipping data
  getAllShippingData(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/ShippingAddresses' + '?access_token=' + this.localStorage.getItem('token'));
  }
}
