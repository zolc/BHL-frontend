import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';

import gql from 'graphql-tag';

import * as AuthActions from '../auth/auth.actions';
import { AuthState } from '../auth/auth.reducer';
import { SignInCredentials } from './sign-in-credentials';
import { SignUpCredentials } from './sign-up-credentials';

import { User } from '../models/user';

import { environment } from '../../environments/environment';

const signIn = gql`
  mutation SignIn($username: String!, $password: String!) {
    SignIn(username: $username, password: $password) {
      success
      token
    }
  }
`;

const signUp = gql`
  mutation SignUp($username: String!, $password: String!, $email: String!, $first_name: String!, $last_name: String!, $phone: String!) {
    SignUp(username: $username, password: $password, email: $email, first_name: $first_name, last_name: $last_name, phone: $phone) {
      success
    }
  }
`;


const fetchSelfInfo = gql`
  query User($token: String!) {
    user(token: $token) {
        username
        email
        first_name
        last_name
        phone
    }
  }
`;

@Injectable()
export class AuthEffects {
  private _authState: AuthState;

  @Effect()
  signIn$: Observable<Action> = this.actions$
    .ofType(AuthActions.SIGN_IN)
    .map(toPayload)
    .switchMap((credentials: SignInCredentials) => {
      return this.apollo.mutate({
        mutation: signIn,
        variables: credentials
      })
        .catch(() =>
          Observable.of(new AuthActions.SignInErrorAction({
            http: 'http error'
          }))
        );
    })
    .mergeMap<any, Action>(response => {
      if (response instanceof AuthActions.SignInErrorAction) {
        return Observable.from([response]);
      }

      const data = response.data['SignIn'];

      if (!data['success']) {
        return Observable.from([new AuthActions.SignInErrorAction({ 'unknown': ''  })]);
      } else {
        return Observable.from([
          new AuthActions.SignInSuccessAction(data['token']),
          new AuthActions.FetchSelfDataAction(data['token'])
        ]);
      }
    });

  @Effect()
  loadLocalData$: Observable<Action> = this.actions$
    .ofType(AuthActions.LOAD_LOCAL_STORAGE)
    .switchMap(() => {
      const accessToken = localStorage.getItem(environment.localStorage.accessTokenKey);
      if (accessToken) {
        return Observable.of(new AuthActions.FetchSelfDataAction(accessToken));
      } else {
        return Observable.empty();
      }
    });

  @Effect()
  fetchSelfData$: Observable<Action> = this.actions$
    .ofType(AuthActions.FETCH_SELF_DATA)
    .map(toPayload)
    .switchMap((token: string) => {
      return this.apollo.query({
        query: fetchSelfInfo,
        variables: {
          token: token
        }
      })
        .catch(() => Observable.empty());
    })
    .map((response: ApolloQueryResult<{}>) => {
      const data = response.data;
      return new AuthActions.FetchSelfDataSuccessAction(data['user']);
    });

  @Effect()
  signUp$: Observable<Action> = this.actions$
    .ofType(AuthActions.SIGN_UP)
    .map(toPayload)
    .switchMap((credentials: SignUpCredentials) => {
      return this.apollo.mutate({
        mutation: signUp,
        variables: credentials
      })
        .catch(() => {
          return Observable.of(new AuthActions.SignUpErrorAction({
            http: 'http error'
          }));
        });
    })
    .map(response => {
      if (response instanceof AuthActions.SignUpErrorAction) {
        return response;
      }

      const data = response.data['SignUp'];

      if (!data['success']) {
        return new AuthActions.SignUpErrorAction({ 'unknown': '' });
      } else {
        return new AuthActions.SignUpSuccessAction();
      }
    });


  constructor(private actions$: Actions, private apollo: Apollo, private _authStore: Store<AuthState>) {
    this._authStore.subscribe(state => {
      this._authState = state;
    });
  }
}
