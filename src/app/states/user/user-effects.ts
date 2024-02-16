import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import * as UserActions from '../user/user-action';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';


@Injectable()
export class UserEffects {

    register$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.register),
        mergeMap((action) =>
          this.userService.RegisterUser(action.user).pipe(
            map(token => {
              // Assuming the token is a property on the user object
              if (token.accessToken){
                this.tokenService.saveToken(token.accessToken);
                this.tokenService.saveRefreshToken(token.refreshToken);
              }
              return UserActions.registerSuccess({ token });
            }),
            catchError(error => of(UserActions.registerFailure({ error: error.message })))
          )
        )
      ));

      login$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.login),
        mergeMap((action) =>
          this.userService.loginUser(action.user).pipe(
            map(token => {
              // Assuming the token is a property on the user object
              if (token.accessToken){
                this.tokenService.saveToken(token.accessToken);
                this.tokenService.saveRefreshToken(token.refreshToken);
              }
   
             
              return UserActions.loginSuccess({ token });
            }),
            catchError(error => of(UserActions.loginFailure({ error: error.message })))
          )
        )
      ));

      loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginSuccess),
      tap(() => this.router.navigateByUrl('/dashboard'))  
    ),
    { dispatch: false }  
  );

  registerSuccefully$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.registerSuccess),
    tap(() => this.router.navigateByUrl('/dashboard'))  
  ),
  { dispatch: false }  
);

    constructor(
        private actions$: Actions,
    private userService: UserService,
    private tokenService: TokenService,
    private router : Router
    ){}
}

