import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Inject, Injectable} from '@angular/core';
import {SuperService} from './super-service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsServiceService {

  super = new SuperService();

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient) {
  }

  //get all orders
  getAllOrders(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Orders' + '?access_token=' + this.localStorage.getItem('token'));
  }

  getCountryCount(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/ShippingAddresses' + '?access_token=' + this.localStorage.getItem('token'));
  }

  searchDatabyDate(startdateinput: any, enddateinput: any): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Orders' + '?filter[where][orderDate][between][0]=' +
      startdateinput + '&filter[where][orderDate][between][1]=' + enddateinput
      + '&access_token=' + this.localStorage.getItem('token'));
  }

  getAllOrderDetails(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/OrderDetails' + '?access_token=' + this.localStorage.getItem('token'));
  }

  getItembyID(itemID: number | any) {
    return this.http.get(this.super.getBaseUrl() + '/Items/' + itemID + '?access_token=' + this.localStorage.getItem('token'));
  }

  getReportData() {
    return this.http.post('http://192.168.8.113:8000/google', 'sdsa');
  }

  getReportDataa(reportparam: { reportRequests: { viewId: string; dateRanges: { endDate: string; startDate: string }[]; metrics: { expression: string }[] }[] }) {
    return this.http.post('https://analyticsreporting.googleapis.com/v4/reports:batchGet', reportparam);
  }
}
