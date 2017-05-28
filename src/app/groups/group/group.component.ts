import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as GroupsActions from '../groups.actions';
import { GroupsState } from '../groups.reducer';
import { ProcessStatus } from '../../shared/process-status.enum';
import { Task } from '../../models/task';


@Component({
  selector: 'app-group',
  templateUrl: 'group.component.html'
})

export class GroupComponent implements OnInit, OnDestroy {
  ProcessStatus = ProcessStatus;
  groupsState$: Observable<GroupsState>;

  completedTasks$: Observable<Task[]>;
  uncompletedTasks$: Observable<Task[]>;

  groupId = '';

  private _routeParamsSub: Subscription = null;

  constructor(
    private _groupsStore: Store<GroupsState>,
    private _route: ActivatedRoute
  ) {
    this.groupsState$ = _groupsStore.select('groups');
    this.completedTasks$ = this.groupsState$.map(state => state.singleGroup.tasks.filter(task => task.done));
    this.uncompletedTasks$ = this.groupsState$.map(state => state.singleGroup.tasks.filter(task => !task.done));
  }

  ngOnInit() {
    this._routeParamsSub = this._route.params.subscribe(params => {
      this.groupId = params['id'];

      this._groupsStore.dispatch(new GroupsActions.LoadSingleGroupAction(this.groupId));
    });
  }

  ngOnDestroy() {
    this._routeParamsSub.unsubscribe();
  }

  onTaskDone(task: Task, index: number) {
    this._groupsStore.dispatch(new GroupsActions.CompleteTaskAction(task));
  }
}
