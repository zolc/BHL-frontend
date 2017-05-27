import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthGuard  } from '../auth/auth.guard';

import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [DashboardComponent],
  providers: [],
})
export class DashboardModule { }

export const routedComponents = [DashboardComponent];
