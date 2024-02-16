import { User } from 'src/app/domain/user-model';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../user/user-action';

export interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }

  export const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
  };

  export const userReducer = createReducer(
    initialState,
  
    on(UserActions.register, state => ({
      ...state,
      loading: true,
      error: null,

    })),
  
    on(UserActions.registerSuccess, (state, { token }) => ({
      ...state,
      token,
      loading: false
    })),
  
    on(UserActions.registerFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false
    })),

    on(UserActions.login, state => ({
      ...state,
      loading: true,
      error: null,

    })),

    on(UserActions.loginSuccess, (state, { token }) => ({
      ...state,
      token,
      loading: false
    })),

    on(UserActions.loginFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false
    })),
  
  );
