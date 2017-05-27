import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as AuthActions from '../auth/auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  signIn$: Observable<Action> = this.actions$
    .ofType(AuthActions.SIGN_IN)
    .map(() => new AuthActions.SignInErrorAction({
      unknown: ''
    }));


  constructor(private actions$: Actions) { }
}
