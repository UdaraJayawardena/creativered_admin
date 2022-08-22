import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SuperService} from './super-service';
import {Orders} from '../dto/Orders';

// @ts-ignore

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  super = new SuperService();

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient) {
  }

  //function of unship data
  getUnshippedData(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Orders' + '?access_token=' + this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  //function of get Customer data
  getCusdata(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Customers' + '?access_token=' + this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  //funtcion of order detail by id
  getIdDetail(id): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Orders/' + id + '?access_token=' + this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  //function of order update
  updateIdDetail(odr: Orders) {
    return this.http.put(this.super.getBaseUrl() + '/Orders' + '?access_token=' + this.localStorage.getItem('token'), odr);
  }

  //====================================================================================================================

  //funtion of get all oredrdetail
  getOrderDetail(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/OrderDetails' + '?access_token=' + this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  //function of orders count
  getCountOfOrders(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Orders/count' + '?access_token=' + this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  //function of get billing detail by id
  getBillingDetailsbyID(ID): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/BillingAddresses/' + ID + '?access_token=' + this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  //function of get shipping detail by id
  getShippingDetailsbyID(ID): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/ShippingAddresses/' + ID + '?access_token=' + this.localStorage.getItem('token'));
  }

  //========================================================================================================================================

  //function of get order detail

  getOrderDetailsItemIds(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/OrderDetails' + '?access_token=' + this.localStorage.getItem('token'));
  }

  sendEmail(param: { to: any; subject: string; message: string }) {
    console.log('param',param);
    return this.http.post(this.super.getBaseUrl() + '/Complain_replies/mail', param);
  }
  // sendEmail(url, data) {
  //   console.log(url);
  //   console.log(data);
  //   return this.http.post(url, data);
  // }
  getOrdersByDateRanges(from, to) {
    return this.http.get(this.super.getBaseUrl() + '/Orders' + '?access_token=' + this.localStorage.getItem('token')
      + '&filter[where][orderDate][between][0]=' + from + '&filter[where][orderDate][between][1]=' + to);
  }


  getCustomerDatabyID(customerWishlistId: number) {
    return this.http.get(this.super.getBaseUrl() + '/Customers/' + customerWishlistId + '?access_token=' +
      this.localStorage.getItem('token'));
  }
}
