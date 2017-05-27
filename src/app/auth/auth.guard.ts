import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as AuthActions from './auth.actions';
import { AuthState } from './auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
  private _authState$: Observable<AuthState>;

  constructor(private _authStore: Store<AuthState>) {
    this._authState$ = this._authStore.select('auth');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._authState$.map(authState => authState.authenticated);
  }
}