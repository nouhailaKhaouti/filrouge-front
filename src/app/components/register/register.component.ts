import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/states/app-state';
import * as UserActions from '../../states/user/user-action'
import { User } from 'src/app/domain/user-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  user!: User;   
  loading$ = this.store.select(state => state.user.loading);
  error$ = this.store.select(state => state.user.error);

  constructor(
    private store: Store<AppState>,
    private _fb: FormBuilder
    
    ) {}

    ngOnInit(): void {
      this.registrationForm = this._fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }


  registerUser(userData: User) {
    this.store.dispatch(UserActions.register({ user: userData }));
  }



  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Data: ', this.registrationForm.value);
      this.user = this.registrationForm.value;
      this.registerUser(this.user);
    } else {
      // Handle form errors
      console.error('Form is invalid');
    }
  }
}
