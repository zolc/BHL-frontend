import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import * as AuthActions from './auth.actions';
import { AuthState } from './auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
  private _authState$: Observable<AuthState>;

  constructor(private _authStore: Store<AuthState>, private router: Router) {
    this._authState$ = this._authStore.select('auth');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._authState$.switchMap(authState => {
      if (!authState.authenticated) {
        this.router.navigateByUrl('/auth/sign-in');
        return Observable.of(false);
      }

      return this._authState$.filter(x => !!x.accessToken)
        .map(() => true);
    });
  }
}
