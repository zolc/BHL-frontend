import { Action } from '@ngrx/store';
import { Errors } from '../shared/errors';

import { User } from '../models/user';

import { SignInCredentials } from './sign-in-credentials';
import { SignUpCredentials } from './sign-up-credentials';

export const SIGN_IN = '[Authentication] Sign in';
export const SIGN_IN_SUCCESS = '[Authentication] Sign in success';
export const SIGN_IN_ERROR = '[Authentication] Sign in error';

export const SIGN_UP = '[Authentication] Sign on';
export const SIGN_UP_SUCCESS = '[Authentication] Sign on success';
export const SIGN_UP_ERROR = '[Authentication] Sign on error';

export const LOGOUT = '[Authentication] Logout';

export const LOAD_LOCAL_STORAGE = '[Authentication] Load from local storage';

export const FETCH_SELF_DATA = '[Authentication] Fetch self data';
export const FETCH_SELF_DATA_SUCCESS = '[Authentication] Fetch self data success';



export class SignInAction implements Action {
  readonly type = SIGN_IN;

  constructor(public payload: SignInCredentials) { }
}

export class SignInSuccessAction implements Action {
  readonly type = SIGN_IN_SUCCESS;

  constructor(public payload: string) { }
}

export class SignInErrorAction implements Action {
  readonly type = SIGN_IN_ERROR;

  constructor(public payload: Errors) { }
}

export class SignUpAction implements Action {
  readonly type = SIGN_UP;

  constructor(public payload: SignUpCredentials) { }
}

export class SignUpSuccessAction implements Action {
  readonly type = SIGN_UP_SUCCESS;
}

export class SignUpErrorAction implements Action {
  readonly type = SIGN_UP_ERROR;

  constructor(public payload: Errors) { }
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
}

export class LoadLocalStorageAction implements Action {
  readonly type = LOAD_LOCAL_STORAGE;
}

export class FetchSelfDataAction implements Action {
  readonly type = FETCH_SELF_DATA;

  constructor(public payload: string) { }
}

export class FetchSelfDataSuccessAction implements Action {
  readonly type = FETCH_SELF_DATA_SUCCESS;

  constructor(public payload: User) { }
}

export type Actions
  = SignInAction
  | SignInSuccessAction
  | SignInErrorAction
  | SignUpAction
  | SignUpSuccessAction
  | SignUpErrorAction
  | LogoutAction
  | LoadLocalStorageAction
  | FetchSelfDataAction
  | FetchSelfDataSuccessAction;
