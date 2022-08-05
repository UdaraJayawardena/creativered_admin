import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SuperService} from './super-service';
import {Admin1, AdminPas, AdminS} from '../dto/Admin';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  super = new SuperService();
  private loggedInStatus = false;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient) {
  }

  //set tocken id for login
  setLoggedIn() {
    this.localStorage.setItem('loggedIn', 'true');
  }

  // ===================================================================================================================

  //show the login status
  get isLoggedIn() {
    return this.loggedInStatus;
  }

  // ===================================================================================================================

  //function of get all admin data
  getAllAdminData(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/Users' + '?access_token=' + this.localStorage.getItem('token'));
  }

  // ===================================================================================================================

  //function of add admin
  addAdmin(admin: AdminS) {
    return this.http.post(this.super.getBaseUrl() + '/Users' + '?access_token=' + this.localStorage.getItem('token'), admin);
  }

  // ===================================================================================================================

  //function of search admin by email
  searchAdminByEmail(eml) {
    return this.http.get(this.super.getBaseUrl() + '/Users/' + eml + '?access_token=' + this.localStorage.getItem('token'));
  }

  // ===================================================================================================================

  //function of admin login
  adminLogin(user: Admin1) {
    return this.http.post(this.super.getBaseUrl() + '/Users/login', user);
  }

  // ===================================================================================================================

  //function of verify admin by email
  verifiedTheEmail(userId) {
    return this.http.get(this.super.getBaseUrl() + '/Users/' + userId + '?access_token=' + this.localStorage.getItem('token'));
  }

  // ===================================================================================================================

  //function of verify admin
  verifyAdmin(userId) {
    return this.http.post(this.super.getBaseUrl() + '/Users/' + userId.toString() + '/verify', userId);
  }

  // ===================================================================================================================

  //function of reset password
  resetPassword(admin: AdminPas) {
    return this.http.post(this.super.getBaseUrl() + '/Users/' + 'change-password' + '?access_token=' +
      this.localStorage.getItem('token'), admin);
  }

  // ===================================================================================================================

  //function of forgetpassword
  forgetPassword(email): Observable<any> {
    return this.http.post(this.super.getBaseUrl() + '/Users' + '/reset', email);
  }
}
