import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {SuperService} from './super-service';
import {Complain} from '../dto/Complain';
import {ComplainRply} from '../dto/ComplainRply';

@Injectable({
  providedIn: 'root'
})
export class SystemServiceService {

  super = new SuperService();

  public isCheckComplaint = new BehaviorSubject<number>(0);
  public currentIsCheckComplaint = this.isCheckComplaint.asObservable();

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient) {
  }

  public changeIsCheckComplaint(is: number) {
    this.isCheckComplaint.next(is);
  }

  //function of get all complains
  getAllComplains(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Complains' + '?access_token=' + this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  //function of get all complain type
  getComplainType(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/ComplainTypes' + '?access_token=' + this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  //function of delete complains
  deleteComplain(id): Observable<any> {
    return this.http.delete(this.super.getBaseUrl() + '/Complains/' + id + '?access_token=' + this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  //function of get number of complains
  getCountOfComplains(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Complains/count' + '?access_token=' + this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  //function of get all refund requests
  getAllRefundRquests(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/RefundRequests' + '?access_token=' + this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  //function of get all feed back data
  getAllFeedBacks(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Feedbacks' + '?access_token=' + this.localStorage.getItem('token'));
  }

  updateComplain(com: Complain): Observable<any> {
    return this.http.put(this.super.getBaseUrl() + '/Complains' + '?access_token=' + this.localStorage.getItem('token'), com);
  }

  getSubscribeCus(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Customers' + '?access_token=' + this.localStorage.getItem('token'));
  }

  getOrdersbyId(complainOrderId: number) {
    return this.http.get(this.super.getBaseUrl() + '/Orders/' + complainOrderId + '?access_token=' + this.localStorage.getItem('token'));
  }

  getCustomerDatabyId(customerOrderId: number) {
    return this.http.get(this.super.getBaseUrl() + '/Customers/' + customerOrderId + '?access_token=' + this.localStorage.getItem('token'));
  }

  getUserData(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Users' + '?access_token=' + this.localStorage.getItem('token'));
  }

  saveComplainRply(comrplyu: ComplainRply) {
    return this.http.post(this.super.getBaseUrl() + '/Complain_replies' + '?access_token=' + this.localStorage.getItem('token'), comrplyu);
  }
}
