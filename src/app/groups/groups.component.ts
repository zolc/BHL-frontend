import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as GroupsActions from './groups.actions';
import { GroupsState } from './groups.reducer';
import { ProcessStatus } from '../shared/process-status.enum';

@Component({
  selector: 'app-groups',
  templateUrl: 'groups.component.html'
})

export class GroupsComponent implements OnInit {
  ProcessStatus = ProcessStatus;
  groupsState$: Observable<GroupsState>;

  constructor(
    private _groupsStore: Store<GroupsState>
  ) {
    this.groupsState$ = _groupsStore.select('groups');
  }

  ngOnInit() {
    this._groupsStore.dispatch(new GroupsActions.LoadGroupsAction());
  }
}
