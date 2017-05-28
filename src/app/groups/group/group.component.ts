import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as GroupsActions from '../groups.actions';
import { GroupsState } from '../groups.reducer';
import { ProcessStatus } from '../../shared/process-status.enum';

@Component({
  selector: 'app-group',
  templateUrl: 'group.component.html'
})

export class GroupComponent implements OnInit {
  ProcessStatus = ProcessStatus;
  groupsState$: Observable<GroupsState>;

  groupId = '';

  private _routeParamsSub: Subscription = null;

  constructor(
    private _groupsStore: Store<GroupsState>,
    private _route: ActivatedRoute
  ) {
    this.groupsState$ = _groupsStore.select('groups');
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
}
