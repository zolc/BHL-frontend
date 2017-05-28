import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthGuard  } from '../auth/auth.guard';

import { SharedModule } from '../shared/shared.module';

import { TaskRowComponent } from './task-row/task-row.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [
    DashboardComponent,
    TaskRowComponent
  ],
  providers: [],
})
export class DashboardModule { }

export const routedComponents = [DashboardComponent];
