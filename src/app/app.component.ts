import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthState } from './auth/auth.reducer';
import * as AuthActions from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _authStore: Store<AuthState>) {
    _authStore.dispatch(new AuthActions.LoadLocalStorageAction());
  }
}
