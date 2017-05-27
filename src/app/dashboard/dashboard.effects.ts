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

import * as DashboardActions from './dashboard.actions';

import { AuthState } from '../auth/auth.reducer';
import {  } from '../auth/';

const loadDashboardTasks = gql`
  mutation SelfInfo($token: String!) {
    SelfInfo(token: $token) {
      user {
        tasks {
          _id
          title
          description
          published_date
          done
          due_date
          highlighted
          group {
            name
          }
        }
      }
    }
  }
`;

@Injectable()
export class DashboardEffects {
  authState$: Observable<AuthState>;
  authState: AuthState;

  @Effect()
  loadDashboard$: Observable<Action> = this.actions$
    .ofType(DashboardActions.LOAD_DASHBOARD)
    .switchMap(() => {
      return this.apollo.mutate({
        mutation: loadDashboardTasks,
        variables: {
          token: this.authState.accessToken
        }
      })
        .catch(() => Observable.of(new DashboardActions.LoadDashboardErrorAction({ })));
    })
    .map(response => {
      if (response instanceof DashboardActions.LoadDashboardErrorAction) {
        return response;
      }

      const data = response.data;

      return new DashboardActions.LoadDashboardSuccessAction(data['SelfInfo']['user']['tasks']);
    });

  constructor(private actions$: Actions, private _authStore: Store<AuthState>,
    private apollo: Apollo) {
    this.authState$ = this._authStore.select('auth');


    this.authState$.subscribe(state => {
      this.authState = state;
    });
  }

}
