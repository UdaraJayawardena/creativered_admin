import {LOCAL_STORAGE} from '@ng-toolkit/universal';
import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AdminServiceService} from './services/admin-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private adminService: AdminServiceService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return JSON.parse(this.localStorage.getItem('loggedIn'));
  }
}
