import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import gql from 'graphql-tag';

import * as AuthActions from '../auth/auth.actions';
import { SignInCredentials } from './sign-in-credentials';
import { SignUpCredentials } from './sign-up-credentials';

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

@Injectable()
export class AuthEffects {
  @Effect()
  signIn$: Observable<Action> = this.actions$
    .ofType(AuthActions.SIGN_IN)
    .map(toPayload)
    .switchMap((credentials: SignInCredentials) => {
      return this.apollo.mutate({
        mutation: signIn,
        variables: credentials
      })
        .catch(() => {
          return Observable.of(new AuthActions.SignInErrorAction({
            http: 'http error'
          }));
        });
    })
    .map(response => {
      if (response instanceof AuthActions.SignInErrorAction) {
        return response;
      }

      const data = response.data;

      if (!data['success']) {
        return new AuthActions.SignInErrorAction({ 'unknown': ''  });
      } else {
        return new AuthActions.SignInSuccessAction(data['token']);
      }
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

      const data = response.data;

      if (!data['success']) {
        return new AuthActions.SignUpErrorAction({ 'unknown': '' });
      } else {
        return new AuthActions.SignUpSuccessAction();
      }
    });


  constructor(private actions$: Actions, private apollo: Apollo) { }
}
