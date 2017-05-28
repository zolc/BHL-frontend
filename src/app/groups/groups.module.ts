import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/auth.guard';

import { GroupsComponent } from './groups.component';

const routes: Routes = [
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [
    GroupsComponent
  ]
})
export class GroupsModule { }

export const routedComponents = [GroupsComponent];
