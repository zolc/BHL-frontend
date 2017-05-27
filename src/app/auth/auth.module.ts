import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

const routes: Routes = [
  { path: 'auth', children: [
    { path: 'sign-in', component: SignInPageComponent },
    { path: 'sign-up', component: SignUpPageComponent }
  ]}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [
    SignInPageComponent,
    SignUpPageComponent
  ]
})
export class AuthModule { }

export const routedComponents = [SignInPageComponent];
