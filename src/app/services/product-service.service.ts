import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SuperService} from './super-service';
import {Items} from '../dto/Items';
import {News1} from '../dto/News';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  super = new SuperService();

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient) {
  }

  //function of get all product data
  getProductData(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Items' + '?access_token=' +
      this.localStorage.getItem('token'));
  }

  getItemsByHitsOrder(value): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Items' + '?filter[order]=Hits desc' + '&filter[limit]=' + value);
  }

  //====================================================================================================================

  //function of search item by id
  itemIdSearch(id) {
    return this.http.get(this.super.getBaseUrl() + '/Items/' + id + '?access_token=' +
      this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  //function of search category by id
  categoryIdSearch(id) {
    return this.http.get(this.super.getBaseUrl() + '/Categories' + id + '?access_token=' +
      this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  // save item changes
  updateItemChanges(itm: Items) {
    return this.http.put(this.super.getBaseUrl() + '/Items' + '?access_token=' +
      this.localStorage.getItem('token'), itm);
  }

  //====================================================================================================================

  // get all news
  getAllNews(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/News' + '?access_token=' + this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  // save news
  saveNews(nws: News1) {
    return this.http.post(this.super.getBaseUrl() + '/News' + '?access_token=' +
      this.localStorage.getItem('token'), nws);
  }

  //====================================================================================================================

  // delete item data
  deletebyId(id: number) {
    return this.http.delete(this.super.getBaseUrl() + '/Items/' + id + '?access_token=' +
      this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  //get number of items
  getCountOfItems(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Items/count' + '?access_token=' +
      this.localStorage.getItem('token'));
  }

  getProductIdData(id: number) {
    return this.http.get(this.super.getBaseUrl() + '/Products/' + id + '?access_token=' +
      this.localStorage.getItem('token'));
  }

  getSubsCustomerData(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Customers' + '?access_token=' + this.localStorage.getItem('token'));
  }

  getWishlistData(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/WishLists' + '?access_token=' + this.localStorage.getItem('token'));
  }

  getGalleryData(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Galleries' + '?access_token=' + this.localStorage.getItem('token'));
  }
}
