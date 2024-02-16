import { Component , OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/states/app-state';
import * as UserActions from '../../states/user/user-action'
import { User } from 'src/app/domain/user-model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user!: User;   
  loading$ = this.store.select(state => state.user.loading);
  error$ = this.store.select(state => state.user.error);
  ngOnInit(): void {
    this.loginForm = this._fb.group({ 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  loginUser(userData: User) {
    this.store.dispatch(UserActions.login({ user: userData }));
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Data: ', this.loginForm.value);
      this.user = this.loginForm.value;
      this.loginUser(this.user);
      // this.router.navigate(['/dashboard']);
    } else {
      // Handle form errors
      console.error('Form is invalid');
    }
  }

  constructor(
    private store: Store<AppState>,
    private _fb: FormBuilder,
    private router : Router
    
    ) {}
}
