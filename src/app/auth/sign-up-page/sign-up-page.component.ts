import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { FormControl, FormGroup, FormBuilder } from '@angular/forms';


import * as AuthActions from '../auth.actions';
import { AuthState } from '../auth.reducer';

import { ProcessStatus } from '../../shared/process-status.enum';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: 'sign-up-page.component.html'
})

export class SignUpPageComponent implements OnInit {
  ProcessStatus = ProcessStatus;
  signUpForm: FormGroup = null;
  authState$: Observable<AuthState>;

  constructor(private fb: FormBuilder,
    private _authStore: Store<AuthState>) {
      this.authState$ = _authStore.select('auth');
    }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: ''
    });
  }

  signUp() {
    this._authStore.dispatch(new AuthActions.SignUpAction(this.signUpForm.value));

    this.authState$.filter(state => state.signUpStatus === ProcessStatus.Success)
      .take(1)
      .subscribe(() => {
        this.signUpForm.reset();
      });
  }
}
