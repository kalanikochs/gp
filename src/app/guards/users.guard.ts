import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserloginService } from '../core/services/userlogin.service';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {
  constructor(private userLogged: UserloginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // const sessionId = this.userLogged.readCookie('gsId');
    const sessionId = localStorage.getItem('gsId');

    if (sessionId && sessionId === '1') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
