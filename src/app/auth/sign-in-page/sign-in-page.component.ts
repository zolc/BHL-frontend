import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

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

  constructor(private _authStore: Store<AuthState>) {
    this.authState$ = _authStore.select('auth');
  }

  ngOnInit() { }

  signIn() {
    this._authStore.dispatch(new AuthActions.SignInAction({
      username: this.username,
      password: this.password
    }));
  }
}
