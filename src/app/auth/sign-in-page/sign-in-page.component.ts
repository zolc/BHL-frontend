import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { ProcessStatus } from '../../shared/process-status.enum';

import { AuthState } from '../auth.reducer';
import * as AuthActions from '../auth.actions';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: 'sign-in-page.component.html'
})

export class SignInPageComponent implements OnInit {
  ProcessStatus = ProcessStatus;
  username: string;
  password: string;
  authState$: Observable<AuthState>;

  constructor(private _authStore: Store<AuthState>,
    private _router: Router) {
    this.authState$ = _authStore.select('auth');
  }

  ngOnInit() {
    this.authState$
      .filter(state => state.authenticated)
      .take(1)
      .subscribe(() => {
        this._router.navigateByUrl('/dashboard');
      });
  }

  signIn() {
    this._authStore.dispatch(new AuthActions.SignInAction({
      username: this.username,
      password: this.password
    }));
  }
}
