import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AuthState } from './auth/auth.reducer';
import * as AuthActions from './auth/auth.actions';

import * as UIActions from './ui/ui.actions';
import { UIState } from './ui/ui.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  uiState$: Observable<UIState>;
  sidebarHidden = false;

  constructor(private _authStore: Store<AuthState>, private _uiStore: Store<UIState>) {
    _authStore.dispatch(new AuthActions.LoadLocalStorageAction());

    this.uiState$ = _uiStore.select('ui');
    this.uiState$.subscribe(state => {
      this.sidebarHidden = state.sidebarHidden;
    })
  }

  toggleSidebar() {
    if (this.sidebarHidden) {
      this._uiStore.dispatch(new UIActions.ShowSidebarAction());
    }
    else {
      this._uiStore.dispatch(new UIActions.HideSidebarAction());
    }
  }
}
