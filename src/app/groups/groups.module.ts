import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/auth.guard';

import { GroupsComponent } from './groups.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard], children: [
    { path: 'list', component: GroupsListComponent },
    { path: 'group/:id', component: GroupComponent },
    { path: '', pathMatch: 'full', redirectTo: 'list' }
  ]}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [
    GroupsComponent,
    GroupsListComponent,
    GroupComponent
  ]
})
export class GroupsModule { }

export const routedComponents = [GroupsComponent];
