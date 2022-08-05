import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Inject, Injectable} from '@angular/core';
import {SuperService} from './super-service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Categories} from '../dto/Categories';
import {Product} from '../dto/Product';
import {ItemsReport} from '../dto/Items';
import {RentalItem} from '../dto/RentalItem';
import {Gallery} from '../dto/Gallery';

@Injectable({
  providedIn: 'root'
})
export class AddproductServiceService {

  super = new SuperService();

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient) {
  }

  //function of get all item data
  getAllItemData(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Items' + '?access_token=' + this.localStorage.getItem('token'));
  }

  //funtion of get all category data
  getAddCategoryData(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Categories' + '?access_token=' + this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  //funtion of get all product detail
  getProductData(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Products' + '?access_token=' + this.localStorage.getItem('token'));
  }

  //====================================================================================================================

  // save category data
  saveCategory(catgry: Categories) {
    return this.http.post(this.super.getBaseUrl() + '/Categories' + '?access_token=' + this.localStorage.getItem('token'), catgry);
  }

  //====================================================================================================================

  // save product data
  saveProductDetail(prd: Product) {
    return this.http.post(this.super.getBaseUrl() + '/Products' + '?access_token=' + this.localStorage.getItem('token'), prd);
  }

  //========================================================================================================================================

  //save item data
  saveItemDetail(itm: ItemsReport) {
    return this.http.post(this.super.getBaseUrl() + '/Items' + '?access_token=' + this.localStorage.getItem('token'), itm);
  }

  //========================================================================================================================================

  //save rental item
  saveRentalProduct(rental: RentalItem) {
    return this.http.post(this.super.getBaseUrl() + '/RentalItems' + '?access_token=' + this.localStorage.getItem('token'), rental);
  }

  //========================================================================================================================================

  //save gallery image
    addtoGallery(gallery: Gallery) {
      return this.http.post(this.super.getBaseUrl() + '/Galleries' + '?access_token=' + this.localStorage.getItem('token'), gallery);
    }

    deleteGalleryImage(id: number) {
      return this.http.delete(this.super.getBaseUrl() + '/Galleries/' + id + '?access_token=' + this.localStorage.getItem('token'));
    }
}
