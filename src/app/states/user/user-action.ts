import { createAction , props } from "@ngrx/store";
import { Token } from "src/app/domain/token.model";
import { User } from "src/app/domain/user-model";

export const register = createAction(
    '[user] Register',
    props<{ user: User }>()
);

export const registerSuccess = createAction(
    '[User] Register Success',
    props<{ token: Token }>()
  );
  
  export const registerFailure = createAction(
    '[User] Register Failure',
    props<{ error: string }>()
  );

  export const login = createAction(
    '[User] Login',
    props<{ user: User }>()
  );

  export const loginSuccess = createAction(
    '[User] Login Success',
    props<{ token: Token  }>()
  );

  export const loginFailure = createAction(
    '[User] Login Failure',
    props<{ error: string }>()
  );