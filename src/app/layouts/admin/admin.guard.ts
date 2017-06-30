import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FirebaseAuth } from 'angularfire2';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.state$.map(state => {
      if (!state) {
        console.log('Cannot activate admin, redirecting to login page');
        this.router.navigateByUrl('/pages/login');
        return false;
      } else {
        console.log('Can activate admin');
        return true;
      }
    });

  }
}
