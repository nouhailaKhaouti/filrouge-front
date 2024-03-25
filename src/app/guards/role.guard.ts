import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const tokenService: TokenService = inject(TokenService);
  const userRole = tokenService.getTokenClaims().role;
  const router : Router = inject(Router);
  if (route.data['role'].includes(userRole)) {
    return true; 
  } else {
    router.navigate([router.url]);
        return false;
  }
};
