import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AuthState } from '../auth/auth.reducer';
import * as AuthActions from '../auth/auth.actions';

import * as UIActions from '../ui/ui.actions';
import { UIState } from '../ui/ui.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  uiState$: Observable<UIState>;
  authState$: Observable<AuthState>;

  constructor(
    private _authStore: Store<AuthState>,
    private _uiStore: Store<UIState>,
    private _router: Router
  ) {
    this.authState$ = _authStore.select('auth');
    this.uiState$ = _uiStore.select('ui');
  }

  ngOnInit() { }

  hideSidebar() {
    this._uiStore.dispatch(new UIActions.HideSidebarAction());
  }

  logout() {
    this._authStore.dispatch(new AuthActions.LogoutAction());
    this.hideSidebar();
    this._router.navigateByUrl('/auth/sign-in');
  }
}
