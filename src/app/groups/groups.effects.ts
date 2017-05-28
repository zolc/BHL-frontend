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

import * as GroupsActions from './groups.actions';
import { GroupsState } from './groups.reducer';

import { User } from '../models/user';
import { Group } from '../models/group';

import { environment } from '../../environments/environment';

import { transformTask } from '../shared/transform-task';

const loadGroups = gql`
  mutation SelfInfo($token: String!) {
    SelfInfo(token: $token) {
      user {
        groups {
          _id
          name
          uncompleted_tasks {
            _id
          }
        }
      }
    }
  }
`;


const loadSingleGroup = gql`
  query Group($token: String!, $_id: String!) {
    group(token: $token, _id: $_id) {
      name
      completed_tasks {
        _id
        title
        description
        published_date
        due_date
      }
      uncompleted_tasks {
        _id
        title
        description
        published_date
        due_date
      }
    }
  }
`;

@Injectable()
export class GroupsEffects {
  private _authState: AuthState;

  @Effect()
  loadGroups$: Observable<Action> = this.actions$
    .ofType(GroupsActions.LOAD_GROUPS)
    .map(toPayload)
    .switchMap(() => {
      return this.apollo.mutate({
        mutation: loadGroups,
        variables: {
          token: this._authState.accessToken
        }
      })
        .catch(() =>
          Observable.of(new GroupsActions.LoadGroupsErrorAction({
            http: 'http error'
          }))
        );
    })
    .map(response => {
      if (response instanceof GroupsActions.LoadGroupsErrorAction) {
        return response;
      }

      const groups = response.data['SelfInfo']['user']['groups'];
      return new GroupsActions.LoadGroupsSuccessAction(groups);
    });


  @Effect()
  loadSingleGroup$: Observable<Action> = this.actions$
    .ofType(GroupsActions.LOAD_SINGLE_GROUP)
    .map(toPayload)
    .switchMap(groupId => {
      return this.apollo.query({
        query: loadSingleGroup,
        variables: {
          token: this._authState.accessToken,
          _id: groupId
        }
      })
        .catch(() =>
          Observable.of(new GroupsActions.LoadSingleGroupErrorAction({
            http: 'http error'
          }))
        );
    })
    .map(response => {
      if (response instanceof GroupsActions.LoadSingleGroupErrorAction) {
        return response;
      }

      const group: Group = response.data['group'];
      const groupNativeTasks = Object.assign({}, group, {
        completed_tasks: group.completed_tasks.map(task => transformTask(task)),
        uncompleted_tasks: group.uncompleted_tasks.map(task => transformTask(task))
      });
      return new GroupsActions.LoadSingleGroupSuccessAction(groupNativeTasks);
    });

  constructor(private actions$: Actions, private apollo: Apollo, private _authStore: Store<AuthState>) {
    this._authStore.select('auth').subscribe((state: AuthState) => {
      this._authState = state;
    });
  }
}
