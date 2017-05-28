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
import { Task } from '../models/task';

import { transformTask } from '../shared/transform-task';

const loadDashboardTasks = gql`
  query user($token: String!) {
    user(token: $token) {
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
`;

const completeTask = gql`
  mutation ToggleComplete($token: String!, $task_id: String!) {
    ToggleComplete(token: $token, task_id: $task_id) {
      success
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
      return this.apollo.query({
        query: loadDashboardTasks,
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
      const rawTasks: Task[] = data['user']['tasks'];
      const tasksWithDate = rawTasks.map(task => transformTask(task));
      return new DashboardActions.LoadDashboardSuccessAction(tasksWithDate);
    });

  @Effect({
    dispatch: false
  })
  completeTask$ = this.actions$
    .ofType(DashboardActions.COMPLETE_TASK)
    .map(toPayload)
    .map(task => {
      return this.apollo.mutate({
        mutation: completeTask,
        variables: {
          token: this.authState.accessToken,
          task_id: task._id
        }
      });
    });

  constructor(private actions$: Actions, private _authStore: Store<AuthState>,
    private apollo: Apollo) {
    this.authState$ = this._authStore.select('auth');


    this.authState$.subscribe(state => {
      this.authState = state;
    });
  }

}
