import { Action, ActionReducer } from '@ngrx/store';
import * as AuthActions from './auth.actions';

import { environment } from '../../environments/environment';

import { Errors } from '../shared/errors';
import { ProcessStatus } from '../shared/process-status.enum';

export interface AuthState {
  authenticated: boolean;
  accessToken: boolean;

  signInStatus: ProcessStatus;
  signInErrors: Errors;

  signUpStatus: ProcessStatus;
  signUpErrors: Errors;
}

const initialState: AuthState = {
  authenticated: false,
  accessToken: null,

  signInStatus: ProcessStatus.Idle,
  signInErrors: null,

  signUpStatus: ProcessStatus.Idle,
  signUpErrors: null
};

export function authReducer(state = initialState, action: AuthActions.Actions): AuthState {
  switch (action.type) {
    case AuthActions.SIGN_IN:
      return Object.assign({}, state, {
        signInStatus: ProcessStatus.InProgress,
        signInErrors: null
      });

    case AuthActions.SIGN_IN_SUCCESS:
      localStorage.removeItem(environment.localStorage.accessTokenKey);
      localStorage.setItem(environment.localStorage.accessTokenKey, action.payload);

      return Object.assign({}, state, {
        signInStatus: ProcessStatus.Success,
        accessToken: action.payload,
        authenticated: true
      });

    case AuthActions.SIGN_IN_ERROR:
      return Object.assign({}, state, {
        signInStatus: ProcessStatus.Error,
        signInErrors: action.payload
      });

    case AuthActions.SIGN_UP:
      return Object.assign({}, state, {
        signUpStatus: ProcessStatus.InProgress,
        signUpErrors: null
      });

    case AuthActions.SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        signUpStatus: ProcessStatus.Success
      });

    case AuthActions.SIGN_UP_ERROR:
      return Object.assign({}, state, {
        signUpStatus: ProcessStatus.Error,
        signUpErrors: action.payload
      });

    case AuthActions.LOGOUT:
      localStorage.removeItem(environment.localStorage.accessTokenKey);

      return Object.assign({}, state, {
        accessToken: null,
        authenticated: false
      });

    case AuthActions.LOAD_LOCAL_STORAGE:
      const accessToken = localStorage.getItem(environment.localStorage.accessTokenKey);
      return Object.assign({}, state, {
        accessToken: accessToken,
        authenticated: !!accessToken
      });

    default:
      return state;
  }
}
